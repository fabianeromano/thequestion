const { Router } = require("express");
const { getAdvantages, buyUserAdvantages, addUserAdvantage } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/advantages/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all advantages.
 *     tags: [Advantages]
 *     responses:
 *       200:
 *         description: The advantages were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advantage'
 * /api/v1/advantages/update/user/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update advantages from a particular user by their id.
 *     tags: [Advantages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserAdvantages'
 *     responses:
 *       200:
 *         description: The advantages of the user were successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User's advantages updated successfully"
 * /api/v1/advantage/add/user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add advantage to a User.
 *     tags: [Advantages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: 'The User ID'
 *                 advantageId:
 *                   type: integer
 *                   description: 'The Advantage ID'
 *                 quantity:
 *                   type: integer
 *                   description: 'The advantage quantity to buy'
 *               example:
 *                 userId: 1
 *                 advantageId: 1
 *                 quantity: 1
 *     responses:
 *       200:
 *         description: The advantage was successfully added to a User.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User's advantage added successfully"
 */

router.get("/advantages/all", authenticate, getAdvantages);
router.put("/advantages/update/user/:id", authenticate, buyUserAdvantages);
router.post("/advantage/add/user", addUserAdvantage);

module.exports = router;
