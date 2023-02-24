const router = require("express").Router();
const { FindNews, AddNews, DeleteNews, FindNewsById, UpdateNews } = require("../controller/news.controller");

router.get("/api/FindNews", FindNews);
router.get("/api/FindNewsById/:param", FindNewsById);
router.post("/api/AddNews", AddNews);
router.put("/api/UpdateNews/:Id", UpdateNews);
router.delete("/api/DeleteNews/:id", DeleteNews);

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - Headline
 *         - content
 *         - image_title_url
 *         - images
 *         - DateTime
 *         - type
 *         - _id
 *       properties:
 *         Headline:
 *           type: string
 *           description: Headline
 *         content:
 *           type: string
 *           description: content
 *         image_title_url:
 *           type: array
 *           description: image_title_url
 *         images:
 *           type: array
 *           description: images
 *         DateTime:
 *           type: string
 *           description: DateTime
 *         type:
 *           type: string
 *           description: type
 *         _id:
 *           type: string
 *           description: _id
 *       example:
 *         _id: 63a4206e491b9c921b3c2cf7
 *         Headline: 行動制限なし、伸び伸び新春　札幌で初詣、初売り盛況
 *         content: 新年を迎え、札幌市内でも、初詣に参拝客が訪れた神社や、初売りの福袋を目当てに買い物客らが詰めかけた百貨店はにぎわった。新型コロナウイルス禍で迎えた３度目の正月は行動制限がなく、感染対策がとられる中、多くの人が新たな年明けの雰囲気を楽しんだ。
 *         image_title_url: array
 *         images: array
 *         DateTime: December 27th 2565
 *         type: ICT
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: News
 */

/**
 * @swagger
 * /admin/api/FindNews:
 *   get:
 *     summary: FindNews
 *     tags: [News]
 *     responses:
 *       200:
 *         description:   list of FindNews
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/FindNewsById/{param}:
 *   get:
 *     summary: FindNewsById
 *     tags: [News]
 *     parameters:
 *        - in: path
 *          name: param
 *     responses:
 *       200:
 *         description:   list of FindNewsById By Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/AddNews:
 *   post:
 *     summary: AddNews
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
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
 * /admin/api/UpdateNews/{Id}:
 *   put:
 *     summary: UpdateNews
 *     tags: [News]
 *     parameters:
 *        - in: path
 *          name: Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description:   successfully Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/DeleteNews/{id}:
 *  delete:
 *      description: DeleteNews
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              $ref: '#/definitions/News'
 *          required: true
 *          description:  delete News
 *      responses:
 *          200:
 *              description: Delete successful
 *          500:
 *              description: Some server error
 *
 *
 */

module.exports = router;
