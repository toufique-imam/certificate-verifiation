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
//0xC745f28d1fa2f3F1f613dAA3C807bc21E3c0392D
