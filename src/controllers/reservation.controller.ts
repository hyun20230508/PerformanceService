import { Request, Response, NextFunction } from 'express';
import ReservationService from '../services/reservation.service';
import dotenv from 'dotenv';
dotenv.config();
const reservationService = new ReservationService();

class ReservationController {
  createReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.userId;
      const { showId, seatId } = req.params;
      const numShowId: number = Number(showId);
      const numSeatId: number = Number(seatId);

      const crateReservationData = await reservationService.createReservation(
        userId,
        numShowId,
        numSeatId
      );
      return res
        .status(crateReservationData.status)
        .json({ result: crateReservationData.message });
    } catch (error) {
      return res
        .status(400)
        .json({ result: 'Controller Error: 공연 예약에 실패했습니다.' });
    }
  };

  deleteReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.userId;
      const { showId, seatId, reservationId } = req.params;
      const numShowId: number = Number(showId);
      const numSeatId: number = Number(seatId);
      const numReservationId: number = Number(reservationId);

      const deleteReservationData = await reservationService.deleteReservation(
        userId,
        numShowId,
        numSeatId,
        numReservationId
      );
      return res
        .status(deleteReservationData.status)
        .json({ result: deleteReservationData.message });
    } catch (error) {
      return res
        .status(400)
        .json({ result: 'Controller Error: 공연 예약 취소에 실패했습니다.' });
    }
  };
}

export default ReservationController;
