const { Router } = require("express");
const {
  createRoomSolitary,
  getRoomById,
  getAllRoom,
  updateRoomSolitary,
  updateRoomGroup,
  deleteRoom
} = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/room/solitary:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a New Room Solitary.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoom'
 *     responses:
 *       201:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * SOCKET=> invitation friend:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create socket event for start play with a friend.
 *     description: Emitir evento => socket.emit("invitation friend", body )  recibir feedback => socket.on("feedback", data => { console.log(data) }) 
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomFriend'
 *     responses:
 *       201:
 *         description: The information is received listening the socket event with name "feedback".
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * SOCKET=> invitation random:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create socket event for start play random.
 *     description: Emitir evento => socket.emit("invitation random", body )   recibir feedback => socket.on("feedback", data => { console.log(data) })
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoom'
 *     responses:
 *       201:
 *         description: The information is received listening the socket event with name "feedback".
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * SOCKET=> view results:
 *   get:
 *     summary: Create socket event for start play random.
 *     description: Emitir evento => socket.emit("view results", roomId )   recibir feedback => socket.on("result", data => { console.log(data) })
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the room
 *                   example: 1
 *     responses:
 *       200:
 *         description: The information is received listening the socket event with name "feedback".
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Room feedback
 *                   example: 'Haz ganado'
 * /api/v1/room/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a Room by ID.
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Room ID.
 *     responses:
 *       200:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * /api/v1/room/{id}/solitary:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a Room by ID.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoomSolitary'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Room ID.
 *     responses:
 *       200:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated successfull"
 * /api/v1/room/{id}/group:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: End game.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoomGroup'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Room ID.
 *     responses:
 *       200:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated successfull"
 */

router.post("/room/solitary", authenticate, createRoomSolitary);

router.get("/room/:id", authenticate, getRoomById);

//router.get("/room/user/:id", authenticate, getAllRoom);

router.put("/room/:id/solitary", authenticate, updateRoomSolitary);

router.put("/room/:id/group", /* authenticate, */ updateRoomGroup);

//router.delete("/room/:id", authenticate, deleteRoom);

module.exports = router;
