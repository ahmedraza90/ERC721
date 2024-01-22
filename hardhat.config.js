require("@nomicfoundation/hardhat-toolbox");


const INFURA_API_KEY = "17a0a4a8d3af4e4a8337f3f3419b65af";
const SEPOLIA_PRIVATE_KEY = "a6a8db63fbf66c82d2c158d62f259fb8add1f99b09befb4ecd926ba01a7e71e4";
const etherSapolia = "9KX1RJF983A6GT6HDE2324UNKH8KKRNUZF"
// 0xD665D1A79E69cE87557B2c0E9a9E720728335fD4

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    //  hardhat: {
    //   gas: 40000000, // Adjust this value to increase the gas limit
    // },
  //   etherscan: {
  //     apiKey: "9KX1RJF983A6GT6HDE2324UNKH8KKRNUZF", // Your Etherscan API key
  //  },
  }  
};


