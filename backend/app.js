const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Exit early if critical env variables are missing
if (!process.env.JWT_SECRET) {
  console.error("CRITICAL ERROR: JWT_SECRET environment variable is missing in .env!");
  process.exit(1);
}

const Express = require("express");
const cors = require("cors");
const connectMongoDb = require("./config/connectMongoDb");
const AdminRouter = require("./Router/AdminRouter");
const ClaimantRouter = require("./Router/ClaimantRouter/ClaimantRouter");
const NeutralRouter = require("./Router/NeutralRouter");
const RespondentRouter = require("./Router/RespondentRouter");
const ChatRouter = require("./Router/ChatRouter");
const LegalAiRouter = require("./Router/legalAiRouter");
const ServiceRequestRouter = require("./Router/ServiceRequestRouter");
const PaymentRouter = require("./Router/PaymentRouter");
const AuthRouter = require("./Router/AuthRouter");
const errorHandler = require("./middlewares/errorHandler");

const app = Express();

// Port
const PORT = process.env.PORT || 3636;

// Middlewares
app.use(Express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Dynamically reflect the request origin to avoid wildcard * issues with credentials
      callback(null, true);
    },
    credentials: true,
  })
);

const rateLimiter = require("./middlewares/rateLimiter");

// Rate limiters for security-sensitive endpoints
app.use(["/claimant/login", "/admin/login", "/neutral/login", "/respondent/login"], rateLimiter({
  max: 20,
  windowMs: 15 * 60 * 1000,
  message: "Too many login attempts. Please try again in 15 minutes."
}));
app.use("/api/chat/message", rateLimiter({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests to the AI assistant. Please try again later."
}));

// Routes
app.use("/admin", AdminRouter);
app.use("/claimant", ClaimantRouter);
app.use("/neutral", NeutralRouter);
app.use("/respondent", RespondentRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/legal-ai", LegalAiRouter);
app.use("/api/service-requests", ServiceRequestRouter);
app.use("/api/payments", PaymentRouter);
app.use("/api/auth", AuthRouter);

// Temporary route to reset user password to password123
app.get("/reset-password/:email", async (req, res) => {
  try {
    const bcrypt = require("bcrypt");
    const User = require("./models/users");
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.send("User not found");
    user.password = await bcrypt.hash("password123", 10);
    await user.save();
    res.send("Password successfully reset to: password123");
  } catch(err) {
    res.send("Error: " + err.message);
  }
});

// Connect to MongoDB
connectMongoDb();

// Serve frontend static files
app.use(Express.static(path.join(__dirname, "../frontend/dist")));

// For any other route that doesn't match an API route, send the React index.html
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Global Error Handler Middleware (must be registered last)
app.use(errorHandler);

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const ChatMessage = require("./models/chatMessage");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Real-time chat client connected:", socket.id);

  socket.on("join_room", (data) => {
    console.log("join_room request received on backend:", data);
    const { caseId, userAId, userBId } = data;
    if (!caseId || !userAId || !userBId) {
      console.warn("Invalid join_room data. Missing fields:", { caseId, userAId, userBId });
      return;
    }
    const sortedIds = [userAId, userBId].sort().join("_");
    const roomName = `room_${caseId}_${sortedIds}`;
    socket.join(roomName);
    console.log(`User socket ${socket.id} successfully joined chat room: ${roomName}`);
  });

  socket.on("send_message", async (data) => {
    console.log("send_message request received on backend:", data);
    try {
      const { caseId, senderId, senderRole, receiverId, receiverRole, message } = data;

      if (!caseId || !senderId || !receiverId || !message) {
        console.warn("send_message missing required fields:", { caseId, senderId, receiverId, message });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
        console.warn("send_message rejected: senderId or receiverId is not a valid ObjectId:", { senderId, receiverId });
        return;
      }

      const savedMsg = await ChatMessage.create({
        caseId,
        senderId,
        senderRole,
        receiverId,
        receiverRole,
        message,
        timestamp: new Date(),
      });
      console.log("Saved chat message to MongoDB:", savedMsg._id);

      const sortedIds = [senderId, receiverId].sort().join("_");
      const roomName = `room_${caseId}_${sortedIds}`;

      console.log(`Broadcasting receive_message to room: ${roomName}`);
      io.to(roomName).emit("receive_message", savedMsg);
    } catch (err) {
      console.error("Socket chat event database save error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Real-time chat client disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
