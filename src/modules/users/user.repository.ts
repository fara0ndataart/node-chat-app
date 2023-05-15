import UserModel from './user.model';
import type { User } from '../../types';

export const getUserByQuery = async (query: User) => await UserModel.query().findOne(query);
