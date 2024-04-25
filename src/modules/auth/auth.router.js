import { Router } from "express";
import * as authController from './auth.controller.js';
import asyncHandler  from "../../services/errorHandling.js";
import auth from "../../middleware/auth.js";
const router = Router({caseSensitive:true});

router.post('/register' , asyncHandler(authController.Register))
router.post('/signIn', asyncHandler(authController.signIn));
export default router;