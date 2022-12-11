import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import EntryCollection from './collection';

const isValidEntry = async (req: Request, res: Response, next: NextFunction) => {
    const entryId = req.params.entryId;
    const validFormat = Types.ObjectId.isValid(entryId);
    const entry = validFormat ? EntryCollection.findOne(entryId) : null;
    if (!entry) {
        res.status(404).json({
            error: `Entry with entry ID ${entryId} does not exist.`
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

    const specifiedTypes = ["appointment", "medication", "other"];
    if (!specifiedTypes.includes(req.body.type)) {
        res.status(400).json({
            error: 'Entry type must be either "appointment", "medication", or "other".'
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
    
    const specifiedConditions = ["pain", "cognition", "happiness"];
    if (!specifiedConditions.includes(req.body.condition)) {
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
    
    const specifiedScales = [1,2,3,4,5,6,7,8,9,10];
    if (!specifiedScales.includes(parseInt(req.body.scale))) {
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
          error: 'Cannot modify other accounts\' entries.'
      });
      return;
    }
  
    next();
}

export {
    isValidEntry,
    isValidEntryType,
    isValidEntryCondition,
    isValidEntryScale,
    isValidEntryModifier,
};
