import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { UserController } from "../controllers/userController.js"
import { validateInput } from "../middlewares/validateInput.js"
import { userLoginSchema, userSignupSchema } from "../schema/userSchema.js"
const router = Router()

router.post("/signup", validateInput(userSignupSchema), UserController.signup)
router.post("/login", validateInput(userLoginSchema), UserController.login)
router.get("/rooms", authMiddleware, UserController.getRooms)

export default router
