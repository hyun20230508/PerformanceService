import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import dotenv from 'dotenv';
dotenv.config();
const userService = new UserService();

class UserController {
  getUserinfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.userId;

      const getUserinfoData = await userService.getUserinfo(userId);
      if (getUserinfoData.status == 200) {
        return res
          .status(getUserinfoData.status)
          .json({ result: getUserinfoData.getUserinfoData });
      }

      return res
        .status(getUserinfoData.status)
        .json({ result: getUserinfoData.message });
    } catch (error) {
      return res.status(400).json({
        result: 'Controller Error: 내 정보 불러오기에 실패했습니다.',
      });
    }
  };

  getReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.userId;

      const getReservationData = await userService.getReservation(userId);
      if (getReservationData.status == 200) {
        return res
          .status(getReservationData.status)
          .json({ result: getReservationData.getReservationData });
      }

      return res
        .status(getReservationData.status)
        .json({ result: getReservationData.message });
    } catch (error) {
      return res.status(400).json({
        result: 'Controller Error: 예약 목록 불러오기에 실패했습니다.',
      });
    }
  };
}

export default UserController;
