const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Added this line to import the cors middleware
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 3001;

const http = require("http"); // Import http module
const socketIo = require("socket.io"); // Import socket.io module

const server = http.createServer(app); // Create an http server
const io = require("./sockets/socket")(server);
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	});
// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Allow all origins

//Routes
app.use("/api/users", userRoutes);
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
