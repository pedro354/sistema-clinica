import { UserController } from "../controllers/UserController";

const { Router } = require('express');

const userController = new UserController()
const router = Router();
router.get('/user', userController.index);

module.exports = router;