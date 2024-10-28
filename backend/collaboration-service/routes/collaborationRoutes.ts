import { startCollaboration } from '../controllers/collaborationController';
import express from 'express';

const router = express.Router();

router.post('/', startCollaboration);

export default router;