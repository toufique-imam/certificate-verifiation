const { certificateVerificationContract } = require("../contract_utils")

async function main() {
    certificateVerificationContract.on("AddedDocument", (ipfs_hash, id, timeAdded, event) => {
        let info = {
            ipfs_hash: ipfs_hash,
            id: id,
            timeAdded: timeAdded,
            data: event,
        };
        console.log("here1", JSON.stringify(info, null, 4));
    });
    certificateVerificationContract.on("AddDocumentError", (ipfs_hash, error, event) => {
        let info = {
            ipfs_hash: ipfs_hash,
            error: error,
            data: event,
        };
        console.log("here", JSON.stringify(info, null, 4));
    });
}
main();
////npx hardhat run scripts/listener.js