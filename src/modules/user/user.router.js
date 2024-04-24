import auth, { ensureUserAdmin } from '../../middleware/auth.js';
import * as UserController from './user.controller.js';
import { Router } from 'express';
import {asyncHandler} from './../../services/errorHandling.js'
const router = Router ();
router.get('/users',auth, ensureUserAdmin('admin'),UserController.Users);
router.put('/update/', auth, UserController.update);
router.delete('/delete/:_id', UserController.destroy);
router.get('/getOrders/:userId',asyncHandler(UserController.getOrders) );
router.get('/profile', auth, asyncHandler(UserController.Profile) );
router.patch('/disable/:_id', auth,ensureUserAdmin('admin'), asyncHandler(UserController.Disable)); 
router.patch('/activate/:_id', auth, ensureUserAdmin('admin'), UserController.Activate);
export default router;
 