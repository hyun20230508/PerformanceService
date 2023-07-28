import User from '../models/users';

class AuthRepository {
  findByEmail = async (email: string) => {
    const findByEmailData = await User.findOne({
      where: { email },
    });
    return findByEmailData;
  };

  findByNickname = async (nickname: string) => {
    const findByNicknameData = await User.findOne({
      where: { nickname },
    });

    return findByNicknameData;
  };

  createUser = async (
    name: string,
    nickname: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) => {
    const createUserData = await User.create({
      name,
      nickname,
      email,
      password,
      point: 1000000,
      isAdmin,
    });
    return createUserData;
  };
}

export default AuthRepository;
