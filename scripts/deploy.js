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
    "0x88ffe5cd571e7cf355d419ae3a1560a7829af670e1b7c65723bc71a34668811d"
  );
  
  console.log("Token address:", contractAdd.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
