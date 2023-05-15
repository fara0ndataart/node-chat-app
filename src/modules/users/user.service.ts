import bcrypt from 'bcrypt';
import * as UserRepository from './user.repository';
import UserModel from './user.model';

export class UserNotFoundError extends Error {

}

export const getByEmailAndPassword = async (email: string, password: string) => {
  const user = await UserRepository.getUserByQuery({ email });
  if (!user) {
    throw new UserNotFoundError();
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new UserNotFoundError();
  }

  return user;
}

export const getByEmailAndCreate = async (email: string, password: string) => {
  const existingUser = await UserRepository.getUserByQuery({ email });
  if (existingUser) {
    throw new UserNotFoundError();
  }

  const user = await UserModel.query().insert({
    email,
    password: await bcrypt.hash(password, 10)
  });

  return user;
}
