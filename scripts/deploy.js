const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contract = await ethers.getContractFactory("FidoDido");
  const contractAdd = await contract.deploy(deployer.address, "Fido", "FD", "www.baseuri.com/hidden", "0xe7c4507f0f61df91d6732a47735e762501aa914a34345b7722cd4bc85f795e2e");
  
  console.log("Token address:", contractAdd.target);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
