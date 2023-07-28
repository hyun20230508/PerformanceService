import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/users';
import dotenv from 'dotenv';
dotenv.config();

class AuthMiddle {
  isSignedIn = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = null;
    if (!req.cookies) {
      return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
    }

    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? '').split(' ');

    if (!authToken || authType !== 'Bearer') {
      return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
    }

    try {
      const user = jwt.verify(authToken, process.env.JWT_SECRET as string);
      if (!user) {
        return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
      }

      res.locals.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findByPk(res.locals.user.userId, {
        attributes: ['isAdmin'],
        raw: true,
        nest: true,
      });

      if (user) {
        if (!user.isAdmin) {
          return res.status(401).json({ message: '관리자가 아닙니다.' });
        }
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export default AuthMiddle;
