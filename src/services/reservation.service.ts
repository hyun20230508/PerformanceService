import ReservationRepository from '../repositories/reservation.repository';
import { sequelize } from '../models';
import { Transaction } from 'sequelize';
const reservationRepository = new ReservationRepository();

class ReservationService {
  createReservation = async (
    userId: number,
    numShowId: number,
    numSeatId: number
  ) => {
    try {
      const findShowData = await reservationRepository.findShow(numShowId);

      console.log(findShowData);
      if (!findShowData) {
        return {
          status: 400,
          message: 'Service Error: 공연 정보가 존재하지 않습니다.',
        };
      }
      const findSeatData = await reservationRepository.findSeat(numSeatId);

      console.log('찾다좌석정보', findSeatData);
      if (!findSeatData) {
        return {
          status: 400,
          message:
            'Service Error: 좌석 정보가 존재하지 않거나 이미 예약된 좌석입니다.',
        };
      }

      const findUserPointData = await reservationRepository.findUserPoint(
        userId
      );

      if (!findUserPointData) {
        return {
          status: 400,
          message: 'Service Error: 유저 정보가 없습니다.',
        };
      }

      const price = findUserPointData.point - findSeatData.price;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      try {
        const updateUserPointData = await reservationRepository.updateUserPoint(
          userId,
          price,
          t
        );

        console.log(updateUserPointData);
        if (!updateUserPointData) {
          return {
            status: 400,
            message: 'Service Error: 유저의 포인트가 부족합니다.',
          };
        }

        await reservationRepository.updateSeatCheck(numSeatId, true, t);

        await reservationRepository.createReservation(userId, numSeatId, t);

        await t.commit();

        return { status: 200, message: '공연 예약이 완료되었습니다.' };
      } catch (error) {
        await t.rollback();
        return {
          status: 400,
          message: 'Transaction Error: 공연 예약에 실패했습니다.',
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Repository Error: 공연 예약에 실패 했습니다.',
      };
    }
  };

  deleteReservation = async (
    userId: number,
    numShowId: number,
    numSeatId: number,
    numReservationId: number
  ) => {
    try {
      const findReservationData = await reservationRepository.findReservation(
        numReservationId
      );

      if (!findReservationData) {
        return {
          status: 400,
          message: 'Service Error: 예약 정보가 존재하지 않습니다.',
        };
      }
      const reservationUserId: number = findReservationData.userId;
      if (reservationUserId !== userId) {
        return {
          status: 400,
          message: 'Service Error: 예약 취소에 대한 권한이 없습니다.',
        };
      }
      // const price = findReservationData.Seat.price
      const reservationSeatId: number = findReservationData.seatId;

      const findSeatData =
        await reservationRepository.findSeatByReservationSeat(
          reservationSeatId
        );

      if (!findSeatData) {
        return {
          status: 400,
          message: 'Service Error: 좌석 정보가 존재하지 않습니다.',
        };
      }

      const findUserPointData = await reservationRepository.findUserPoint(
        userId
      );

      if (!findUserPointData) {
        return {
          status: 400,
          message: 'Service Error: 유저 정보가 없습니다.',
        };
      }

      const reservationPrice: number =
        findUserPointData.point + findSeatData.price;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      try {
        await reservationRepository.updateSeatCheck(numSeatId, false, t);

        await reservationRepository.updateUserPoint(
          userId,
          reservationPrice,
          t
        );

        await reservationRepository.deleteReservation(numReservationId, t);

        await t.commit();

        return { status: 200, message: '예약 취소가 완료되었습니다.' };
      } catch (error) {
        await t.rollback();
        return {
          status: 400,
          message: 'Transaction Error: 예약 취소가 실패했습니다.',
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Repository Error: 예약 취소가 실패했습니다.',
      };
    }
  };
}

export default ReservationService;
