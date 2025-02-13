import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// Define a custom interface for the AuthRequest
export interface AuthRequest extends Request {
  userId?: string; // Ensure userId is optional
}

// Define the payload structure for TypeScript
interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token; // Extract token from cookies

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Assign userId to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
