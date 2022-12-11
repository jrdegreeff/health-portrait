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
 * Checks if a medical contact with medicalContactId in req.params is active
 */
const isMedicalContactActive = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.medicalContactId);
  const medicalContact = validFormat ? await MedicalContactCollection.findOne(req.params.medicalContactId) : '';
  if (!medicalContact || !medicalContact.active) {
    res.status(409).json({
      error: `Medical contact with medical contact ID ${req.params.medicalContactId} is already deactivated.`
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
  if (req.session.accountId !== medicalContact.owner.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' medical contacts.'
    });
    return;
  }

  next();
};

export {
  isMedicalContactExists,
  isValidMedicalContactModifier,
  isMedicalContactActive
};
