import bcrypt from 'bcrypt';
import AuthRepository from '../repositories/auth.repository';
const authRepository = new AuthRepository();

class AuthService {
  verifyPassword = (password: string, confirmPassword: string): boolean => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  };

  checkEmailExist = async (email: string) => {
    try {
      const checkEmailExistData = await authRepository.findByEmail(email);

      if (checkEmailExistData === null) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  checkNicknameExist = async (nickname: string) => {
    try {
      const checkNicknameExistData = await authRepository.findByNickname(
        nickname
      );
      if (checkNicknameExistData === null) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  createUser = async (
    name: string,
    nickname: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) => {
    let salt: number = 12;
    password = bcrypt.hashSync(password, salt);
    try {
      const result = await authRepository.createUser(
        name,
        nickname,
        email,
        password,
        isAdmin
      );
      if (!result) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  signin = async (email: string, password: string) => {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      return false;
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return false;
    }

    return user;
  };
}

export default AuthService;
