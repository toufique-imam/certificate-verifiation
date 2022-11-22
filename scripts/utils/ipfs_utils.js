const FileType = require('file-type');
const fs = require('fs')
async function UploadToIPFS(ipfs, file) {
    const { cid } = await ipfs.add(file);
    return String(cid);
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function download(text, name, mimetype) {
    if (!fs.existsSync("download/")) {
        fs.mkdirSync("download/");
    }
    fs.writeFileSync(name, text, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}
async function DownloadFromIPFS(ipfs, ipfs_hash) {
    for await (const chunk of ipfs.cat(ipfs_hash)) {
        const fileinfo = await FileType.fromBuffer(chunk)
        const stringval = chunk.toString();
        var ext = "txt"
        var mimetype = "text/*"
        if (fileinfo != undefined) {
            ext = fileinfo.ext.toString()
            mimetype = fileinfo.mime.toString()
        }
        const timenow = Date.now();
        console.log("file type >> ", ext, mimetype, fileinfo, timenow);
        download(stringval, "download/download_" + String(timenow) + "." + ext, mimetype);
    }
}
//QmVKBFKYB7jntr5XmhjxD2EbLJHRti2Ziyw7iSR7EYXZVA
async function Get_IPFSHASH(ipfs, file) {
    const option = {
        "onlyHash": true
    }
    const { cid } = await ipfs.add(file, option);
    return String(cid);
}


exports.UploadToIPFS = UploadToIPFS;
exports.DownloadFromIPFS = DownloadFromIPFS;
exports.Get_IPFSHASH = Get_IPFSHASH;