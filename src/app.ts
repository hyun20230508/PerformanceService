import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { sequelize } from './models/index';
import dotenv from 'dotenv';
dotenv.config();
// import router from './routes/index';
import router from './routes/index';
const app = express();
const PORT: string | number = process.env.port || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('싱크으으으으으으');
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api', router);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('ㅎㅇ');
});

app.listen(PORT, () => {
  console.log(`${PORT}로 서버가 열렸습니다.`);
});
