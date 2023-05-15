import type { Request, Response } from 'express';
import Joi from 'joi';
import * as UserService from '../user.service';
import { UserNotFoundError } from '../user.service';

const schema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getByEmailAndCreate(email, password);

    res.status(200).json({
      user
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(401).json({
        message: 'error',
      });
    }

    throw error;
  }
};

register.schema = schema;
