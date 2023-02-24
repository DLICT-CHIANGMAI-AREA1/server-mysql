const router = require("express").Router()
const {AddVideo,FindVideo,DeleteVideo} = require("../controller/video.controller");


router.get('/api/FindVideo',FindVideo)
router.post('/api/AddVideo',AddVideo)
router.delete('/api/DeleteVideo/:id',DeleteVideo)


/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - url
 *         - _id
 *       properties:
 *         First_name:
 *           type: string
 *           description: First_name
 *       example:
 *         _id: 63a4206e491b9c921b3c2cf7
 *         url: https://www.youtube.com/watch?v=9KfV9hAXdjc
 *
 */

/**
 * @swagger
 * tags:
 *   name: Video
 */

/**
 * @swagger
 * /admin/api/FindVideo:
 *   get:
 *     summary: FindVideo
 *     tags: [Video]
 *     responses:
 *       200:
 *         description:   list of FindVideo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /admin/api/AddVideo:
 *   post:
 *     summary: AddVideo
 *     tags: [Video]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       200:
 *         description:   AddVideo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /admin/api/DeleteVideo/{id}:
 *   delete:
 *     summary: DeleteVideo
 *     tags: [Video]
 *     parameters:
 *        - in: path
 *          name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       200:
 *         description:   DeleteVideo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       500:
 *         description: Some server error
 */



module.exports = router
