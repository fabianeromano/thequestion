const { Router } = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  verifyUser,
  updateOffline,
  updateUser,
  updateUserPassword,
  deleteUser
} = require("../controllers");
const multer = require("multer");

const router = Router();

/**
 * @openapi
 * /api/v1/user/register:
 *   post:
 *     summary: Create a User.
 *     description: To add an image see the description in schemes > create user, section located at the bottom of the page to load an image in the API.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: The User was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /api/v1/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a User by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /api/v1/users/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The users were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/User'
 * /api/v1/users/ranking:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get users ordered by points (best ranked).
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The users were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/User'
 * /api/v1/user/{id}/verify:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Verify User by ID.
 *     description: To add an image see the description in schemes > create user, section located at the bottom of the page to load an image in the API.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verify'
 *     responses:
 *       200:
 *         description: The User was successfully verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User verified successfully"
 * /api/v1/user/{id}/offline:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update User prop 'online' by ID.
 *     description: To add an image see the description in schemes > create user, section located at the bottom of the page to load an image in the API.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id.
 *     responses:
 *       200:
 *         description: The User was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User prop 'online' updated successfully"
 * /api/v1/user/{id}/update:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a User by ID.
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: The User was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 * /api/v1/user/:id/update/password:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update User Password by ID.
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UpdatePasswordUser'
 *     responses:
 *       200:
 *         description: The User Password was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Password updated successfully"
 * /api/v1/user/{id}/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a User by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id.
 *     responses:
 *       200:
 *         description: The User was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 */

const upload = multer();

router.post("/user/register", upload.any(), createUser);

router.get("/user/:id", authenticate, getUserById);

router.get("/users/all", authenticate, getUsers);

router.get("/users/ranking", authenticate, getTopRankedUsers);

/* router.put("/users/lifes", authenticate, buyLifes); */

router.put("/user/:id/verify", authenticate, verifyUser);

router.put("/user/:id/offline", authenticate, updateOffline);

router.put("/user/:id/update", authenticate, updateUser);

router.put("/user/:id/update/password", authenticate, updateUserPassword);

router.delete("/user/:id/delete", authenticate, deleteUser);

module.exports = router;
