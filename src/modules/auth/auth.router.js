import { Router } from "express";
import * as authController from './auth.controller.js';
const router = Router({caseSensitive:true});

router.get('/', authController.GetAuth);
router.post('/register', authController.Register)
router.post('/signIn', authController.signIn);
export default router;