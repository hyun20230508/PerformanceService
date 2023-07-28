import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import dotenv from 'dotenv';
dotenv.config();
const authService = new AuthService();

class AuthController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    interface signupInterface {
      name: string;
      nickname: string;
      email: string;
      password: string;
      confirmPassword: string;
      isAdmin: boolean;
    }
    const {
      name,
      nickname,
      email,
      password,
      confirmPassword,
      isAdmin,
    }: signupInterface = req.body;

    if (!(await authService.verifyPassword(password, confirmPassword))) {
      return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
    }

    if (await authService.checkEmailExist(email)) {
      return res.status(412).json({ message: '중복된 이메일입니다.' });
    }

    if (await authService.checkNicknameExist(nickname)) {
      return res.status(412).json({ message: '중복된 닉네임입니다.' });
    }

    const result = await authService.createUser(
      name,
      nickname,
      email,
      password,
      isAdmin
    );

    if (!result) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  };

  signin = async (req: Request, res: Response, next: NextFunction) => {
    interface signinInterface {
      email: string;
      password: string;
    }

    try {
      const { email, password }: signinInterface = req.body;
      const user = await authService.signin(email, password);
      if (!user) {
        return res
          .status(412)
          .json({ message: '닉네임 또는 패스워드를 확인해주세요' });
      }

      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET as string
      );
      res.cookie('Authorization', `Bearer ${token}`);
      return res.status(200).json({
        result: {
          message: '로그인이 완료 되었습니다.',
          token: token,
        },
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: '로그인 도중 에러가 발생했습니다.' });
    }
  };

  signout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('Authorization');
    res.status(200).json({ message: '로그아웃이 정상적으로 되었습니다.' });
  };
}

export default AuthController;
