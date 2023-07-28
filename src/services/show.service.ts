import ShowRepository from '../repositories/show.repository';
import { sequelize } from '../models';
import { Transaction } from 'sequelize';

const showRepository = new ShowRepository();

export type seats = {
  showId: number;
  seatNumber: number;
  grade: string;
  price: number;
  isReservation: boolean;
};

class ShowService {
  declare status: number;
  declare message: string;

  createShow = async (
    userId: number,
    title: string,
    description: string,
    showTime: string,
    aGradeNum: number,
    aPrice: number,
    bGradeNum: number,
    bPrice: number
  ) => {
    try {
      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      try {
        const createShowData = await showRepository.createShow(
          userId,
          title,
          description,
          showTime,
          t
        );
        const showId: number = createShowData.showId;

        let seatsArr: Array<seats> = [];
        for (let i: number = 0; i < aGradeNum; i++) {
          seatsArr[i] = {
            showId: showId,
            seatNumber: i + 1,
            grade: 'a등급',
            price: aPrice,
            isReservation: false,
          };
        }
        for (let j: number = aGradeNum; j < aGradeNum + bGradeNum; j++) {
          seatsArr[j] = {
            showId: showId,
            seatNumber: j + 1,
            grade: 'b등급',
            price: bPrice,
            isReservation: false,
          };
        }
        console.log(seatsArr);

        await showRepository.createSeats(seatsArr, t);

        await t.commit();

        return { status: 200, message: '공연 등록이 완료되었습니다.' };
      } catch (error) {
        await t.rollback();
        return {
          status: 400,
          message: 'Transaction Error: 공연 등록에 실패했습니다.',
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Service Error: 공연 등록에 실패했습니다.',
      };
    }
  };

  getShow = async (title: string) => {
    try {
      if (!title) {
        const getShowData = await showRepository.getShowAll();
        return { status: 200, getShowData };
      } else {
        const getShowData = await showRepository.getShow(title);
        return { status: 200, getShowData };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Service Error: 공연 목록 불러오기에 실패했습니다.',
      };
    }
  };

  getShowDetail = async (showId: number) => {
    try {
      const getShowDetailData = await showRepository.getShowDetail(showId);

      return { status: 200, getShowDetailData };
    } catch (error) {
      return {
        status: 400,
        message: 'Service Error: 공연 상세정보 불러오기에 실패했습니다.',
      };
    }
  };
}

export default ShowService;
