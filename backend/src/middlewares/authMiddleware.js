import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    res.status(401).json({ error: "Access denied ,No token provided." })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET)

    if (!decoded) {
      res.status(401).json({ error: "Access denied, Invalid jwt token." })
    }
    req.user = { userId: decoded.userId }
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." })
  }
}

export default authMiddleware
