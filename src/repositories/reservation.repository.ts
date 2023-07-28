import Show from '../models/shows';
import Seat from '../models/seats';
import User from '../models/users';
import Reservation from '../models/reservations';
import { Transaction } from 'sequelize';
import { Secret } from 'jsonwebtoken';

class ReservationRepository {
  findShow = async (showId: number) => {
    const findShowData = await Show.findOne({
      attributes: ['showId'],
      where: { showId },
    });

    return findShowData;
  };

  findSeat = async (seatId: number) => {
    const findSeatData = await Seat.findOne({
      attributes: ['seatId', 'price'],
      where: { seatId, isReservation: false },
    });

    return findSeatData;
  };

  findUserPoint = async (userId: number) => {
    const findUserPointData = await User.findOne({
      attributes: ['userId', 'point'],
      where: { userId },
    });

    return findUserPointData;
  };

  updateUserPoint = async (userId: number, price: number, t: Transaction) => {
    const updateUserPointData = await User.update(
      { point: price },
      {
        where: { userId },
        transaction: t,
      }
    );

    return updateUserPointData;
  };

  updateSeatCheck = async (
    seatId: number,
    isReservation: boolean,
    t: Transaction
  ) => {
    const updateUserPointData = await Seat.update(
      { isReservation },
      {
        where: { seatId },
        transaction: t,
      }
    );

    return updateUserPointData;
  };

  createReservation = async (
    userId: number,
    seatId: number,
    t: Transaction
  ) => {
    const crateReservationData = await Reservation.create(
      { userId, seatId },
      { transaction: t }
    );

    return crateReservationData;
  };

  //삭제
  findReservation = async (reservationId: number) => {
    console.log('레포짓시작');
    const findReservationData = await Reservation.findOne({
      attributes: ['reservationId', 'userId', 'seatId'],
      include: {
        model: Seat,
        attributes: ['price'],
      },
      where: { reservationId },
      raw: true,
      nest: true,
    });
    console.log('레포짓@데이타', findReservationData);

    return findReservationData;
  };

  deleteReservation = async (reservationId: number, t: Transaction) => {
    const deleteReservationData = await Reservation.destroy({
      where: { reservationId },
      transaction: t,
    });
    return deleteReservationData;
  };

  findSeatByReservationSeat = async (seatId: number) => {
    const findSeatData = await Seat.findOne({
      attributes: ['seatId', 'price'],
      where: { seatId },
    });

    return findSeatData;
  };
}

export default ReservationRepository;
