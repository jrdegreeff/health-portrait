// Generic middleware that can be shared by all concepts.

import type { Request, Response, NextFunction } from 'express';

const nonEmptyRegex = /^(?!\s*$).+/i;
const usernameRegex = /^\w+$/i;
const passwordRegex = /^\S+$/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
const dateRegex = /^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$/;

const validateAgainstRegex =
  (fieldAccessor: Function, required: boolean, regex: RegExp, error: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const field = fieldAccessor(req);
    if ((required || field !== undefined) && (field === undefined || !regex.test(field))) {
      res.status(400).json({ error });
      return;
    }
    next();
}

const isNonEmpty = (fieldAccessor: Function, name: string, required: boolean) => 
  validateAgainstRegex(fieldAccessor, required, nonEmptyRegex, `${name} must be a nonempty string.`);
const isValidUsername = (fieldAccessor: Function, required: boolean) => 
  validateAgainstRegex(fieldAccessor, required, usernameRegex, 'Username must be a nonempty alphanumeric string.');
const isValidPassword = (fieldAccessor: Function, required: boolean) => 
  validateAgainstRegex(fieldAccessor, required, passwordRegex, 'Password must not contain whitespace characters.');
const isValidPhoneNumber = (fieldAccessor: Function, required: boolean) => 
  validateAgainstRegex(fieldAccessor, required, phoneRegex, 'Phone number must be in a valid format (e.g. 123-456-7890).');
const isValidDate = (fieldAccessor: Function, required: boolean) => 
  validateAgainstRegex(fieldAccessor, required, dateRegex, 'Date must be in format YYYY-MM-DD.');

export {
  isNonEmpty,
  isValidUsername,
  isValidPassword,
  isValidPhoneNumber,
  isValidDate,
}
