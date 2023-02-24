const router = require("express").Router()
const {FindService,CreateService,DeleteService,EditService,EditTiServiceTitleFind,ServiceTitleFind,FindServiceByType,CreateServiceTitle,ServiceTitleFindByType} = require("../controller/service.controller");

router.get('/api/FindService',FindService)
router.get('/api/FindServiceByType/:id',FindServiceByType)
router.post('/api/CreateService',CreateService)
router.delete('/api/DeleteService/:id',DeleteService)
router.put('/api/EditService/:id',EditService)


router.put('/api/ServiceTitle/:id',EditTiServiceTitleFind)
router.post('/api/ServiceTitle',CreateServiceTitle)
router.get('/api/ServiceTitleFind',ServiceTitleFind)
router.get('/api/ServiceTitleFindByType/:id',ServiceTitleFindByType)

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - url
 *         - image
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         name:
 *           type: string
 *           description: name
 *         url:
 *           type: string
 *           description: url
 *         image:
 *           type: string
 *           description: image
 *         type:
 *           type: string
 *           description: type
 *       example:
 *         _id: 63a4206e491b9c921b3c2cf7
 *         name: DLITV
 *         image: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c
 *         type : dlict
 *      
 *
 */
/**
 * @swagger
 * tags:
 *   name: Service
 */
/**
 * @swagger
 * /admin/api/FindService:
 *   get:
 *     summary: FindService
 *     tags: [Service]
 *     responses:
 *       200:
 *         description:   list of FindService
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /admin/api/FindServiceByType/{id}:
 *   get:
 *     summary: FindServiceByType
 *     tags: [Service]
 *     parameters:
 *        - in: path
 *          name: id
 *     responses:
 *       200:
 *         description:   list of FindServiceByType 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Some server error
 */



/**
 * @swagger
 * /admin/api/CreateService:
 *   post:
 *     summary: CreateService
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description:   successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/EditService/{id}:
 *   put:
 *     summary: EditService
 *     tags: [Service]
 *     parameters:
 *        - in: path
 *          name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description:   successfully Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /admin/api/DeleteService/{id}:
 *  delete:
 *      description: DeleteService
 *      tags: [Service]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              $ref: '#/definitions/Service'
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

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceTitle:
 *       type: object
 *       required:
 *         - _id
 *         - title
 *         - subtitle
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         title:
 *           type: string
 *           description: title
 *         subtitle:
 *           type: string
 *           description: subtitle
 *         type:
 *           type: string
 *           description: type
 *       example:
 *         _id: 63a4206e491b9c921b3c2cf7
 *         title: Ｕターンラッシュがピーク
 *         subtitle: 年末年始を故郷や行楽地で過ごした人たちのＵターンラッシュが３日、ピークを迎え、札幌市中央区のＪＲ札幌駅や周辺は、札幌から各地に向かう人で混雑した。荒天の影響で交通機関の一部に乱れが生じたため、運行情報の表示を心配そうに見つめる人たちの姿も
 *         type : dlict
 *      
 *
 */
/**
 * @swagger
 * tags:
 *   name: ServiceTitle
 */
/**
 * @swagger
 * /admin/api/ServiceTitleFind:
 *   get:
 *     summary: ServiceTitleFind
 *     tags: [ServiceTitle]
 *     responses:
 *       200:
 *         description:   list of ServiceTitleFind
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceTitle'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /admin/api/ServiceTitleFindByType/{id}:
 *   get:
 *     summary: ServiceTitleFindByType
 *     tags: [ServiceTitle]
 *     parameters:
 *        - in: path
 *          name: id
 *     responses:
 *       200:
 *         description:   list of ServiceTitleFindByType
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceTitle'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /admin/api/ServiceTitle/{id}:
 *   put:
 *     summary: EditServiceTitle
 *     tags: [ServiceTitle]
 *     parameters:
 *        - in: path
 *          name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceTitle'
 *     responses:
 *       200:
 *         description:   successfully Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceTitle'
 *       500:
 *         description: Some server error
 */

module.exports = router
