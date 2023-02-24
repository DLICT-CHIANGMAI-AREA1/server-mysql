const router = require("express").Router();
const {
    DataPerson,
    DeletePerson,
    DataPersonById,
    UpdatePerson,
    CreatePerson,
} = require("../controller/peron.controller");

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
    "App2"
);

const storage = FirebaseApp.storage();
const bucket = storage.bucket();

router.get("/api/DataPerson", DataPerson);
router.get("/api/DataPersonById/:id", DataPersonById);
router.delete("/api/DeletePerson/:id", DeletePerson);
router.post(
    "/api/UpdatePerson/:id",
    upload.single("Operating_Manual"),
    async (req, res, next) => {
        if (req.file) {
            const CreatefirebaseUrls = async (file) => {
                console.log("Creating write stream...");
                const folder = "Perosn_OPM";
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
        } else {
            next();
        }
    },
    UpdatePerson
);
router.post(
    "/api/CreatePerson/",
    upload.single("Operating_Manual"),
    async (req, res, next) => {
        if (req.file) {
            const CreatefirebaseUrls = async (file) => {
                console.log("Creating write stream...");
                const folder = "Perosn_OPM";
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
        }
        next();
    },
    CreatePerson
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - First_name
 *         - Last_name
 *         - Gender
 *         - Job_title
 *         - Department
 *         - Email
 *         - Phone
 *         - Operating_Manual
 *         - Profile
 *         - _id
 *       properties:
 *         First_name:
 *           type: string
 *           description: First_name
 *         Last_name:
 *           type: string
 *           description: Last_name
 *         Gender:
 *           type: string
 *           description: Gender
 *         Job_title:
 *           type: string
 *           description: Job_title
 *         Department:
 *           type: string
 *           description: Department
 *         Email:
 *           type: string
 *           description: Email
 *         Phone:
 *           type: string
 *           description: Phone
 *         Operating_Manual:
 *           type: Object
 *           description: Operating_Manual
 *         Profile:
 *           type: string
 *           description: Profile
 *         _id:
 *           type: string
 *           description: _id
 *       example:
 *         _id: 63a4206e491b9c921b3c2cf7
 *         First_name: นางสาวปิยรัตน์
 *         Last_name: วงศ์เติง
 *         Gender: หญิง
 *         Job_title: นักวิเคราะห็นโยบายเเละเเผนชำนาญการ
 *         Department: ICT
 *         Email: email@gmail.com
 *         Phone: 065-489-5888
 *         Operating_Manual: Object
 *         Profile: data:image/png;base64,iVBORw0KGgoAAAANS
 *
 */
/**
 * @swagger
 * tags:
 *   name: Person
 */

/**
 * @swagger
 * /admin/api/DataPerson:
 *   get:
 *     summary: DataPerson
 *     tags: [Person]
 *     responses:
 *       200:
 *         description:   list of DataPerson
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/DataPersonById/{id}:
 *   get:
 *     summary: DataPerson
 *     tags: [Person]
 *     parameters:
 *        - in: path
 *          name: id
 *     responses:
 *       200:
 *         description:   list of DataPerson By Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/CreatePerson:
 *   post:
 *     summary: CreatePerson
 *     tags: [Person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description:   successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /admin/api/UpdatePerson/{id}:
 *   put:
 *     summary: UpdatePerson
 *     tags: [Person]
 *     parameters:
 *        - in: path
 *          name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description:   successfully Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/DeletePerson/{id}:
 *  delete:
 *      description: DeletePerson
 *      tags: [Person]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              $ref: '#/definitions/Person'
 *          required: true
 *          description:  delete Person
 *      responses:
 *          200:
 *              description: Delete successful
 *          500:
 *              description: Some server error
 *
 *
 */

module.exports = router;
