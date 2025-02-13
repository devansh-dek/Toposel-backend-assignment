import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

export const validateRegistration: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    fullName: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    dateOfBirth: Joi.date().required(),
    country: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    return;
  }
  next();
};

export const validateLogin: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ stripUnknown: true });;

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    return;
  }
  next();
};
