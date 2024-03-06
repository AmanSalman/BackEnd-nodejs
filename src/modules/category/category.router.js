import { Router } from "express";
import * as categoryController from './category.controller.js';
const router = Router({caseSensitive:true});

router.post('/add', categoryController.createCategory);


export default router;