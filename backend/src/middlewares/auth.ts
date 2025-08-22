import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

const authMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secretKey123"
      ) as CustomJwtPayload;
console.log(process.env.JWT_SECRET)
      const user = await User.findById(decoded.id); 
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

export default authMiddleware;
