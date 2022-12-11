import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import MedicationCollection from './collection';

/**
 * Checks if a medication with id req.params.medicationId exists
 */
const isMedicationExists = async (req: Request, res: Response, next: NextFunction) => {
  const medication = Types.ObjectId.isValid(req.params.medicationId) && await MedicationCollection.findOne(req.params.medicationId);
  if (!medication) {
    res.status(404).json({
      error: `Medication record with id ${req.params.medicationId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a medication with id req.params.medicationId exists is active
 */
const isMedicationActive = async (req: Request, res: Response, next: NextFunction) => {
  const medication = Types.ObjectId.isValid(req.params.medicationId) && await MedicationCollection.findOne(req.params.medicationId);
  if (!medication || !medication.active) {
    res.status(409).json({
      error: `Medication record with id ${req.params.medicationId} is already deactivated.`
    });
    return;
  }

  next();
};


/**
 * Checks if the session user is the owner of the medication with id req.params.medicationId
 */
const isMedicationOwner = async (req: Request, res: Response, next: NextFunction) => {
  const medication = Types.ObjectId.isValid(req.params.medicationId) && await MedicationCollection.findOne(req.params.medicationId);
  if (!medication || req.session.credentialId !== medication.owner.toString()) {
    res.status(403).json({
      error: `Medication record with id ${req.params.medicationId} doesn't belong to you.`
    });
    return;
  }

  next();
};


export {
  isMedicationExists,
  isMedicationActive,
  isMedicationOwner,
};