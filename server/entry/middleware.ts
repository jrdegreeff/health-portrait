import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import EntryCollection from './collection';
import ContactCollection from '../medical-contact/collection';
import MedicationCollection from '../medication/collection';

const types = {
    appointment: {
        detailCollection: ContactCollection,
        detailName: 'Contact',
    },
    medication: {
        detailCollection: MedicationCollection,
        detailName: 'Medication',
    },
    other: {
        detailCollection: null,
        detailName: null,
    },
} as { [index: string]: { detailCollection: any, detailName: string } };
const conditionValues = ["pain", "cognition", "happiness"];
const scaleValues = [1,2,3,4,5,6,7,8,9,10];

const isValidEntry = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.entryId);
    const entry = validFormat && await EntryCollection.findOne(req.params.entryId);
    if (!entry) {
        res.status(404).json({
            error: `Entry with entry ID ${req.params.entryId} does not exist.`
        });
        return;
    }

    next();
}

const isValidEntryType = (required: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    if (!required && req.body.type === undefined) {
        next();
        return;
    }
    
    req.body.type = req.body.type.toLowerCase();

    if (!Object.keys(types).includes(req.body.type)) {
        res.status(400).json({
            error: 'Entry type must be either "appointment", "medication", or "other".'
        });
        return;
    }

    next();
}

const isValidEntryDetail = (required: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    if (!required && req.body.detail === undefined) {
        next();
        return;
    }

    const type = req.body.type || (await EntryCollection.findOne(req.params.entryId)).type;
    const collection = types[type].detailCollection;
    if (!collection) {
        next();
        return;
    }

    const record = Types.ObjectId.isValid(req.body.detail) && await collection.findOne(req.body.detail);
    if (!record) {
        res.status(404).json({
            error: `${types[type].detailName} with id ${req.body.detail} does not exist.`
        });
        return;
    }

    if (req.session.accountId !== record.owner._id.toString()) {
        res.status(403).json({
            error: 'Cannot link to another account\'s record.'
        });
        return;
      }

    next();
}

const isValidEntryCondition = (required: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    if (!required && req.body.condition === undefined) {
        next();
        return;
    }
    
    req.body.condition = req.body.condition.toLowerCase();
    
    if (!conditionValues.includes(req.body.condition)) {
        res.status(400).json({
            error: 'Condition must be either "pain", "cognition", or "happiness".'
        });
        return;
    }

    next();
}

const isValidEntryScale = (required: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    if (!required && req.body.scale === undefined) {
        next();
        return;
    }
    
    if (!scaleValues.includes(parseInt(req.body.scale))) {
        res.status(400).json({
            error: 'Scale must be a valid number between 1 and 10.'
        });
        return;
    }

    next();
}

const isValidEntryModifier = async (req: Request, res: Response, next: NextFunction) => {
    const entry = await EntryCollection.findOne(req.params.entryId);
    if (req.session.accountId !== entry.owner._id.toString()) {
      res.status(403).json({
          error: 'Cannot modify another accounts\' entries.'
      });
      return;
    }
  
    next();
}

export {
    isValidEntry,
    isValidEntryType,
    isValidEntryDetail,
    isValidEntryCondition,
    isValidEntryScale,
    isValidEntryModifier,
};
