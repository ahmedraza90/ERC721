const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FidoDido Testing", function () {

  let yourContract, owner, addr1, addr2, addrs;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const contract = await ethers.getContractFactory("FidoDido");
    yourContract = await contract.deploy(owner, "Fido", "FD", "www.baseuri.com/hidden", "0x5ad2a9fbc10b7af1275ac8e1abdf73c79e3000400cce9218e518e02b2f3a6efd");
  });

  // describe("All Basic Functionalities", function () {

  //   it("Should toggle phase", async function () {
  //     await yourContract.connect(owner).switchPhase();
  //     expect(await yourContract._isPrivatePhase()).to.equal(false);
  //     await yourContract.connect(owner).switchPhase();
  //     expect(await yourContract._isPrivatePhase()).to.equal(true);
  //   });

  //   it("Should revert if not called by owner", async function () {
  //     await expect(yourContract.connect(addr1).revealNFT("newBaseURI")).to.be.reverted;
  //   });

  // });

  // describe("batchAirdrop", function () {

  //   const signers = [];
  //   for (let i = 0; i < 777; i++) {
  //     const wallet = ethers.Wallet.createRandom();
  //     signers.push(wallet.address);
  //   }

  //   it("Should mint tokens to each recipient and balnace should increase accordingly", async function () {
  //     await yourContract.connect(owner).batchAirdrop(signers);
  //     for (let i = 0; i < signers.length; i++) {
  //       const balance = await yourContract.balanceOf(signers[i]);
  //       expect(balance).to.equal(1);
  //     }
  //   });

  //   it("Should revert if not called by owner", async function () {
  //     await expect(yourContract.connect(addr1).batchAirdrop(signers)).to.be.reverted;
  //   });

  // });

  // describe("SingleAirdrop", function () {

  // it("Should mint tokens to single recipient and balnace should increase accordingly", async function () {
  //   await yourContract.connect(owner).airdrop(addr1, 10);
  //   const balance = await yourContract.balanceOf(addr1);
  //   expect(balance).to.equal(10);
  // });

  // it("Should revert if not called by owner of smart contract", async function () {
  //   await expect(yourContract.connect(addr1).airdrop(addr2, 1)).to.be.reverted;
  // });

  // });

  describe("safeMint", () => {
    it("should mint a token if privateSale's conditions are met", async () => {
      const price5 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0xCAe968DC8e1BE15630Ddd5c06Ab90A6425383D9d", [
        "0xd60a72c5b1c435801078a5feff7ed3f2faef69976dd78889484525c176c1d8ab",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price5 })).to.emit(yourContract, "Transfer");
      const price4 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x6fee6A6Cc73C8ad635ABD2f25e3Bf98552dCC9a8",
      [
        "0x2e11e6a7687e7ec82f0de53b3fb9f6b90df49ea013b5dc5d000331f48c1879e1",
        "0x93f7be187118eb3e3c2e2967739201da9aff38df249cb7ee6ddb19a1bbf5fa59",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price4 })).to.emit(yourContract, "Transfer");
      const price3 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0xB2afcC303803968DF8672cBCEEcc3995aA962Ca2", [
        "0x01add8b21b3d9cecb21f39748a7708d85b957243e6fbc05222d6367b89d60f82",
        "0x93f7be187118eb3e3c2e2967739201da9aff38df249cb7ee6ddb19a1bbf5fa59",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price3 })).to.emit(yourContract, "Transfer");
      const price2 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x7915BB50c60cdFA90C12070f6a6662406F21DE00", [
        "0x315044968d34eb9bcd9a5887e2123e1be952148805eaed62474469946eb7d9c8",
        "0x9304665ddd79a31f6f2326de3aa27d32192c0f8dfcca0ebb88ddbbf1690f41e9",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price2 })).to.emit(yourContract, "Transfer");
      const price1 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E", [
        "0x04aae2e1e5282891d8959f3dff5d67dced31f0248fa2e93fe16a210b5cca073b",
        "0x9304665ddd79a31f6f2326de3aa27d32192c0f8dfcca0ebb88ddbbf1690f41e9",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price1 })).to.emit(yourContract, "Transfer");
      const price0 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0xd218fbd3375ba42cec17f618df2ff039f7d9edc2", [
        "0xdc16818b037749f8e0fc6109e1777cf23181d2af41e7934257dc52cc592a1336",
        "0x72bcf7efaedb54d7d9536bdf598ace13dd75d6526e35fce93a98613383f65ffe",
        "0x51e41d1c1e6604d7baa1a5e86be7b1b8f09ee8d93107ce4126f28e59009fb4f6",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price0 })).to.emit(yourContract, "Transfer");
      await expect(yourContract.safeMint(1, "0x8023627afa6f626ce396c82b4ad5182f437be1c7", [
        "0x12333f4e8552bd30cd140b53098fe0cab6f047d393a56710c35e6a793eb2ccbf",
        "0x72bcf7efaedb54d7d9536bdf598ace13dd75d6526e35fce93a98613383f65ffe",
        "0x51e41d1c1e6604d7baa1a5e86be7b1b8f09ee8d93107ce4126f28e59009fb4f6",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price0 })).to.be.revertedWith("Total supply limit reached during private phase");
    });

    it("should mint a token if privateSale's conditions are met ==> owner pause the minting ==> owner do batch minting of 100 addresses ==> balance of all 100 addressess should be 1 ==> user mint nft but reverted with mint has been pause ==> owner unpause the contract ==> user tries to mint but reverted but private limit has been reached ==> owner change public phase ==> user tries to mint 2 nfts but rverted with mint limit ==> user mmint 1 nft successfuly ==> user tries to mint but revert with limit reached ", async () => {
      const price5 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0xCAe968DC8e1BE15630Ddd5c06Ab90A6425383D9d", [
        "0xd60a72c5b1c435801078a5feff7ed3f2faef69976dd78889484525c176c1d8ab",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price5 })).to.emit(yourContract, "Transfer");
      const price4 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x6fee6A6Cc73C8ad635ABD2f25e3Bf98552dCC9a8",
      [
        "0x2e11e6a7687e7ec82f0de53b3fb9f6b90df49ea013b5dc5d000331f48c1879e1",
        "0x93f7be187118eb3e3c2e2967739201da9aff38df249cb7ee6ddb19a1bbf5fa59",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price4 })).to.emit(yourContract, "Transfer");
      const price3 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0xB2afcC303803968DF8672cBCEEcc3995aA962Ca2", [
        "0x01add8b21b3d9cecb21f39748a7708d85b957243e6fbc05222d6367b89d60f82",
        "0x93f7be187118eb3e3c2e2967739201da9aff38df249cb7ee6ddb19a1bbf5fa59",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price3 })).to.emit(yourContract, "Transfer");
      const price2 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x7915BB50c60cdFA90C12070f6a6662406F21DE00", [
        "0x315044968d34eb9bcd9a5887e2123e1be952148805eaed62474469946eb7d9c8",
        "0x9304665ddd79a31f6f2326de3aa27d32192c0f8dfcca0ebb88ddbbf1690f41e9",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price2 })).to.emit(yourContract, "Transfer");
      const price1 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E", [
        "0x04aae2e1e5282891d8959f3dff5d67dced31f0248fa2e93fe16a210b5cca073b",
        "0x9304665ddd79a31f6f2326de3aa27d32192c0f8dfcca0ebb88ddbbf1690f41e9",
        "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price1 })).to.emit(yourContract, "Transfer");
      await yourContract.connect(owner).pause();

      const signers = [];
      for (let i = 0; i < 100; i++) {
        const wallet = ethers.Wallet.createRandom();
        signers.push(wallet.address);
      }
      await yourContract.connect(owner).batchAirdrop(signers);
      for (let i = 0; i < signers.length; i++) {
        const balance = await yourContract.balanceOf(signers[i]);
        expect(balance).to.equal(1);
      }
      const price0 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(1, "0x8023627afa6f626ce396c82b4ad5182f437be1c7", [
        "0x12333f4e8552bd30cd140b53098fe0cab6f047d393a56710c35e6a793eb2ccbf",
        "0x72bcf7efaedb54d7d9536bdf598ace13dd75d6526e35fce93a98613383f65ffe",
        "0x51e41d1c1e6604d7baa1a5e86be7b1b8f09ee8d93107ce4126f28e59009fb4f6",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price0 })).to.be.revertedWith("mint has been pause");

      await yourContract.connect(owner).unpause();

      const price = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(1, "0x8023627afa6f626ce396c82b4ad5182f437be1c7", [
        "0x12333f4e8552bd30cd140b53098fe0cab6f047d393a56710c35e6a793eb2ccbf",
        "0x72bcf7efaedb54d7d9536bdf598ace13dd75d6526e35fce93a98613383f65ffe",
        "0x51e41d1c1e6604d7baa1a5e86be7b1b8f09ee8d93107ce4126f28e59009fb4f6",
        "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
        "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
        "0x8a24ad0ed106e9ecf15069728089b5f8480919a173fa6e48cc3ffabb74f85cee",
        "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
        "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
        "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
      ], { value: price })).to.be.revertedWith("Total supply limit reached during private phase");

      await yourContract.connect(owner).switchPhase();

      const price_0 = ethers.parseEther("0.06");
      await expect(yourContract.safeMint(2, "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E", [] , { value: price_0 })).to.be.revertedWith("Mint limit reached");
      await expect(yourContract.safeMint(1, "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E", [] , { value: price_0 })).to.emit(yourContract, "Transfer");
      await expect(yourContract.safeMint(1, "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E", [] , { value: price_0 })).to.be.revertedWith("Mint limit reached");


    });

    // it("should mint a token if privateSale's conditions are met", async () => {
    //   const price = ethers.parseEther("0.06");
    //   await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //     "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //     "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //     "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //     "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //   ], { value: price })).to.emit(yourContract, "Transfer");
    // });

    // it("should mint a token on public sale", async () => {
    //   await yourContract.connect(owner).switchPhase();
    //   expect(await yourContract._isPrivatePhase()).to.equal(false);
    //   const price = ethers.parseEther("0.04");
    //   await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })).to.emit(yourContract, "Transfer");
    // });

    // it("should revert if mint limit on whitelist wallet is reached while minting 1 nft", async () => {
    //   for (let i = 0; i < 2; i++) {
    //     const price = ethers.parseEther("1");
    //     await yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //       "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //       "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //       "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //       "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //     ], { value: price })
    //   }
    //   const price = ethers.parseEther("0.5");
    //   await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //     "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //     "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //     "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //     "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //   ], { value: price })).to.be.revertedWith("Mint limit reached");
    // });

    // it("should revert if mint limit on whitelist wallet while minting 2 nfts", async () => {
    //   const price = ethers.parseEther("1");
    //   await expect(yourContract.safeMint(3, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //     "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //     "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //     "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //     "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //   ], { value: price })).to.be.revertedWith("Mint limit reached");
    // });

    // it("should revert if mint limit on public wallet is reached while minting single nft", async () => {
    //   await yourContract.connect(owner).switchPhase();
    //   const price = ethers.parseEther("1");
    //   await yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })
    //   await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //     "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //     "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //     "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //     "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //   ], { value: price })).to.be.revertedWith("Mint limit reached");
    // });

    // it("should revert if mint limit on public wallet is reached while minting nfts in bulk", async () => {
    //   await yourContract.connect(owner).switchPhase();
    //   const price = ethers.parseEther("1");
    //   await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })).to.be.revertedWith("Mint limit reached");
    // });

    // it("should revert if wrong Ether value is sent on privateSale", async () => {
    //   const price = ethers.parseEther("0.0008"); // assuming the price is 1 ether
    //   await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //     "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //     "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //     "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //     "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //   ], { value: price })).to.be.revertedWith("Wrong Ether value");
    // });

    // it("should revert if wrong Ether value is sent on PublicSale", async () => {
    //   await yourContract.connect(owner).switchPhase();
    //   expect(await yourContract._isPrivatePhase()).to.equal(false);
    //   const price = ethers.parseEther("0.03"); // assuming the price is 1 ether
    //   await expect(yourContract.safeMint(1, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [], { value: price })).to.be.revertedWith("Wrong Ether value");
    // });

    // it("should revert if invalid merkle proof is provided", async () => {
    //   const price = ethers.parseEther("0.5");
    //   await expect(yourContract.safeMint(1, "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", [
    //     "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //     "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //     "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //     "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //   ], { value: price })).to.be.revertedWith("Invalid merkle proof");
    // });
    // });

    // describe("Withdraw", function () {
    //   it("Should allow the owner to withdraw funds", async function () {

    //     const price = ethers.parseEther("0.06");
    //     await expect(yourContract.safeMint(2, "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", [
    //       "0xc23d89d4ba0f8b56a459710de4b44820d73e93736cfc0667f35cdd5142b70f0d",
    //       "0x69d69b0b1ff7370614eb08e82548ff33a0a88d0099a7e432aecd6a81bad42b05",
    //       "0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097",
    //       "0xfe5d65a74904f29f64ca9d7c21d63cb08dd92b026114e1b6ff150b1f64f65451"
    //     ], { value: price })).to.emit(yourContract, "Transfer");

    //     // Check the balance of the contract
    //     expect(await ethers.provider.getBalance(yourContract.target)).to.equal(price);

    //     // // Withdraw the funds
    //     await yourContract.connect(owner).withdraw();

    //     // Check the balance of the contract after withdrawal
    //     expect(await ethers.provider.getBalance(yourContract.target)).to.equal(0);
    //   });
  });



});