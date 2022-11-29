import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import MedicalContactCollection from './collection';

/**
 * Checks if a medical contact with medicalContactId in req.params exists
 */
const isMedicalContactExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.medicalContactId);
    const medicalContact = validFormat ? await MedicalContactCollection.findOne(req.params.medicalContactId) : '';
    if (!medicalContact) {
      res.status(404).json({
        error: `Medical contact with medical contact ID ${req.params.medicalContactId} does not exist.`
      });
      return;
    }

  next();
  
};

/**
 * Checks if a first name in req.body is valid, that is, it matches the name regex
 */
const isValidFirstName = (req: Request, res: Response, next: NextFunction) => {
    const nameRegex = /^\w+$/i;
    if (!nameRegex.test(req.body.first_name)) {
        res.status(400).json({
        error: 'First name must be a nonempty alphanumeric string.'
        });
        return;
    }

    next();
};

/**
 * Checks if a last name in req.body is valid, that is, it matches the name regex
 */
 const isValidLastName = (req: Request, res: Response, next: NextFunction) => {
    const nameRegex = /^\w+$/i;
    if (!nameRegex.test(req.body.last_name)) {
      res.status(400).json({
        error: 'Last name must be a nonempty alphanumeric string.'
      });
      return;
    }
  
    next();
};

/**
 * Checks if a phone number in req.body is valid, that is, it matches the phone number regex
 */
 const isValidPhoneNumber = (req: Request, res: Response, next: NextFunction) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(req.body.phone_number)) {
      res.status(400).json({
        error: 'Must be a valid phone number.'
      });
      return;
    }
  
    next();
};


/**
 * Checks if the current user is the owner of the medical contact whose medicalContactId is in req.params
 */
 const isValidMedicalContactModifier = async (req: Request, res: Response, next: NextFunction) => {
    const medicalContact = await MedicalContactCollection.findOne(req.params.medicalContactId);
    const ownerId = medicalContact.ownerId._id;
    if (req.session.accountId !== ownerId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other users\' medical contacts.'
      });
      return;
    }
  
    next();
};


export {
    isMedicalContactExists,
    isValidFirstName,
    isValidLastName,
    isValidPhoneNumber,
    isValidMedicalContactModifier
};