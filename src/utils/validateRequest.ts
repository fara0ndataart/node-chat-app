import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate({
    body: req.body
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  Object.assign(req, value);

  next()
}
