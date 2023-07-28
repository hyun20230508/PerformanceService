import UserRepository from '../repositories/user.repository';
const userRepository = new UserRepository();

class UserService {
  getUserinfo = async (userId: number) => {
    try {
      const getUserinfoData = await userRepository.getUserinfo(userId);
      return { status: 200, getUserinfoData };
    } catch (error) {
      return {
        status: 400,
        message: 'Service Error: 유저 정보 불러오기에 실패했습니다.',
      };
    }
  };

  getReservation = async (userId: number) => {
    try {
      const getReservationData = await userRepository.getReservation(userId);
      return { status: 200, getReservationData };
    } catch (error) {
      return {
        status: 400,
        message: 'Service Error: 예약 목록 불러오기에 실패했습니다.',
      };
    }
  };
}

export default UserService;
