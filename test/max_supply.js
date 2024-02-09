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
    yourContract = await contract.deploy(owner, "Fido", "FD", "www.baseuri.com/hidden", "0x3a5327516938353ec71661bfa235179f585c879f5c41e0976990da88f111e014");
  });

  it("Max Supply Reached", async () => {
    const price5 = ethers.parseEther("0.06");
    await expect(yourContract.safeMint(2, "0xC5EBeE08b42E7cfb1fFfA426359F6f8C26d92b04", [
      "0x8ff8b9566a40a488d4c25951b5f7cfda2e31150c0e4b301dedb5ed4db9486a5f",
      "0x914a64e031c0091d93b910daa3181ba4e61b7f9a1c7bca98b18f1e4ee9567a65",
      "0xbc47590da2790e325072510010b0b0e916defc2fb1c318ea6a5ca16ff5d69255",
      "0xd614159dd9fcb1192491d9ebbb75dcdeaac9c6dd67ea7dc9a905e2704eac9f51",
      "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
      "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
    ], { value: price5 })).to.emit(yourContract, "Transfer");
    const price4 = ethers.parseEther("0.06");
    await expect(yourContract.safeMint(2, "0xfc864d1ff969599e7ea094e74d01f5e66f15e424",
    [
      "0x1f066f2e647aa2caa86b07d8dbb47ffba60b27ea3e27c4129fa6553d64f444fe",
      "0x53b498d11e1c9f9eb91bf0166e45ec222c02b9c596cc68c4dfc5c2b5e1aa7300",
      "0xb579c8e440f9ac74cf9189813254256900ef2c12830dc9576b825ba3a671ad52",
      "0xd1ec3c2c8b624e2384e1e5b3f11f269e3085139451d0ea726badc9ca79aca857",
      "0x6ab18e87a83dfe3309d29de7ad3500069974c5b129f11bbd6961c736428227e3",
      "0x471440641385dad07994cfebcc78314350c04aaa434ddf2182aa2a3e3878da56",
      "0x50935585c9038f97db01bb3e67bb95564fed50e59f080d92575d9fe919ef8647",
      "0xcd057b0402a45748afae2a16e02f771138fb912ee7982c48d8cfa4863f3318fc",
      "0xd6df378d5cbbcef0c83324a7fd25ed46f63bfe028846c081d78c3b47946424e8",
      "0xf50b59c017d1d3da1682886a34feb820a1d7431c8e10a619acf72f4722f4b80e",
      "0xa2acfa17d9d8dcbd29793ccab92a789c9702db03a5bf8a19a76afcbc706fc7b2",
      "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
    ], { value: price4 })).to.emit(yourContract, "Transfer");
    const price3 = ethers.parseEther("0.06");
    await expect(yourContract.safeMint(2, "0x4fae243a252489d78e72169814afabcaf9a17f4f", [
      "0x3ae0c738cd4d16d70d99b602a0aa90ecd91990635420777edd53d4b5849ea1ee",
      "0x53b498d11e1c9f9eb91bf0166e45ec222c02b9c596cc68c4dfc5c2b5e1aa7300",
      "0xb579c8e440f9ac74cf9189813254256900ef2c12830dc9576b825ba3a671ad52",
      "0xd1ec3c2c8b624e2384e1e5b3f11f269e3085139451d0ea726badc9ca79aca857",
      "0x6ab18e87a83dfe3309d29de7ad3500069974c5b129f11bbd6961c736428227e3",
      "0x471440641385dad07994cfebcc78314350c04aaa434ddf2182aa2a3e3878da56",
      "0x50935585c9038f97db01bb3e67bb95564fed50e59f080d92575d9fe919ef8647",
      "0xcd057b0402a45748afae2a16e02f771138fb912ee7982c48d8cfa4863f3318fc",
      "0xd6df378d5cbbcef0c83324a7fd25ed46f63bfe028846c081d78c3b47946424e8",
      "0xf50b59c017d1d3da1682886a34feb820a1d7431c8e10a619acf72f4722f4b80e",
      "0xa2acfa17d9d8dcbd29793ccab92a789c9702db03a5bf8a19a76afcbc706fc7b2",
      "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
    ], { value: price3 })).to.emit(yourContract, "Transfer");
    const price2 = ethers.parseEther("0.06");
    await expect(yourContract.safeMint(2, "0x7a94342fc568e6e057c082765b81f4e3f16640d7", [
      "0xfb67961a064f7683dc75be7d564b994afdb821d22763b269855c08599464538c",
      "0x0f8e35bf32e35ace825b1678d3e9ec4a9f5bf79394d7fd2237fcf604952796b7",
      "0xb579c8e440f9ac74cf9189813254256900ef2c12830dc9576b825ba3a671ad52",
      "0xd1ec3c2c8b624e2384e1e5b3f11f269e3085139451d0ea726badc9ca79aca857",
      "0x6ab18e87a83dfe3309d29de7ad3500069974c5b129f11bbd6961c736428227e3",
      "0x471440641385dad07994cfebcc78314350c04aaa434ddf2182aa2a3e3878da56",
      "0x50935585c9038f97db01bb3e67bb95564fed50e59f080d92575d9fe919ef8647",
      "0xcd057b0402a45748afae2a16e02f771138fb912ee7982c48d8cfa4863f3318fc",
      "0xd6df378d5cbbcef0c83324a7fd25ed46f63bfe028846c081d78c3b47946424e8",
      "0xf50b59c017d1d3da1682886a34feb820a1d7431c8e10a619acf72f4722f4b80e",
      "0xa2acfa17d9d8dcbd29793ccab92a789c9702db03a5bf8a19a76afcbc706fc7b2",
      "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
    ], { value: price2 })).to.emit(yourContract, "Transfer");
    const price1 = ethers.parseEther("0.06");
    await expect(yourContract.safeMint(2, "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E", [
      "0x04aae2e1e5282891d8959f3dff5d67dced31f0248fa2e93fe16a210b5cca073b",
      "0x9304665ddd79a31f6f2326de3aa27d32192c0f8dfcca0ebb88ddbbf1690f41e9",
      "0xfa79daff5ea29279825066d0b6e7b8e9cf9a53f71f9ace2fc7335386e8fda65e",
      "0x1293c058403aaa31462e14abb5683fbe54c89bb93f812ae13f1c7a36339fe433",
      "0x583b55cfeebb541075def04c0c7cbad6276f21c5bc6018ef5cf96fc19e1dfeca",
      "0x05961971064c1bad410b85b3d279ad06336974f6f048fdd9fe360dc5f526746e",
      "0x19862de84563d20fd08c4b581c0784b7198975a91e7c14744ddf8b8a87c02d9c",
      "0x0d9aefa4dd27cd303a39cf87ace5991aa3289967985026c489cf45974fcb3cad",
      "0x0e99865699efc21372c6fbea3afaf7757841fc593354fbdf6248be9a25060d7c",
      "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
    ], { value: price1 })).to.emit(yourContract, "Transfer");
    const price0 = ethers.parseEther("0.06");
    await expect(yourContract.safeMint(2, "0xef2a7352e1afcc2c97f2a2bb885f58469a921988", [
      "0xad524253fedc695855461cd33cf01f4fcc09a8f4f08b2276f85de716e04d8da6",
      "0x0f8e35bf32e35ace825b1678d3e9ec4a9f5bf79394d7fd2237fcf604952796b7",
      "0xb579c8e440f9ac74cf9189813254256900ef2c12830dc9576b825ba3a671ad52",
      "0xd1ec3c2c8b624e2384e1e5b3f11f269e3085139451d0ea726badc9ca79aca857",
      "0x6ab18e87a83dfe3309d29de7ad3500069974c5b129f11bbd6961c736428227e3",
      "0x471440641385dad07994cfebcc78314350c04aaa434ddf2182aa2a3e3878da56",
      "0x50935585c9038f97db01bb3e67bb95564fed50e59f080d92575d9fe919ef8647",
      "0xcd057b0402a45748afae2a16e02f771138fb912ee7982c48d8cfa4863f3318fc",
      "0xd6df378d5cbbcef0c83324a7fd25ed46f63bfe028846c081d78c3b47946424e8",
      "0xf50b59c017d1d3da1682886a34feb820a1d7431c8e10a619acf72f4722f4b80e",
      "0xa2acfa17d9d8dcbd29793ccab92a789c9702db03a5bf8a19a76afcbc706fc7b2",
      "0xe1c01371ca636c831f293d535a529bc4fbe232730de2a0e84f93b77a926be45c"
    ], { value: price0 })).to.emit(yourContract, "Transfer");
    const supply = await yourContract.totalSupply();
    expect(supply).to.equal(12);

    console.log("--------------", supply)
  });

});