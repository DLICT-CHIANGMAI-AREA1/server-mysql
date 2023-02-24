const admin = require("firebase-admin");
const serviceAccount = require("../config/chiangmaiarea1-server-key.json");
const BUCKET = "chiangmaiarea1-server.appspot.com";
const FirebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});
const storage = FirebaseApp.storage();
const bucket = storage.bucket();

const uploadFile = (res, req, next) => {
    
    const folder = "file";
    const fileName = `${folder}/${Date.now()}`;
    const fileUpload = bucket.file(fileName);
    console.log(req.file);
    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on("error", (err) => {
        res.status(405).json(err);
    });

    blobStream.on("finish", async () => {
        await fileUpload.makePublic();
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`; // สร้าง path
        next();
    });

    blobStream.end(req.file.buffer);
};

module.exports = uploadFile;
