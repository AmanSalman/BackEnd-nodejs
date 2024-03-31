import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import bookRouter from './book/book.router.js';
import categoryRouter from './category/category.router.js';
import orderRouter from './order/order.router.js';
import cors from 'cors'; // Import cors middleware

export const initApp = (app, express) => {
    app.use(express.json());
    app.use(cors()); // Enable CORS middleware globally

    app.get('/', (req, res) => {
        return res.json({ message: 'welcome' });
    });

    app.options('/user/profile', cors ())
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/book', bookRouter);
    app.use('/category', categoryRouter); 
    app.use('/order', orderRouter);

    app.use('*', (req, res) => {
        return res.json({ message: 'page not found' });
    });
};
