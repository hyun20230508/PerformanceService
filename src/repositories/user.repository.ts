import User from '../models/users';
import Reservation from '../models/reservations';
import Seat from '../models/seats';
import Show from '../models/shows';

class UserRepository {
  getUserinfo = async (userId: number) => {
    const getUserinfoData = await User.findOne({
      attributes: ['userId', 'name', 'nickname', 'email', 'point', 'isAdmin'],
      where: { userId },
    });

    return getUserinfoData;
  };

  getReservation = async (userId: number) => {
    const getReservationData = await Reservation.findAll({
      attributes: ['reservationId', 'userId', 'seatId'],
      include: [
        {
          model: Seat,
          attributes: ['showId', 'seatNumber', 'grade', 'price'],
          include: [
            {
              model: Show,
              attributes: ['title', 'showTime'],
            },
          ],
        },
      ],
      where: { userId },
    });

    return getReservationData;
  };
}

export default UserRepository;
