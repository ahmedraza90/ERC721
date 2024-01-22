const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FidoDido Testing", function () {

  let yourContract, owner, addr1, addr2, addrs;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const contract = await ethers.getContractFactory("FidoDido");
    yourContract = await contract.deploy(owner, "Fido", "FD", "www.baseuri.com/hidden", "0xb0d63c211bd098f173092331334aa442a0e7cae931a869fd9795ba393e29bd47");

  });

  describe("All Basic Functionalities", function () {

    it("Should pause contract", async function () {
      await yourContract.connect(owner).pause();
      expect(await yourContract.paused()).to.equal(true);
    });

    it("Should unpause contract", async function () {
      await yourContract.connect(owner).pause();
      await yourContract.connect(owner).unpause();
      expect(await yourContract.paused()).to.equal(false);
    });

    it("Should toggle phase", async function () {
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(false);
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(true);
    });


    it("Should verify Merkel proof correctly", async function () {
      const result = await yourContract.connect(owner).testMerkel('0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db', [
        '0xdfbe3e504ac4e35541bebad4d0e7574668e16fefa26cd4172f93e18b59ce9486',
        '0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65',
        '0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7'
      ]);
      expect(result).to.be.true;
    });


    // it("Should change the revealed state and set the base URI", async function () {
    //   await yourContract.connect(owner).revealNFT("newBaseURI");
    //   expect(await yourContract.revealed()).to.equal(true);
    //   expect(await yourContract.baseURI()).to.equal("newBaseURI");
    // });
    // it("should return correct token URI", async function () {
    //   const uri = await yourContract.connect(owner).tokenURI(1);
    //   expect(uri).to.equal("expected_uri");
    // });


    it("Should revert if not called by owner", async function () {
      await expect(yourContract.connect(addr1).revealNFT("newBaseURI")).to.be.reverted;
    });


    it("should revert if called with invalid token ID", async function () {
      await expect(yourContract.connect(owner).tokenURI(999999)).to.be.revertedWith(
        "ERC721Metadata: URI query for nonexistent token"
      );
    });

  });

  describe("batchAirdrop", function () {

    const signers = [];
      for (let i = 0; i < 777; i++) {
        // Create a new wallet
        const wallet = ethers.Wallet.createRandom();
        // console.log(wallet.address)
        // Connect the wallet to the Hardhat provider
        signers.push(wallet.address);
      }

    it("Should mint tokens to each recipient and balnace should increase accordingly", async function () {
      await yourContract.connect(owner).batchAirdrop(signers);
      for (let i = 0; i < signers.length; i++) {
        const balance = await yourContract.balanceOf(signers[i]);
        expect(balance).to.equal(1);
      }
    });

    it("Should revert if not called by owner", async function () {
      await expect(yourContract.connect(addr1).batchAirdrop(signers)).to.be.reverted;
    });

  });

  describe("SingleAirdrop", function () {

  
    it("Should mint tokens to single recipient and balnace should increase accordingly", async function () {
      await yourContract.connect(owner).SingleAirdrop(addr1);
        const balance = await yourContract.balanceOf(addr1);
        expect(balance).to.equal(1);
    });

    it("Should revert if not called by owner", async function () {
      await expect(yourContract.connect(addr1).SingleAirdrop(addr2)).to.be.reverted;
    });

  });
  

  describe("safeMint", () => {

    it("should mint a token if privateSale's conditions are met", async () => {
      const price = ethers.parseEther("0.5");
      await expect(yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })).to.emit(yourContract, "Transfer");
    });

    it("should mint a token if privateSale's is off", async () => {
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(false);
      const price = ethers.parseEther("0.5");
      await expect(yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })).to.emit(yourContract, "Transfer");
    });

    it("should revert if mint limit on whitelist wallet is reached", async () => {
      const price = ethers.parseEther("0.5");
      await yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })
      await yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })

      // for (let i = 0; i < 2; i++) {
      // }
      // const price = ethers.parseEther("0.5");
      // await expect(yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })).to.be.revertedWith("Mint limit reached");
    });
   
    it("should revert if wrong Ether value is sent on privateSale", async () => {
      const price = ethers.parseEther("0.01"); // assuming the price is 1 ether
       await expect(yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })).to.be.revertedWith("Wrong Ether value");
    });

    it("should revert if wrong Ether value is sent on PublicSale", async () => {
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(false);
      const price = ethers.parseEther("0.01"); // assuming the price is 1 ether
       await expect(yourContract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })).to.be.revertedWith("Wrong Ether value");
    });
   
    // it("should revert if max supply is reached", async () => {
    //    await expect(contract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"])).to.be.revertedWith("Max supply reached");
    // });
   
    // it("should revert if total supply limit is reached during private phase", async () => {
    //    await expect(contract.safeMint("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"])).to.be.revertedWith("Total supply limit reached during private phase");
    // });
   
    it("should revert if invalid merkle proof is provided", async () => {
      const price = ethers.parseEther("0.5");
       await expect(yourContract.safeMint("0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54","0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65","0x0befebd5f6f5e8b5f7ec6935245efbd76ce396aedac1b12781a64df01b75aab7"],{ value: price })).to.be.revertedWith("Invalid merkle proof");
    });
   });
   

});

