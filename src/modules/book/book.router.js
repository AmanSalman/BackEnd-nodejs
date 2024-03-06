import { Router } from "express";
import * as bookController from './book.controller.js';
const router = Router({caseSensitive:true});

router.post('/add', bookController.createBook);
router.get('/Bookscategory/:categoryId', bookController.GetBooksCategory);
router.get('/allbooks', bookController.GetBooks);
router.delete('/deletebook/:_id', bookController.destroy);
router.put('/update/:_id' , bookController.update)

export default router;