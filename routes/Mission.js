const router = require("express").Router();
const { FindMission, AddMission, DeleteMission } = require("../controller/mission.controller");

router.get("/api/FindMission", FindMission);
router.post("/api/AddMission", AddMission);
router.delete("/api/DeleteMission/:id", DeleteMission);
/**
 * @swagger
 * components:
 *   schemas:
 *     Mission:
 *       type: object
 *       required:
 *         - text
 *         - _id
 *       properties:
 *         text:
 *           type: string
 *           description: text
 *         _id:
 *           type: string
 *           description: text
 *       example:
 *         text: ดำเนินการเกี่ยวกับการบริหารจัดการระบบเทคโนโลยีสารสนเทศและการสื่อสาร ในสำนักงานและสถานศึกษาในสังกัด
 *         _id: 63b4da1f38fefcd5e88cf3ec
 *
 */
/**
 * @swagger
 * tags:
 *   name: Mission
 */

/**
 * @swagger
 * /admin/api/FindMission:
 *   get:
 *     summary: FindMission
 *     tags: [Mission]
 *     responses:
 *       200:
 *         description:   list of mission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/AddMission:
 *   post:
 *     summary: Create a new AddMission
 *     tags: [Mission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mission'
 *     responses:
 *       200:
 *         description:   successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/DeleteMission/{id}:
 *  delete:
 *      description: Delete user
 *      tags: [Mission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              $ref: '#/definitions/Mission'
 *          required: true
 *          description:  delete mission
 *      responses:
 *          200:
 *              description: Delete successful
 *          500:
 *              description: Some server error
 *
 *
 */
module.exports = router;
