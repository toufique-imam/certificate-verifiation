// import * as IPFS from 'ipfs-core'
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function UploadToIPFS(ipfs, file) {
    const { cid } = await ipfs.add(file);
    return String(cid);
}
async function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }else{
            console.error("error" , xmlHttp.status)
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
function getExtension(mimetype) {
    if (mimetype === "text/html") return "html";
    if (mimetype === "text/css") return "css";
    if (mimetype === "text/xml") return "xml";
    if (mimetype === "image/gif") return "gif";
    if (mimetype === "image/jpeg") return "jpeg";
    if (mimetype === "application/x-javascript") return "js";
    if (mimetype === "application/atom+xml") return "atom";
    if (mimetype === "application/rss+xml") return "rss";
    if (mimetype === "text/mathml") return "mml";
    if (mimetype === "text/plain") return "txt";
    if (mimetype === "text/vnd.sun.j2me.app-descriptor") return "jad";
    if (mimetype === "text/vnd.wap.wml") return "wml";
    if (mimetype === "text/x-component") return "htc";
    if (mimetype === "image/png") return "png";
    if (mimetype === "image/tiff") return "tiff";
    if (mimetype === "image/vnd.wap.wbmp") return "wbmp";
    if (mimetype === "image/x-icon") return "ico";
    if (mimetype === "image/x-jng") return "jng";
    if (mimetype === "image/x-ms-bmp") return "bmp";
    if (mimetype === "image/svg+xml") return "svg";
    if (mimetype === "image/webp") return "webp";
    if (mimetype === "application/java-archive") return "jar";
    if (mimetype === "application/mac-binhex40") return "hqx";
    if (mimetype === "application/msword") return "doc";
    if (mimetype === "application/pdf") return "pdf";
    if (mimetype === "application/postscript") return "eps";
    if (mimetype === "application/rtf") return "rtf";
    if (mimetype === "application/vnd.ms-excel") return "xls";
    if (mimetype === "application/vnd.ms-powerpoint") return "ppt";
    if (mimetype === "application/vnd.wap.wmlc") return "wmlc";
    if (mimetype === "application/vnd.google-earth.kml+xml") return "kml";
    if (mimetype === "application/vnd.google-earth.kmz") return "kmz";
    if (mimetype === "application/x-7z-compressed") return "7z";
    if (mimetype === "application/x-cocoa") return "cco";
    if (mimetype === "application/x-java-archive-diff") return "jardiff";
    if (mimetype === "application/x-java-jnlp-file") return "jnlp";
    if (mimetype === "application/x-makeself") return "run";
    if (mimetype === "application/x-perl") return "pl";
    if (mimetype === "application/x-pilot") return "pdb";
    if (mimetype === "application/x-rar-compressed") return "rar";
    if (mimetype === "application/x-redhat-package-manager") return "rpm";
    if (mimetype === "application/x-sea") return "sea";
    if (mimetype === "application/x-shockwave-flash") return "swf";
    if (mimetype === "application/x-stuffit") return "sit";
    if (mimetype === "application/x-tcl") return "tcl";
    if (mimetype === "application/x-x509-ca-cert") return "crt";
    if (mimetype === "application/x-xpinstall") return "xpi";
    if (mimetype === "application/xhtml+xml") return "xhtml";
    if (mimetype === "application/zip") return "zip";
    if (mimetype === "application/octet-stream") return "bin";
    if (mimetype === "application/octet-stream") return "deb";
    if (mimetype === "application/octet-stream") return "dmg";
    if (mimetype === "application/octet-stream") return "eot";
    if (mimetype === "application/octet-stream") return "img";
    if (mimetype === "application/octet-stream") return "msi";
    if (mimetype === "audio/midi") return "midi";
    if (mimetype === "audio/mpeg") return "mp3";
    if (mimetype === "audio/ogg") return "ogg";
    if (mimetype === "audio/x-realaudio") return "ra";
    if (mimetype === "video/3gpp") return "3gp";
    if (mimetype === "video/mpeg") return "mpeg";
    if (mimetype === "video/quicktime") return "mov";
    if (mimetype === "video/x-flv") return "flv";
    if (mimetype === "video/x-mng") return "mng";
    if (mimetype === "video/x-ms-asf") return "asf";
    if (mimetype === "video/x-ms-wmv") return "wmv";
    if (mimetype === "video/x-msvideo") return "avi";
    if (mimetype === "video/mp4") return "mp4";
    return "unknown";
}
async function DownloadFromIPFS(ipfs_hash) {
    //https://ipfs.io/ipfs/
     httpGetAsync("https://ipfs.io/ipfs/" + ipfs_hash, async function (filebuffer) {
        var stringval = filebuffer.toString();
        console.log("stringval ", stringval);
        let encodedString = stringval.split(',')[1];
        let mimetype = stringval.split(',')[0].split(':')[1].split(';')[0];
        console.log("Mime", mimetype)
        let data = atob(encodedString);
        var ab = new ArrayBuffer(data.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        }
        let blob = new Blob([ia], { "type": mimetype });
        let filename = 'filename.' + getExtension(mimetype);
        console.log(filename);

        const buffer = await Buffer.from(await blob.arrayBuffer());
        fs.writeFile(filename, buffer, () => console.log('file saved!'));
    });
}
async function Get_IPFSHASH(ipfs,file) {
    const option = {
        "onlyHash": true
    }
    const { cid } = await ipfs.add(file, option);
    return String(cid);
}


exports.UploadToIPFS = UploadToIPFS;
exports.DownloadFromIPFS = DownloadFromIPFS;
exports.Get_IPFSHASH = Get_IPFSHASH;