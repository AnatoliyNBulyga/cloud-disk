import Router from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import FileController from "../controllers/FileController.js";

const router = new Router();

router.post('', authMiddleware, FileController.createDir);
router.get('', authMiddleware, FileController.getFiles);

export default router;