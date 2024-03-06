import { Router } from "express";
import * as orderController from './order.controller.js';
import { authenticateUser } from "../auth/auth.controller.js";
const router = Router({caseSensitive:true});

// const isAdmin = (req, res, next) => {

//     console.log(req.user);

//     if (req.user && req.user.role === 'admin') {

//       next();
//     } else {
//       return res.status(403).json({ message: 'Forbidden - Admin access required' });
//     }
//   };


router.post('/create', authenticateUser('user'), orderController.createOrder); //user
router.delete('/delete/:_id', authenticateUser('user'), orderController.destroy); //user
router.get('/getAllOrders', authenticateUser('admin'), orderController.GetOrders); //admin
router.put('/AcceptAllOrders', authenticateUser('admin'), orderController.AcceptAllOrders); //admin
router.put('/AcceptOrder/:_id', authenticateUser('admin'), orderController.AcceptOrder) //admin
router.put('/rejectOrder/:_id', authenticateUser('admin'), orderController.RejectOrder);
export default router;