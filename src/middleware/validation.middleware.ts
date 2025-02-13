import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    fullName: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.date().required(),
    country: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
