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
    const nonEmptyRegex = /^(?!\s*$).+/i;
    if (!type || !nonEmptyRegex.test(type) || !detail || !nonEmptyRegex.test(detail)) {
        res.status(400).json({
            error: 'Entry type/detail must be at least one character long.'
        });
        return;
    }

    const specifiedTypes = ["appointment", "medication", "other"];
    if (!specifiedTypes.includes(type)) {
        res.status(400).json({
            error: 'Entry type must be either "appointment", "medication", or "other".'
        });
        return;
    }

    next();
}

const isValidEntryCondition = async (req: Request, res: Response, next: NextFunction) => {
    const condition = req.body.condition;
    const specifiedConditions = ["pain", "cognition", "happiness"];
    if (!specifiedConditions.includes(condition)) {
        res.status(400).json({
            error: 'Condition must be either "pain", "cognition", or "happiness".'
        });
        return;
    }

    next();
}

const isValidEntryScale = async (req: Request, res: Response, next: NextFunction) => {
    const specifiedScales = [1,2,3,4,5];
    if (!specifiedScales.includes(parseInt(req.body.scale))) {
        res.status(400).json({
            error: 'Scale must be a valid integer between 1 and 5.'
        });
        return;
    }

    next();
}

const isValidEntryDate = async (req: Request, res: Response, next: NextFunction) => {
    const dateRegex = /^[0-9]{4}\/(1[0-2]|0[1-9])\/(3[01]|[12][0-9]|0[1-9])$/;
    if (!dateRegex.test(req.body.date)) {
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

export {
    isValidEntry,
    isValidEntryDetail,
    isValidEntryCondition,
    isValidEntryScale,
    isValidEntryDate,
    isValidEntryModifier,
};