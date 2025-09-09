import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user })
})

router.post("/logout", (req, res) => {
  res.cookie("token", null, { httpOnly: true, sameSite: "none" })
  res.json({ message: "Logged out successfully" })
})

export default router
