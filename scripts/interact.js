const prompt = require("prompt-sync")({ sigint: true });
const { time } = require("console");
var fs = require("fs");
const { GetDocumentAddedTime, GetDocumentAdderPublicId, VerifyDocument, AddBook, certificateVerificationContract } = require("./contract_utils")
const { UploadToIPFS, DownloadFromIPFS, Get_IPFSHASH } = require("./ipfs_utils");

function readFile(file_path) {
    return fs.readFileSync(file_path, "utf8");
}
async function AddBookAction(file_path) {
    if (fs.existsSync(file_path)) {
        const data = readFile(file_path);
        //convert it to IPFS_HASH
        const ipfs_hash = await UploadToIPFS(data)
        const result = await VerifyDocument(ipfs_hash);

        if (result == true) {
            //check if already exists
            console.error("Error: Already Added");
        } else {
            //add the document
            const res = await AddBook(ipfs_hash);
            console.info("Result: " + res);
        }
    } else {
        console.error("Error: file not found")
    }
}

async function VerifyBookAction(file_path) {
    if (fs.existsSync(file_path)) {
        const data = readFile(file_path);
        //convert it to IPFS_HASH
        const ipfs_hash = await Get_IPFSHASH(data);
        const result = await VerifyDocument(ipfs_hash);
        console.log("ipfs_hash >>" , ipfs_hash);

        if (result == false) {
            //check if already exists
            console.error("Error: Not verified");
        } else {
            //add the document
            const time_added = await GetDocumentAddedTime(ipfs_hash);
            const pub_key = await GetDocumentAdderPublicId(ipfs_hash);
            console.info("result : ", result, time_added, pub_key);
            return time, pub_key
        }
    } else {
        console.error("Error: file not found");
    }
    return null, null
}

async function DownloadBookAction(file_hash) {
    await DownloadFromIPFS(file_hash)
}

function showLog(stage, mode) {
    if (stage == 1) {
        console.log(
            "1. upload a document",
            "2. verify a document",
            "3. Download a document",
            "0. Exit"
        );
    }
    else if (stage == 2) {
        if (mode == 1 || mode == 2) {
            console.log(
                "input document path",
            );
        } else {
            console.log(
                "input document ipfs_hash",
            );
        }
    }
}
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
        console.log("here" , JSON.stringify(info, null, 4));
    });
    var mode = 0
    while (true) {
        console.log("welcome");
        showLog(1, mode);
        mode = prompt("Select Mode : ");
        if (mode == 0) {
            break;
        }
        console.log("You selected >> ", mode);
        showLog(2, mode);
        const input_str = prompt("enter here: ");
        console.log("You entered >> ", input_str);
        if (mode == 1) {
            await AddBookAction(input_str);
        } else if (mode == 2) {
            await VerifyBookAction(input_str);
        } else if (mode == 3) {
            await DownloadBookAction(input_str);
        }
    }
    console.log("Exited");
}
main();
////npx hardhat run scripts/interact.js