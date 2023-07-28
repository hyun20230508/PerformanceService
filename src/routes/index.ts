import express from 'express';
import authRouter from './auth.router';
import showRouter from './show.router';
import reservationRouter from './reservation.router';
import userRouter from './user.router';

const router = express.Router();
router.use('/', [authRouter, userRouter]);
router.use('/show', [showRouter, reservationRouter]);

export default router;
