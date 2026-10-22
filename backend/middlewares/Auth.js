const jwt = require("jsonwebtoken");
const User = require("../models/users");

// Helper to extract JWT token from cookies or Authorization header
const extractToken = (req) => {
  // 1. Check for Authorization header first (active client token from localStorage)
  const authHeader = req.header("Authorization") || req.headers?.authorization || req.headers?.Authorization;
  if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  // 2. Check for cookie (HTTP-only) if cookie-parser is used
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  // 3. Parse cookies manually from headers if cookie-parser is not active
  const cookieHeader = req.headers?.cookie || req.headers?.Cookie;
  if (cookieHeader) {
    const cookies = {};
    cookieHeader.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      if (parts.length >= 2) {
        cookies[parts[0].trim()] = parts.slice(1).join("=").trim();
      }
    });
    if (cookies.token) {
      return cookies.token;
    }
  }

  return null;
};

// Middleware to verify token and attach user to request
const verifyToken = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("CRITICAL ERROR: JWT_SECRET environment variable is missing!");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const roleNormalized = (decoded.role || user.role || "").toLowerCase();

    // Attach base user payload to req.user
    req.user = {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: roleNormalized,
    };

    // Attach role-specific properties for compatibility with existing controllers
    if (roleNormalized === "claimant") req.claimant = user;
    if (roleNormalized === "admin") req.admin = user;
    if (roleNormalized === "neutral") req.neutral = user;
    if (roleNormalized === "respondent") req.respondent = user;

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ success: false, message: "Unauthorized or invalid token" });
  }
};

// Middleware to authorize specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = (req.user?.role || "").toLowerCase();
    const normalizedRoles = roles.map((r) => String(r).toLowerCase());

    if (!userRole || !normalizedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden Access: Requires one of [${roles.join(", ")}] roles`,
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
};
