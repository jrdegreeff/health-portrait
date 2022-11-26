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
    if (!type || !detail || !type.trim || !detail.trim) {
        res.status(400).json({
            error: 'Entry type/detail must be at least one character long.'
        });
        return;
    }

    // TODO: check if type is in set of specified types

    next();
}

const isValidEntryDate = async (req: Request, res: Response, next: NextFunction) => {
    // TODO

    next();
}

const isValidEntryModifier = async (req: Request, res: Response, next: NextFunction) => {
    const entry = await EntryCollection.findOne(req.params.entryId);
    const accountId = entry.owner._id;
    if (req.session.accountId !== accountId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other users\' entries.'
      });
      return;
    }
  
    next();
  };

export {
    isValidEntry,
    isValidEntryDetail,
    isValidEntryDate,
    isValidEntryModifier,
};