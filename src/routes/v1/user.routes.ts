import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { getUser } from "../../controllers/user.controller";


const router = Router();

// TODO: Add routes and auth middlewares
router.get('/getUser', authMiddleware, getUser);

export default router;