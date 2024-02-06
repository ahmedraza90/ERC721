// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721A.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract FidoDido is ERC721A, Ownable, ReentrancyGuard {
    bytes32 public merkleRoot;

    uint256 public constant PRIVATE_PHASE_PRICE = 0.03 ether;
    uint256 public constant PUBLIC_PHASE_PRICE = 0.04 ether;

    //    @notice _walletMintCount for private phase while _walletMintCountPublic for public phase;
    mapping(address => uint256) private _walletMintCount;
    mapping(address => uint256) private _walletMintCountPublic;
    bool public _isPrivatePhase = true;
    bool public _pause = false;

    // Boolean to toggle between reveal
    bool public revealed = false;
    uint256 MAX_SUPPLY = 7777;
    string private _baseTokenURI;

    event SafeMintEvent(address indexed to, uint256 quantity);
    event RevealNFTEvent(string baseURI);
    event SwitchPhaseEvent(bool isPrivatePhase);
    event BatchAirdropSuccess(uint256 count);
    event SingleAirdropSuccess(
        address owner,
        address recipient,
        uint256 tokenId
    );

    constructor(
        address initialOwner,
        string memory name,
        string memory symbol,
        string memory baseUri,
        bytes32 _merkleRoot
    ) ERC721A(name, symbol) Ownable(initialOwner) {
        setBaseURI(baseUri);
        merkleRoot = _merkleRoot;
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function setBaseURI(string memory _URI) public onlyOwner {
        _baseTokenURI = _URI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function getIsPrivatePhase() public view returns (bool) {
        return _isPrivatePhase;
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    // Function to switch between private and public phases
    function switchPhase() public onlyOwner {
        _isPrivatePhase = !_isPrivatePhase;
        emit SwitchPhaseEvent(_isPrivatePhase);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            ownerOf(tokenId) != address(0),
            "Token does not exist of given address"
        );

        string memory baseURI = _baseURI();
        string memory _tokenURI = revealed
            ? string(abi.encodePacked(baseURI, _toString(tokenId),".json"))
            : string(abi.encodePacked(baseURI,"hidden.json"));

        return bytes(baseURI).length != 0 ? _tokenURI : "";
    }
    
    // function tokenURI(
    //     uint256 tokenId
    // ) public view override returns (string memory) {
    //     require(
    //         ownerOf(tokenId) != address(0),
    //         "Token does not exist of given address"
    //     );

    //     string memory baseURI = _baseURI();
    //     string memory _tokenURI = string(abi.encodePacked(baseURI, _toString(tokenId), ".json"));

    //     return bytes(baseURI).length != 0 ? _tokenURI : "";
    // }
    function pause() public onlyOwner {
        _pause = true;
    }

    function unpause() public onlyOwner {
        _pause = false;
    }

    function revealNFT(string memory baseURI) public onlyOwner {
        revealed = true;
        setBaseURI(baseURI);
        emit RevealNFTEvent(baseURI);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function airdrop(address to, uint256 quantity) external onlyOwner {
        require(
            totalSupply() + quantity <= MAX_SUPPLY,
            "Not enough tokens left"
        );

        _safeMint(to, quantity);
    }

    function safeMint(
        uint256 quantity,
        address to,
        bytes32[] calldata merkleProof
    ) public payable nonReentrant {
        require(
            _pause == false,
            "mint has been pause"
        );
        require(
            _isPrivatePhase
                ? _walletMintCount[to] + quantity < 3
                : _walletMintCountPublic[to] + quantity < 2,
            "Mint limit reached"
        );
        require(
            _isPrivatePhase
                ? msg.value * quantity >= PRIVATE_PHASE_PRICE
                : msg.value * quantity >= PUBLIC_PHASE_PRICE,
            "Wrong Ether value"
        );
        require(_nextTokenId() < MAX_SUPPLY, "Max supply reached");
        require(
            !(_isPrivatePhase && _nextTokenId() > 12),
            "Total supply limit reached during private phase"
        );
        if (_isPrivatePhase) {
            require(
                MerkleProof.verify(
                    merkleProof,
                    merkleRoot,
                    keccak256(abi.encodePacked(to))
                ),
                "Invalid merkle proof"
            );
            _walletMintCount[to] = quantity + _walletMintCount[to];
        } else {
            _walletMintCountPublic[to] = quantity + _walletMintCountPublic[to];
        }

        _safeMint(to, quantity);

        emit SafeMintEvent(to, quantity);
    }

    function batchAirdrop(address[] memory recipients) public onlyOwner {
        require(
            _nextTokenId() + recipients.length <= MAX_SUPPLY,
            "Not enough supply left for batch minting"
        );

        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], 1);
        }
        emit BatchAirdropSuccess(recipients.length);
    }
}
