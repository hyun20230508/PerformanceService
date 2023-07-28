import Show from '../models/shows';
import Seat from '../models/seats';
import { Transaction } from 'sequelize';
import { sequelize } from '../models';
import { seats } from '../services/show.service';

class ShowRepository {
  createShow = async (
    userId: number,
    title: string,
    description: string,
    showTime: string,
    t: Transaction
  ) => {
    const createShowData = await Show.create(
      {
        userId,
        title,
        description,
        showTime,
      },
      { transaction: t }
    );

    return createShowData;
  };

  createSeats = async (seatsArr: Array<seats>, t: Transaction) => {
    const createSeats = await Seat.bulkCreate(seatsArr, { transaction: t });

    return createSeats;
  };

  getShowAll = async () => {
    const getShowData = await Show.findAll({
      attributes: ['showId', 'userId', 'title', 'description', 'showTime'],
    });

    return getShowData;
  };

  getShow = async (title: string) => {
    const getShowData = await Show.findAll({
      attributes: ['showId', 'userId', 'title', 'description', 'showTime'],
      where: { title },
    });
    return getShowData;
  };

  getShowDetail = async (showId: number) => {
    const getShowDetailData = await Show.findAll({
      attributes: ['showId', 'userId', 'title', 'description', 'showTime'],
      include: [
        {
          model: Seat,
          attributes: [
            [
              sequelize.fn('COUNT', sequelize.col('isReservation')),
              'reservationAvailable',
            ],
          ],
          where: { isReservation: false },
        },
      ],
      where: { showId },
    });
    return getShowDetailData;
  };
}

export default ShowRepository;
