const { Router } = require("express");
const { getTopics, getUserTopics, addUserTopic, deleteUserTopic } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/topics/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all topics.
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: The topics were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 * /api/v1/topics/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of topics by user.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The topics were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 * /api/v1/topic/add/user/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add Topic to user.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The topic was successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Topic added successfully"
 * /api/v1/topic/delete/user/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete Topic to user.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The topic was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Topic deleted successfully"
 */

router.get("/topics/all", authenticate, getTopics);
router.get("/topics/user/:id", authenticate, getUserTopics);
router.post("/topic/add/user/:id", authenticate, addUserTopic);
router.delete("/topic/delete/user/:id", authenticate, deleteUserTopic);

module.exports = router;
