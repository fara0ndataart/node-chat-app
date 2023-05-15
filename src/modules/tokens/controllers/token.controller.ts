import type { Request, Response } from 'express';
import Joi from 'joi';
import * as TokenService from '../token.service';
import type { User } from '../../../types';
import config from '../../../config';

const schema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required(),
  })
});

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const verifiedToken = await TokenService.verifyAccessToken(refreshToken, config.jwtRefreshSecret);

    if (verifiedToken) {
      const { token, refreshToken } = await TokenService.getPairTokens(req.user as User);

      res.json({
        user: req.user,
        token,
        refreshToken,
      });
    }
  } catch (error) {
    throw error;
  }
};

refresh.schema = schema;
