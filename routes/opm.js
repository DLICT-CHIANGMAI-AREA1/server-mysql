const router = require("express").Router();
const { CreatePDF, FindOP, UpdateOPM, DeleteOPM } = require("../controller/admin.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const admin = require("firebase-admin");
const serviceAccount = require("../config/chiangmaiarea1-server-key.json");
const BUCKET = "chiangmaiarea1-server.appspot.com";
const FirebaseApp = admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount),
        storageBucket: BUCKET,
    },
    "App1"
);

const storage = FirebaseApp.storage();
const bucket = storage.bucket();

router.post(
    "/api/CreatePDF",
    upload.single("OPM"),
    async (req, res, next) => {
        const CreatefirebaseUrls = async (file) => {
            console.log("Creating write stream...");
            const folder = "OPM";
            const fileName = `${folder}/${Date.now()}`;
            const fileUpload = bucket.file(fileName);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            await new Promise((resolve, reject) => {
                blobStream.on("finish", async () => {
                    console.log("Upload finished");
                    await fileUpload.makePublic();
                    file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`; // สร้าง path
                    resolve();
                });
                blobStream.on("error", (err) => {
                    console.log("Upload failed with error: ", err);
                    reject(err);
                });
                blobStream.end(file.buffer);
            });
        };

        await CreatefirebaseUrls(req.file);
        next();
    },
    CreatePDF
);
router.get("/api/FindPDF", FindOP);
router.put(
    "/api/UpdatePDF_OPM/:id",
    upload.single("OPM"),
    async (req, res, next) => {
        const CreatefirebaseUrls = async (file) => {
            console.log("Creating write stream...");
            const folder = "OPM";
            const fileName = `${folder}/${Date.now()}`;
            const fileUpload = bucket.file(fileName);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            await new Promise((resolve, reject) => {
                blobStream.on("finish", async () => {
                    console.log("Upload finished");
                    await fileUpload.makePublic();
                    file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`; // สร้าง path
                    resolve();
                });
                blobStream.on("error", (err) => {
                    console.log("Upload failed with error: ", err);
                    reject(err);
                });
                blobStream.end(file.buffer);
            });
        };

        await CreatefirebaseUrls(req.file);
        next();
    },
    UpdateOPM
);
router.delete("/api/Delete/:id", DeleteOPM);

/**
 * @swagger
 * components:
 *   schemas:
 *     Operating_Manual :
 *       type: object
 *       required:
 *         - _id
 *         - url
 *         - size
 *         - type
 *         - filename
 *
 *       properties:
 *         url:
 *           type: string
 *           description: url
 *         size:
 *           type: number
 *           description: size
 *         type:
 *           type: string
 *           description: type
 *         filename:
 *           type: string
 *           description: filename
 *       example:
 *         _id: 63a4206e491b9c921b3c2cf7
 *         url: https://cdn.filestackcontent.com/lf6qGRfSNuW64Xz29Na4
 *         size: 19653193
 *         type: application/pdf
 *         filename: temp.obj
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: Operating_Manual
 */
/**
 * @swagger
 * /admin/api/FindPDF:
 *   get:
 *     summary: FindPDF
 *     tags: [Operating_Manual]
 *     responses:
 *       200:
 *         description:   list of FindPDF
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Operating_Manual'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /admin/api/UpdatePDF_OPM/{id}:
 *   put:
 *     summary: UpdatePDF_OPM
 *     tags: [Operating_Manual]
 *     parameters:
 *        - in: path
 *          name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Operating_Manual'
 *     responses:
 *       200:
 *         description:   successfully Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Operating_Manual'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/Delete/{id}:
 *  delete:
 *      description: Delete OPM
 *      tags: [Operating_Manual]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              $ref: '#/definitions/Operating_Manual'
 *          required: true
 *          description:  delete Operating_Manual
 *      responses:
 *          200:
 *              description: Delete successful
 *          500:
 *              description: Some server error
 *
 *
 */
/**
 * @swagger
 * /admin/api/CreatePDF:
 *   post:
 *     summary: CreatePDF
 *     tags: [Operating_Manual]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Operating_Manual'
 *     responses:
 *       200:
 *         description:   successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Operating_Manual'
 *       500:
 *         description: Some server error
 */

module.exports = router;
