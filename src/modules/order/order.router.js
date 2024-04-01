import { Router } from "express";
import * as orderController from './order.controller.js'
import auth, { ensureUserAdmin } from "../../middleware/auth.js";
const router = Router({caseSensitive:true});

// const isAdmin = (req, res, next) => {

//     console.log(req.user);

//     if (req.user && req.user.role === 'admin') {

//       next();
//     } else {
//       return res.status(403).json({ message: 'Forbidden - Admin access required' });
//     }
//   };


router.post('/create', orderController.createOrder); //user
router.delete('/delete/:_id', orderController.destroy); //user
router.get('/getAllOrders', orderController.GetOrders); //admin
router.put('/AcceptAllOrders', orderController.AcceptAllOrders); //admin
router.put('/AcceptOrder/:_id', auth, ensureUserAdmin('admin'), orderController.AcceptOrder) //admin
router.put('/rejectOrder/:_id',auth,ensureUserAdmin('admin'), orderController.RejectOrder);
export default router;