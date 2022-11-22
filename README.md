# Certificate verification

## Setup
- Follow <a href="https://www.web3.university/tracks/create-a-smart-contract/deploy-your-first-smart-contract">this instruction</a> for setup
- That instruction will show you how to setup the `Alchemy` and `Metamask`
- Getting `Private key` from `Metamask`
- Getting `API_KEY` and `API_URL` from `alchemy`

## Running 
- one time
    - `npm install --save-dev hardhat`
    - `npm install`
- start the CLI : `npx hardhat run scripts/interact.js`

## Project Overview
- <b>contracts/CertificateVerification.sol</b>: Contains the solidity codes
- <b>scripts/utils/ipfs_utils.js</b>: IPFS related codes for generating hash, uploading/downloading hash
- <b>scripts/utils/listener.js</b>: creates listener to contract's event (NOT WORKING)
- <b>scripts/contract_utils.js</b>: Contract initialization code
- <b>scripts/deploy.js</b>: Contract deploy code
- <b>scripts/interact.js</b>: Contains interaction code with contract and IPFS functionalities

- check contract on <a href="https://goerli.etherscan.io/address/0x4cc08B112Abe99d692e7Fd535035B283CD4cF6Bb">etherscan</a>
