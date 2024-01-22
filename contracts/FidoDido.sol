// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract FidoDido is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable,
    ERC721Burnable,
    ReentrancyGuard
{
    // GOOD AND WORKING

    // FFFFFF IIII DDDDDD     OOOO        DDDD     IIII  DDDD   IIII    OOOO
    // FF      II  D    DD   O    O       D   DD    II   D  DD   II    O    O
    // FFFFF   II  D     DD  O    O       D    DD   II   D   DD  II    O    O
    // FF      II  D    DD   O    O       D   DD    II   D  DD   II    O    O
    // FF     IIII DDDDDD     OOOO        DDDDD    IIII  DDDD   IIII    OOOO

    bytes32 public merkleRoot;

    using Strings for uint256;
    uint256 private _nextTokenId;

    // @notice Mapping to store the count and track tokens minted by each wallet
    //    @notice _walletMintCount for private phase while _walletMintCountPublic for public phase;
    mapping(address => uint256) private _walletMintCount;
    mapping(address => uint256) private _walletMintCountPublic;

    uint256 public constant MAX_SUPPLY = 77777;
    uint256 public constant PRIVATE_PHASE_PRICE = 0.03 ether;
    uint256 public constant PUBLIC_PHASE_PRICE = 0.04 ether;

    // Boolean to toggle between private and public phases
    bool public _isPrivatePhase = true;

    bool public airdropCompleted = false;

    string private _baseTokenURI;

    // Boolean to toggle between reveal
    bool public revealed = false;

    string private _nonRevealedUri;

    // Define the events
    event BatchAirdropSuccess(address owner, uint256 count);
    event SingleAirdropSuccess(
        address owner,
        address recipient,
        uint256 tokenId
    );
    event SafeMintEvent(address indexed to, uint256 tokenId);
    event RevealNFTEvent(string baseURI);
    event SwitchPhaseEvent(bool isPrivatePhase);

    

    constructor(
        address initialOwner,
        string memory name,
        string memory symbol,
        string memory baseUri,
        bytes32 _merkleRoot
    ) ERC721(name, symbol) Ownable(initialOwner) {
        setBaseURI(baseUri);
        _nonRevealedUri = baseUri;
        merkleRoot = _merkleRoot;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Function to switch between private and public phases
    function switchPhase() public onlyOwner {
        _isPrivatePhase = !_isPrivatePhase;
        emit SwitchPhaseEvent(_isPrivatePhase);
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    // Function to set/change  non-revealed URI for token metadata
    function setnonRevealedUri(string memory baseURI) public onlyOwner {
        _nonRevealedUri = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function nonRevealedUri() internal view returns (string memory) {
        return _nonRevealedUri;
    }

    function testMerkel(
        address to,
        bytes32[] calldata merkleProof
    ) public view returns (bool) {
        bytes32 node = keccak256(abi.encodePacked(to));
        require(
            MerkleProof.verify(merkleProof, merkleRoot, node),
            "Invalid merkle proof"
        );
        return true;
    }

    function safeMint(
        address to,
        bytes32[] calldata merkleProof
    ) public payable nonReentrant {
        require(
            _isPrivatePhase
                ? _walletMintCount[to] < 2
                : _walletMintCountPublic[to] < 1,
            "Mint limit reached"
        );
        require(
            _isPrivatePhase
                ? msg.value >= PRIVATE_PHASE_PRICE
                : msg.value >= PUBLIC_PHASE_PRICE,
            "Wrong Ether value"
        );
        require(_nextTokenId + 1 < MAX_SUPPLY, "Max supply reached");
        require(
            !(_isPrivatePhase && _nextTokenId + 1 > 6777),
            "Total supply limit reached during private phase"
        );
        require(to != address(0), "Invalid recipient address");
        if (_isPrivatePhase) {
            bytes32 node = keccak256(abi.encodePacked(to));
            require(
                MerkleProof.verify(merkleProof, merkleRoot, node),
                "Invalid merkle proof"
            );
        }

        _safeMint(to, _nextTokenId + 1);
        _setTokenURI(_nextTokenId + 1, (_nextTokenId + 1).toString());
        _walletMintCount[to]++;
        // emit SafeMintEvent(to, _nextTokenId + 1);
    }

    function batchAirdrop(address[] memory recipients) public onlyOwner {
        require(!airdropCompleted, "Airdrop already completed");
        require(recipients.length == 777, "Batch minting is set to 777 addresses");
        require(_nextTokenId + recipients.length <= MAX_SUPPLY, "Not enough supply left for batch minting");

        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], _nextTokenId + 1);
            _nextTokenId++;
        }
        
        airdropCompleted = true;
        emit BatchAirdropSuccess(msg.sender, 777); // Emit the event
    }

    function SingleAirdrop(address recipient) public onlyOwner {
        require(_nextTokenId < MAX_SUPPLY, "Max supply reached");
        require(recipient != address(0), "Invalid recipient address");
        
        _safeMint(recipient, _nextTokenId + 1);
        _nextTokenId++;
        emit SingleAirdropSuccess(msg.sender, recipient, _nextTokenId); // Emit the event
    }

    // Function to Reveal Nfts
    function revealNFT(string memory baseURI) public onlyOwner {
        revealed = true;
        setBaseURI(baseURI);
        emit RevealNFTEvent(baseURI);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    // Overridden function to get token URI
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(
            _ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        string memory _tokenURI = revealed
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
            : _nonRevealedUri;

        return bytes(baseURI).length != 0 ? _tokenURI : "";
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Function to release funds to a specific address
    function releaseFundsToAddress(address payable recipient) public onlyOwner {
        require(
            payable(recipient).send(address(this).balance),
            "Transfer failed."
        );
    }

    // Function to release funds to the owner
    function releaseFundsToOwner() public onlyOwner {
        require(
            payable(owner()).send(address(this).balance),
            "Transfer failed."
        );
    }
}
