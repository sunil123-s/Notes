import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel.js";

dotenv.config();
const jwt_secret = process.env.JWT_TOKEN; ;

export const protectedRoute = async (req, res, next) => {
  try {
    const gettoken = req.headers.authorization;
    if (!gettoken || !gettoken.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ success: false, message: "token is not provided" });
    }

    const token = gettoken.split(" ")[1];

    const decoded = jwt.verify(token, jwt_secret);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized : invaild token" });
    }
    const user = await User.findById(decoded.userId, "_id name email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
