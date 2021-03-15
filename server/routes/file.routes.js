import Router from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import FileController from "../controllers/FileController.js";

const router = new Router();

router.post('', authMiddleware, FileController.createDir);
router.post('/upload', authMiddleware, FileController.uploadFile);
router.get('', authMiddleware, FileController.getFiles);
router.get('/download', authMiddleware, FileController.downloadFile);

export default router;