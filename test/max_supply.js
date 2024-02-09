const { expect } = require("chai");
const { ethers } = require("hardhat");
// command to run this test file = npx hardhat test ./test/total_supply.js
// to make this test run first make a change give below in a smart contract in a required of condition of safemint
// uint256 MAX_SUPPLY = 12;

describe("FidoDido Testing", function () {

  let yourContract, owner, addr1, addr2, addrs;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const contract = await ethers.getContractFactory("FidoDido");
    yourContract = await contract.deploy(owner, "Fido", "FD", "www.baseuri.com/hidden", "0x5ad2a9fbc10b7af1275ac8e1abdf73c79e3000400cce9218e518e02b2f3a6efd");
  });

  it("Max Supply Reached", async () => {
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
    const supply = await yourContract.totalSupply();
    // expect(supply).to.equal(12);

    console.log("--------------", supply)
  });

});