require("@nomicfoundation/hardhat-toolbox");


const INFURA_API_KEY_SEPOLIA = "17a0a4a8d3af4e4a8337f3f3419b65af";
const SEPOLIA_PRIVATE_KEY = "a6a8db63fbf66c82d2c158d62f259fb8add1f99b09befb4ecd926ba01a7e71e4" //ahmed
const etherSapolia = "5TFHXHQ6DSKVHJ7KRP4EXXSG5C21YSMRYS"

const INFURA_API_KEY_MAINNET = "17a0a4a8d3af4e4a8337f3f3419b65af";
const MAINNET_PRIVATE_KEY = "a6a8db63fbf66c82d2c158d62f259fb8add1f99b09befb4ecd926ba01a7e71e4" //ahmed
const etherMainnet = "5TFHXHQ6DSKVHJ7KRP4EXXSG5C21YSMRYS"

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {  
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY_SEPOLIA}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY_MAINNET}`,
      accounts: [MAINNET_PRIVATE_KEY]
    }
  },
  etherscan : {
    apiKey : etherMainnet
  }
};;