const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // Ensures email is unique (optional for login)
	},
	password: {
		type: String,
		required: true,
	},
	// Add other user fields if needed (e.g., profile picture)
});

module.exports = mongoose.model("User", userSchema);
