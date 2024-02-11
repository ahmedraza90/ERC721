const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contract = await ethers.getContractFactory("FidoDido");
  const contractAdd = await contract.deploy(
    deployer.address,
    "FidoDido",
    "FDP",
    "https://fidodido-hidden7777.s3.eu-west-1.amazonaws.com/metadata/", 
    "0xfb226b744187c389d141ce4e695ca699ff9a1131d37546488acc8b570627f968"
  );
  
  console.log("Token address:", contractAdd.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
