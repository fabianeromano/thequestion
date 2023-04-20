const { Router } = require("express");
const { userLogin } = require("../controllers");

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the login.
 *               password:
 *                 type: string
 *                 description: Password for the login.
 *             example:
 *               username: 'Myusername'
 *               password: '123456'
 *     responses:
 *       200:
 *         description: Successful Operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Id user
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: Username.
 *                   example: 'Myusername'
 *                 email:
 *                   type: string
 *                   description: Email.
 *                   example: 'example@email.com'
 *                 profileImg:
 *                   type: string
 *                   description: Picture of the user.
 *                   example: 'https://mypictureprofile.png'
 *                 token:
 *                   type: string
 *                   description: Value Token
 *                   example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvcnBvcmF0aW9uZ2x0.eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvcnBvcmF0aW9uZ2x0'
 *       400:
 *         description: Error al iniciar sesión
 */

router.post("/auth/login", userLogin);

module.exports = router;
