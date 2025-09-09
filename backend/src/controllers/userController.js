import { UserService } from "../services/userService.js"

export class UserController {
  static async signup(req, res) {
    try {
      const result = await UserService.signup(req.body)
      res.status(result.success ? 201 : 400).json(result)
    } catch (error) {
      const err = error
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      })
    }
  }

  static async login(req, res) {
    try {
      const result = await UserService.login(req.body)
      res.status(result.success ? 200 : 400).json(result)
    } catch (error) {
      const err = error
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      })
    }
  }

  static async getRooms(req, res) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized: User not authenticated"
        })
        return
      }

      const result = await UserService.getRooms(userId)
      res.status(result.success ? 200 : 400).json(result.data)
    } catch (error) {
      const err = error
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      })
    }
  }
}
