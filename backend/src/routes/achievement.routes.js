const { Router } = require("express");
const { getAchievements, getUserUnlockedAchievements } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/achievements/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all achievements.
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: The achievements were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 * /api/v1/achievements/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of unlocked achievements from a particular user by their id.
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The unlocked achievements of the user were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 */

router.get("/achievements/all", authenticate, getAchievements);
router.get("/achievements/user/:id", authenticate, getUserUnlockedAchievements);

module.exports = router;
