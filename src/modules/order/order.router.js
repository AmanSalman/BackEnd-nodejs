import { Router } from "express";
import * as orderController from './order.controller.js'
import auth, { ensureUserAdmin } from "../../middleware/auth.js";
const router = Router({caseSensitive:true});

router.post('/create', orderController.createOrder); //user
router.delete('/delete/:_id', orderController.destroy); //user
router.get('/getAllOrders',auth, ensureUserAdmin('admin'), orderController.GetOrders); //admin
router.put('/AcceptAllOrders',auth, ensureUserAdmin('admin'), orderController.AcceptAllOrders); //admin
router.put('/AcceptOrder/:_id', auth, ensureUserAdmin('admin'), orderController.AcceptOrder) //admin
router.put('/rejectOrder/:_id',auth,ensureUserAdmin('admin'), orderController.RejectOrder);
export default router;