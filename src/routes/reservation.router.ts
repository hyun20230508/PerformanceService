import express from 'express';
import ReservationController from '../controllers/reservation.controller';
import AuthMiddle from '../middlewares/auth';

const reservationController = new ReservationController();
const authMiddle = new AuthMiddle();

const reservationRouter = express.Router();

reservationRouter.post(
  '/:showId/seat/:seatId/reservation',
  authMiddle.isSignedIn,
  reservationController.createReservation
);

reservationRouter.delete(
  '/:showId/seat/:seatId/reservation/:reservationId',
  authMiddle.isSignedIn,
  reservationController.deleteReservation
);

export default reservationRouter;
