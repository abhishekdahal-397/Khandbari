const User = require("../models/User");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For JWT tokens

// Registration function
const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	// Check if user already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({ message: "Email already exists" });
	}

	// Hash password before saving
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser); // Send back the created user (optional)
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// Check if email exists
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Compare password (hashed)
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Login successful - Generate JWT token
	const payload = { userId: user._id }; // Include user ID in payload
	const secret = process.env.JWT_SECRET; // Replace with your secret key
	const token = await jwt.sign(payload, secret, { expiresIn: "1h" }); // Token expires in 1 hour

	res.status(200).json({ token, message: "Login successful" });
};

module.exports = { registerUser, loginUser };
