require("@nomicfoundation/hardhat-toolbox");


const INFURA_API_KEY = "17a0a4a8d3af4e4a8337f3f3419b65af";
const SEPOLIA_PRIVATE_KEY = "a6a8db63fbf66c82d2c158d62f259fb8add1f99b09befb4ecd926ba01a7e71e4";
// a6a8db63fbf66c82d2c158d62f259fb8add1f99b09befb4ecd926ba01a7e71e4
// f755c84ffc1d13b81224284bc4d33fd3d523e8189612f1cc0abf2f5ae3094208
const etherSapolia = "5TFHXHQ6DSKVHJ7KRP4EXXSG5C21YSMRYS"

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {  
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
  },
  etherscan : {
    apiKey : "5TFHXHQ6DSKVHJ7KRP4EXXSG5C21YSMRYS"
  }
};


// npx hardhat verify --network sepolia 0x93A10C9F439309779ed9eC227ec0EB942A339F1e "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E" "Fido" "FD"  "www.baseuri.com/hidden" "0xe7c4507f0f61df91d6732a47735e762501aa914a34345b7722cd4bc85f795e2e"


// npx hardhat run --network sepolia  scripts/deploy.js



// 0x2674825E9F5a21391582A42a4Ef0664FC23E6c06(verified) = Sunday = 4:08pm
// 0x2d105b8Ff24E348Bed24A682e7D63b01e0Ef1E49  = Monday = 7:19am
// 0x7d0680a4611993cFc289DDFD714556A959226a91(verified)  = Monday =  8:30pm
// xe6f7E5D6a00A2A7A2aE484b2680e3Ad31a7fc7CB = Tuesday  = 2:42pm
// 0x84ccB0281B6085608bc4A76200C499f630000663 = Wednesday = 7:57p.m
// 0x197b6bF1F0ce117Db2EB1F4b0AA1fc5bEc15bEED(verified) =

// bulk
// https://sepolia.etherscan.io/tx/0xbad4e35d34fa1f298a7d5f48fe967c62c2444e2c849042cebad5ba61397491da = Monday = 8:00pm
// https://sepolia.etherscan.io/tx/0xcde8909f8ff0341f6f2fc1e36cbf475b6dc3e4f9ac6001d8a441396ffe71de5d = 100 = Tuesday = 4:20pm



// testing:
// 0x32E6F4368bf19Ec0dc75A95e79BC5e9cD0599131()
// 0xd1a376AF07fbB10C1AD16534e5830450DB508284
// 0x46a5b78D4C19F1e00D946FFDC9e7AFdD0F4CF5Fe