const { Router } = require("express");
const { addUserFriend, getUserFriends, acceptFriend, deleteFriend } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/user/friend:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a new friend.
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUserFriend'
 *     responses:
 *       201:
 *         description: The friend request was successfully sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFriend'
 * /api/v1/user/{id}/friends/accepted:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all friends.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The friends were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/v1/user/{id}/friends/pending:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all pending friends.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The pending friends were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/v1/user/friend/{id}/status:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Accept or Refuse friend.
 *     description: Accepted values for this Endpoint, "accepted" or "refused".
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The friend id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserFriend'
 *     responses:
 *       200:
 *         description: The friend was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated successfully"
 * /api/v1/user/friend/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a friend.
 *     description: To remove a friend, you must send the ID of the record where you specify the friendship relationship.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The friend id
 *     responses:
 *       200:
 *         description: The friend was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted successfully"
 */

router.post("/user/friend", authenticate, addUserFriend);

router.get("/user/:id/friends/accepted", authenticate, getUserFriends);

router.get("/user/:id/friends/pending", authenticate, getUserFriends);

router.put("/user/friend/:id/status", authenticate, acceptFriend);

router.delete("/user/friend/delete/:id", authenticate, deleteFriend);

module.exports = router;
