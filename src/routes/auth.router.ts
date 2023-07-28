import express from 'express';
import AuthController from '../controllers/auth.controller';
import AuthMiddle from '../middlewares/auth';

const authController = new AuthController();
const authMiddle = new AuthMiddle();

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);
authRouter.post('/signout', authMiddle.isSignedIn, authController.signout);

export default authRouter;
