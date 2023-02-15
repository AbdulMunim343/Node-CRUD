const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller")

router.route('/').get(UserController.getAllUsers).post(UserController.addUsers)
router.route('/:id').get(UserController.getUserById).put(UserController.ModifyUser).delete(UserController.deleteUser)

module.exports = router;