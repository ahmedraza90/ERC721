const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FidoDido Testing", function () {

  let yourContract, owner, addr1, addr2, addrs;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const contract = await ethers.getContractFactory("FidoDido");
    yourContract = await contract.deploy(owner, "Fido", "FD", "www.baseuri.com/hidden", "0x281c9c7f2797a550544905446754daa8820ddffb093a86980e651ba6159dbc35");
  });

  describe("All Basic Functionalities", function () {

    it("Should toggle phase", async function () {
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(false);
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(true);
    });

    it("Should revert if not called by owner", async function () {
      await expect(yourContract.connect(addr1).revealNFT("newBaseURI")).to.be.reverted;
    });

  });

  describe("batchAirdrop", function () {

    const signers = [];
    for (let i = 0; i < 777; i++) {
      const wallet = ethers.Wallet.createRandom();
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
      await yourContract.connect(owner).airdrop(addr1, 10);
      const balance = await yourContract.balanceOf(addr1);
      expect(balance).to.equal(10);
    });

    it("Should revert if not called by owner of smart contract", async function () {
      await expect(yourContract.connect(addr1).airdrop(addr2, 1)).to.be.reverted;
    });

  });


  describe("safeMint", () => {

    it("should mint a token if privateSale's conditions are met", async () => {
      const price = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.emit(yourContract, "Transfer");
    });

    it("should mint a token on public sale", async () => {
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(false);
      const price = ethers.parseEther("0.04");
      await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })).to.emit(yourContract, "Transfer");
    });

    it("should revert if mint limit on whitelist wallet is reached while minting 1 nft", async () => {
      for (let i = 0; i < 2; i++) {
        const price = ethers.parseEther("1");
        await yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
          "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
          "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
          "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
          "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
        ], { value: price })
      }
      const price = ethers.parseEther("0.5");
      await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.be.revertedWith("Mint limit reached");
    });

    it("should revert if mint limit on whitelist wallet while minting 2 nfts", async () => {
      const price = ethers.parseEther("1");
      await expect(yourContract.safeMint(3, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.be.revertedWith("Mint limit reached");
    });

    it("should revert if mint limit on public wallet is reached while minting single nft", async () => {
      await yourContract.connect(owner).switchPhase();
      const price = ethers.parseEther("1");
      await yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })
      await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.be.revertedWith("Mint limit reached");
    });

    it("should revert if mint limit on public wallet is reached while minting nfts in bulk", async () => {
      await yourContract.connect(owner).switchPhase();
      const price = ethers.parseEther("1");
      await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })).to.be.revertedWith("Mint limit reached");
    });

    it("should revert if wrong Ether value is sent on privateSale", async () => {
      const price = ethers.parseEther("0.0008"); // assuming the price is 1 ether
      await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.be.revertedWith("Wrong Ether value");
    });

    it("should revert if wrong Ether value is sent on PublicSale", async () => {
      await yourContract.connect(owner).switchPhase();
      expect(await yourContract._isPrivatePhase()).to.equal(false);
      const price = ethers.parseEther("0.03"); // assuming the price is 1 ether
      await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })).to.be.revertedWith("Wrong Ether value");
    });

    it("should revert if invalid merkle proof is provided", async () => {
      const price = ethers.parseEther("0.5");
      await expect(yourContract.safeMint(1, "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.be.revertedWith("Invalid merkle proof");
    });
  });

  describe("Withdraw", function () {
    it("Should allow the owner to withdraw funds", async function () {

      const price = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
        "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
        "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
        "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
        "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
      ], { value: price })).to.emit(yourContract, "Transfer");

      // Check the balance of the contract
      expect(await ethers.provider.getBalance(yourContract.target)).to.equal(price);

      // // Withdraw the funds
      await yourContract.connect(owner).withdraw();

      // Check the balance of the contract after withdrawal
      expect(await ethers.provider.getBalance(yourContract.target)).to.equal(0);
    });
  });

});

