import { Request, Response, NextFunction } from 'express';
import ShowService from '../services/show.service';
import dotenv from 'dotenv';
dotenv.config();
const showService = new ShowService();

class ShowController {
  createShow = async (req: Request, res: Response, next: NextFunction) => {
    interface ShowInterface {
      title: string;
      description: string;
      showTime: string;
      aGradeNum: number;
      aPrice: number;
      bGradeNum: number;
      bPrice: number;
    }
    try {
      const userId = res.locals.user.userId;
      const {
        title,
        description,
        showTime,
        aGradeNum,
        aPrice,
        bGradeNum,
        bPrice,
      }: ShowInterface = req.body;

      const createShowData = await showService.createShow(
        userId,
        title,
        description,
        showTime,
        aGradeNum,
        aPrice,
        bGradeNum,
        bPrice
      );
      return res
        .status(createShowData.status)
        .json({ result: createShowData.message });
    } catch (error) {
      return res
        .status(400)
        .json({ result: 'Controller Error: 공연 등록에 실패했습니다.' });
    }
  };

  getShow = async (req: Request, res: Response, next: NextFunction) => {
    interface ShowInterface {
      title: string;
    }
    try {
      const { title }: ShowInterface = req.body;

      const getShowData = await showService.getShow(title);
      if (getShowData.status == 200) {
        return res
          .status(getShowData.status)
          .json({ result: getShowData.getShowData });
      }

      return res
        .status(getShowData.status)
        .json({ result: getShowData.message });
    } catch (error) {
      return res.status(400).json({
        result: 'Controller Error: 공연 목록 불러오기에 실패했습니다.',
      });
    }
  };

  getShowDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { showId } = req.params;
      const numShowId: number = Number(showId);

      const getShowDetailData = await showService.getShowDetail(numShowId);
      if (getShowDetailData.status == 200) {
        return res
          .status(getShowDetailData.status)
          .json({ result: getShowDetailData.getShowDetailData });
      }

      return res
        .status(getShowDetailData.status)
        .json({ result: getShowDetailData.message });
    } catch (error) {
      return res.status(400).json({
        result: 'Controller Error: 공연 상세정보 불러오기에 실패했습니다.',
      });
    }
  };
}

export default ShowController;
