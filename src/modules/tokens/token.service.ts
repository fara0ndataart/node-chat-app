import jwt from 'jsonwebtoken';
import config from '../../config';
import type { User } from '../../types';
import type { PairTokens } from '../../types';

export const getToken = (user: User, secretKey: string, expiresIn: string): string => {
  try {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn });
  } catch (error) {
    throw new Error('error during getting new token')
  }
};

export const getPairTokens = (user: User): PairTokens => {
  try {
    const token = getToken(user, config.jwtSecret, config.jwtSecretExpiration);
    const refreshToken = getToken(user , config.jwtRefreshSecret, config.jwtSecretRefreshExpiration);

    return {
      token,
      refreshToken
    }
  } catch (error) {
    throw new Error('error during getting pair tokens')
  }
};

export const verifyAccessToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('invalid token')
  }
};
