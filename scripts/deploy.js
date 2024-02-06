const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contract = await ethers.getContractFactory("FidoDido");
  const contractAdd = await contract.deploy(deployer.address, "FidoDido", "FDP", "https://fidodido-hidden7777.s3.eu-west-1.amazonaws.com/metadata/", "0x5ad2a9fbc10b7af1275ac8e1abdf73c79e3000400cce9218e518e02b2f3a6efd");
  
  console.log("Token address:", contractAdd.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
