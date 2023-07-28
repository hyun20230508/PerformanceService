import express from 'express';
import ShowController from '../controllers/show.controller';
import AuthMiddle from '../middlewares/auth';

const showController = new ShowController();
const authMiddle = new AuthMiddle();

const showRouter = express.Router();

showRouter.post(
  '/',
  authMiddle.isSignedIn,
  authMiddle.isAdmin,
  showController.createShow
);
showRouter.get('/', showController.getShow);
showRouter.get('/:showId', showController.getShowDetail);

export default showRouter;
