
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";



/// @title FidoDido - A smart contract for managing FidoDido NFTs
/// @notice This contract allows for the creation, management, and sale of FidoDido NFTs
contract FidoDido is ERC721A, Ownable, ReentrancyGuard {
    /// @dev The root hash of the Merkle tree used for verifying whitelisted addresses
    bytes32 public merkleRoot;

    /// @dev The price per token during the private phase of sales
    uint256 public constant PRIVATE_PHASE_PRICE =  0.03  ether;

    /// @dev The price per token during the public phase of sales
    uint256 public constant PUBLIC_PHASE_PRICE =  0.04  ether;

    /// @dev Tracks the number of tokens minted by an address during the private phase
    mapping(address => uint256) private _walletMintCount;

    /// @dev Tracks the number of tokens minted by an address during the public phase
    mapping(address => uint256) private _walletMintCountPublic;

    /// @dev Determines whether the contract is currently in the private phase of sales
    bool public _isPrivatePhase = true;

    /// @dev Controls whether the contract is paused or operational
    bool public _pause = false;

    /// @dev Controls whether the NFTs have been revealed to the public
    bool public revealed = false;

    /// @dev The maximum supply of NFTs that can be created
    uint256 MAX_SUPPLY =  7777;

    /// @dev The base URI for the metadata of the NFTs
    string private _baseTokenURI;


    ///  SafeMintEvent
    /// @param to The address receiving the minted tokens
    /// @param quantity The number of tokens minted
    event SafeMintEvent(address indexed to, uint256 quantity);

    ///  RevealNFTEvent
    /// @param baseURI The new base URI after the NFTs have been revealed
    event RevealNFTEvent(string baseURI);

    ///  SwitchPhaseEvent
    /// @param isPrivatePhase Whether the contract is now in the private phase
    event SwitchPhaseEvent(bool isPrivatePhase);

    ///  BatchAirdropSuccess
    /// @param count The number of NFTs successfully airdropped
    event BatchAirdropSuccess(uint256 count);


    ///  SingleAirdropSuccess
    /// @param owner The address that owned the NFT
    /// @param recipient The address receiving the airdropped NFT
    /// @param tokenId The ID of the airdropped NFT
    event SingleAirdropSuccess(
        address owner,
        address recipient,
        uint256 tokenId
    );

    /// @notice Initializes the contract with the initial owner, name, symbol, base URI, and Merkle root
    /// @param initialOwner The address of the initial owner of the contract
    /// @param name The name of the NFT collection
    /// @param symbol The symbol of the NFT collection
    /// @param baseUri The base URI for the metadata of the NFTs
    /// @param _merkleRoot The root hash of the Merkle tree used for verifying whitelisted addresses
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

    /// @notice Sets the Merkle root for verifying whitelisted addresses
    /// @param _merkleRoot The new Merkle root
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /// @notice Sets the base URI for the metadata of the NFTs
    /// @param _URI The new base URI
    function setBaseURI(string memory _URI) public onlyOwner {
        _baseTokenURI = _URI;
    }

    /// @notice Returns the base URI for the metadata of the NFTs
    /// @return The current base URI
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /// @notice Checks whether the contract is currently in the private phase of sales
    /// @return True if the contract is in the private phase, false otherwise
    function getIsPrivatePhase() public view returns (bool) {
        return _isPrivatePhase;
    }

    /// @notice Overrides the start token ID to be  1
    /// @return The starting token ID
    function _startTokenId() internal pure override returns (uint256) {
        return  1;
    }

    /// @notice Switches the contract between the private and public phases of sales
    function switchPhase() public onlyOwner {
        _isPrivatePhase = !_isPrivatePhase;
        emit SwitchPhaseEvent(_isPrivatePhase);
    }

    /// @notice Returns the URI for a specific token ID
    /// @param tokenId The ID of the token to get the URI for
    /// @return The URI for the specified token ID

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

    /// @notice Pauses the contract, preventing further minting
    function pause() public onlyOwner {
        _pause = true;
    }

    /// @notice Unpauses the contract, allowing minting again
    function unpause() public onlyOwner {
        _pause = false;
    }

    /// @notice Reveals the NFTs by setting the base URI and enabling the reveal flag
    /// @param baseURI The new base URI for the revealed NFTs
    function revealNFT(string memory baseURI) public onlyOwner {
        revealed = true;
        setBaseURI(baseURI);
        emit RevealNFTEvent(baseURI);
    }

    /// @notice Withdraws the contract's balance to the owner's account
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /// @notice Airdrops a specified quantity of tokens to an address
    /// @param to The address to receive the airdrop
    /// @param quantity The number of tokens to airdrop
    function airdrop(address to, uint256 quantity) external onlyOwner {
        require(
            totalSupply() + quantity <= MAX_SUPPLY,
            "Not enough tokens left"
        );

        _safeMint(to, quantity);
    }

    /// @notice Safely mints new tokens, with Merkle proof for private .
    /// @param quantity The number of tokens to mint
    /// @param to The address to receive the minted tokens
    /// @param merkleProof The Merkle proof to verify eligibility in the private phase
    function safeMint(
        uint256 quantity,
        address to,
        bytes32[] calldata merkleProof) public payable nonReentrant {
        
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
                ? msg.value * quantity >= PRIVATE_PHASE_PRICE * quantity 
                : msg.value * quantity >= PUBLIC_PHASE_PRICE * quantity,
            "Wrong Ether value"
        );
        require(totalSupply() + quantity <= MAX_SUPPLY, "Max supply reached");
        require(
            !(_isPrivatePhase && totalSupply() + quantity > 5000),
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


        // Emit the SafeMintEvent with the recipient and quantity
        emit SafeMintEvent(to, quantity);
    }

    /// @notice Performs a batch airdrop of tokens to multiple addresses
    /// @param recipients An array of addresses to receive the airdropped tokens
    function batchAirdrop(address[] memory recipients) public onlyOwner {
         require(
            _nextTokenId() + recipients.length <= MAX_SUPPLY,
            "Not enough supply left for batch minting"
        );

        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], 1);
        }

        // Emit the BatchAirdropSuccess event with the number of recipients
        emit BatchAirdropSuccess(recipients.length);
    }
}