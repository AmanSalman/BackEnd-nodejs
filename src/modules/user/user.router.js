import auth from '../../middleware/auth.js';
import * as UserController from './user.controller.js';
import { Router } from 'express';

const router = Router ();
router.get('/users',UserController.Users);
router.put('/update/', auth, UserController.update);
router.delete('/delete/:_id', UserController.destroy);
router.get('/getOrders/:userId', UserController.getOrders);
export default router;
