import type { Request, Response } from 'express';
import type { User } from '../../../types';
import * as TokenService from '../../tokens/token.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { token, refreshToken } = await TokenService.getPairTokens(req.user as User);

    res.status(200).json({
      user: req.user,
      token,
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
};
