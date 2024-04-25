import { Router } from "express";
import * as bookController from './book.controller.js';
import asyncHandler from '../../services/errorHandling.js';
const router = Router({caseSensitive:true});

router.post('/add', asyncHandler(bookController.createBook));
router.get('/Bookscategory/:categoryId', asyncHandler(bookController.GetBooksCategory));
router.get('/allbooks', asyncHandler(bookController.GetBooks));
router.delete('/deletebook/:_id', asyncHandler(bookController.destroy));
router.put('/update/:_id' , asyncHandler(bookController.update));

export default router;