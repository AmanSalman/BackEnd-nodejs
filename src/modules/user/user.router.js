import { authenticateUser } from '../auth/auth.controller.js';
import * as UserController from './user.controller.js';
import { Router } from 'express';

const router = Router ();
router.get('/users', UserController.Users);
router.put('/update/:_id', UserController.update);
router.delete('/delete/:_id', UserController.destroy);
router.get('/getOrders/:userId', authenticateUser('user'), UserController.getOrders);
export default router;