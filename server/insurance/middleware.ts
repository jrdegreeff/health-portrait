import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import InsuranceCardCollection from './collection';

/**
 * Checks if an insurance card with insuranceCardId in req.params exists
 */
const isInsuranceCardExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.insuranceCardId);
  const insuranceCard = validFormat ? await InsuranceCardCollection.findOne(req.params.insuranceCardId) : '';
  if (!insuranceCard) {
    res.status(404).json({
      error: `Insurance card with insurance card ID ${req.params.insuranceCardId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the owner of the insurance card whose insuranceCardId is in req.params
 */
const isValidInsuranceCardModifier = async (req: Request, res: Response, next: NextFunction) => {
  const insuranceCard = await InsuranceCardCollection.findOne(req.params.insuranceCardId);
  const ownerId = insuranceCard.ownerId._id;
  if (req.session.accountId !== ownerId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' insurance cards.'
    });
    return;
  }

  next();
};

export {
  isInsuranceCardExists,
  isValidInsuranceCardModifier
};
