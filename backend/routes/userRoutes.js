const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getAllUsers,
} = require("../controllers/userController");

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUsers", getAllUsers);

module.exports = router;
