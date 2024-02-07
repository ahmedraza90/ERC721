require("@nomicfoundation/hardhat-toolbox");


const INFURA_API_KEY = "17a0a4a8d3af4e4a8337f3f3419b65af";
const SEPOLIA_PRIVATE_KEY =
  "fbdbdfcce596f39b4f0f47547b97227f22196c3544c050acfbb03e5f59e3a135";
// a6a8db63fbf66c82d2c158d62f259fb8add1f99b09befb4ecd926ba01a7e71e4 ahmed
// f755c84ffc1d13b81224284bc4d33fd3d523e8189612f1cc0abf2f5ae3094208
// fbdbdfcce596f39b4f0f47547b97227f22196c3544c050acfbb03e5f59e3a135 abuzar
// 0x65c64e9abd0f8eaf684f9de950e2b04668ed39060cd5da5902c517dbccdff7eb
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
};;


// npx hardhat verify --network sepolia  0x7C241006116c23A85A20c5e592993b124725f181 "0x34Baffa584cF55d1CCF8d8A2762e938e6f765F3E" "FidoDido" "FDP"  "https://fidodido-hidden7777.s3.eu-west-1.amazonaws.com/metadata/" "0xadc4c6829e84f407ae3b5989fc3bb94d65e43db3965d74360c4892bb6e687f3a"
// npx hardhat verify --network sepolia  0x96cE680c3fb3B691E1838C1536C0E1160E299197 "0xCAe968DC8e1BE15630Ddd5c06Ab90A6425383D9d" "FidoDido" "FDP"  "https://fidodido-hidden7777.s3.eu-west-1.amazonaws.com/metadata/" "0x88ffe5cd571e7cf355d419ae3a1560a7829af670e1b7c65723bc71a34668811d"
//


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


// new merkle
// 0x62A0DF92818213750994701435342a3Da2E933f5

// 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

// testing:
// 0x32E6F4368bf19Ec0dc75A95e79BC5e9cD0599131()
// 0xd1a376AF07fbB10C1AD16534e5830450DB508284
// 0x46a5b78D4C19F1e00D946FFDC9e7AFdD0F4CF5Fe