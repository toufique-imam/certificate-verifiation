const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/CertificateVerification.sol/CertificateVerification.json");
// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = "goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const certificateVerificationContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function AddBook(ip_hash) {
    //adds ipfs_hash mapped to adder_public_key in ethereum
    const message = await certificateVerificationContract.add_book(ip_hash);
    return message
}

async function VerifyDocument(ip_hash) {
    //will return true/false
    const message = await certificateVerificationContract.verifyDocument(ip_hash);
    return message
}

async function GetDocumentAddedTime(ip_hash) {
    //will return when the document was added
    const message = await certificateVerificationContract.getDocumentAddedTime(ip_hash);
    return message
}
async function GetDocumentAdderPublicId(ip_hash) {
    //will return who added the document
    const message = await certificateVerificationContract.getDocumentAdderPublicId(ip_hash);
    return message
}

exports.GetDocumentAddedTime = GetDocumentAddedTime;
exports.GetDocumentAdderPublicId = GetDocumentAdderPublicId;
exports.VerifyDocument = VerifyDocument;
exports.AddBook = AddBook;
exports.certificateVerificationContract = certificateVerificationContract;