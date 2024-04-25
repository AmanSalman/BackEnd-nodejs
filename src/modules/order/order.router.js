import { Router } from "express";
import * as orderController from './order.controller.js'
import auth, { ensureUserAdmin } from "../../middleware/auth.js";
import asyncHandler from '../../services/errorHandling.js';

const router = Router({caseSensitive:true});

router.post('/create', asyncHandler(orderController.createOrder) ); //user
router.delete('/delete/:_id', asyncHandler(orderController.destroy) ); //user
router.get('/getAllOrders',auth, ensureUserAdmin('admin'), asyncHandler(orderController.GetOrders)); //admin
router.put('/AcceptAllOrders',auth, ensureUserAdmin('admin'), asyncHandler(orderController.AcceptAllOrders)); //admin
router.put('/AcceptOrder/:_id', auth, ensureUserAdmin('admin'), asyncHandler(orderController.AcceptOrder)); //admin
router.put('/rejectOrder/:_id',auth,ensureUserAdmin('admin'), asyncHandler(orderController.RejectOrder));
export default router;