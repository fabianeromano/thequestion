const { Router } = require("express");
const { getNews, getNewsByUserTopics } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/news/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all news.
 *     tags: [News]
 *     responses:
 *       200:
 *         description: The news were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 * /api/v1/news/topic/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of news by topic and user ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The news were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: 'Gran descubrimiento espacial'
 *                   summary:
 *                     type: string
 *                     example: 'Un impresionante hallazgo espacial se ha dado a conocer en las últimas horas. Si quieres conocer más, entra al link.'
 *                   img:
 *                     type: string
 *                     example: 'https://galeriadeimagenes.com/via-lactea.jpg'
 *                   link:
 *                     type: string
 *                     example: 'https://eldiario.com/noticias/gran-descubrimiento-espacial'
 *                   topic:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: 'Ciencias y Naturaleza'
 */

router.get("/news/all", authenticate, getNews);
router.get("/news/topic/user/:id", authenticate, getNewsByUserTopics);

module.exports = router;
