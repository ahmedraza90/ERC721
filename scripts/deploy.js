const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contract = await ethers.getContractFactory("FidoDido");
  const contractAdd = await contract.deploy(deployer.address, "FidoDido", "FDP", "https://fidodido-hidden7777.s3.eu-west-1.amazonaws.com/metadata/", "0x33232dfda16210085aaf909ee81605eec687357f9028d171adedc184fdc3ff58");
  
  console.log("Token address:", contractAdd.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
