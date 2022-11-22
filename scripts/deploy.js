async function main() {
  const CertificateVerification = await ethers.getContractFactory("CertificateVerification");

  // Start deployment, returning a promise that resolves to a contract object
  const certificate_verification = await CertificateVerification.deploy();
  console.log("Contract deployed to address:", certificate_verification.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//npx hardhat run scripts/deploy.js --network goerli
//0x4cc08B112Abe99d692e7Fd535035B283CD4cF6Bb
