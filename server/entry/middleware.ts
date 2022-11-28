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

const isValidEntryDetail = async (req: Request, res: Response, next: NextFunction) => {
    const {type, detail} = req.body as {type: string, detail: string};
    const emptyRegex = /^\w+$/i;
    if (!emptyRegex.test(type) || !emptyRegex.test(detail)) {
        res.status(400).json({
            error: 'Entry type/detail must be at least one character long.'
        });
        return;
    }

    if (!(type in ["Appointment", "Medication", "Other"])) {
        res.status(400).json({
            error: 'Entry type must be either "Appointment", "Medication", or "Other".'
        });
        return;
    }

    next();
}

const isValidEntryDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        new Date(req.body.date);  
    } catch (e) {
        res.status(400).json({
            error: 'Invalid format for entry date: must be YYYY/MM/DD.'
        });
        return;
    }

    next();
}

const isValidEntryModifier = async (req: Request, res: Response, next: NextFunction) => {
    const entry = await EntryCollection.findOne(req.params.entryId);
    const accountId = entry.owner._id;
    if (req.session.accountId !== accountId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other accounts\' entries.'
      });
      return;
    }
  
    next();
}

const isValidEntryScale = (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.scale in [1,2,3,4,5])) {
        res.status(400).json({
            error: 'Scale must be a valid integer between 1 and 5.'
        });
        return;
    }

    next();
}

export {
    isValidEntry,
    isValidEntryDetail,
    isValidEntryDate,
    isValidEntryModifier,
    isValidEntryScale,
};