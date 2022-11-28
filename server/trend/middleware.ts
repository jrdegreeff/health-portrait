import type {Request, Response, NextFunction} from 'express';
import TrendCollection from './collection';

/**
 * Checks if the current session (if any) still exists in the database
 */
const isCurrentSessionTrendExists = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.trendId) {
    const trend = await TrendCollection.findOneByTrendId(req.session.trendId);

    if (!trend) {
      req.session.trendId = undefined;
      res.status(500).json({
        error: 'Session was not recognized.'
      });
      return;
    }
  }

  next();
};

/**
 * Checks if a label in req.body is valid, that is, it matches the label regex
 */
const isValidLabel = (req: Request, res: Response, next: NextFunction) => {
  const labelRegex = /^\w+$/i;
  if (!labelRegex.test(req.body.label)) {
    res.status(400).json({
      error: 'Label must be a nonempty alphanumeric string.'
    });
    return;
  }

  next();
};

/**
 * Checks if a value in req.body is valid, that is, it's in {1, 2, 3, 4, 5}
 */
 const isValidValue = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.body.value in [1,2,3,4,5])) {
    res.status(400).json({
      error: 'Value must be a valid integer between 1 and 5.'
    });
    return;
  }

  next();
};

/**
 * Checks if an item in req.body is valid, that is, at 6-50 characters long without any spaces
 */
const isValidItem = (req: Request, res: Response, next: NextFunction) => {
  const itemRegex = /^\S+$/;
  if (!itemRegex.test(req.body.item)) {
    res.status(400).json({
      error: 'Item must be a nonempty string.'
    });
    return;
  }

  next();
};

/**
 * Checks if a trend with trendId in req.body exists
 */
const isTrendExists = async (req: Request, res: Response, next: NextFunction) => {
  const {trendId} = req.body as {trendId: string};

  if (!trendId) {
    res.status(400).json({error: `Missing trendId; unable to search.`});
    return;
  }

  const trend = await TrendCollection.findOneByTrendId(trendId);

  if (trend) {
    next();
  } else {
    res.status(401).json({error: 'Trend not found: no trend with provided trendId exists.'});
  }
};

export {
  isCurrentSessionTrendExists,
  isValidItem,
  isValidLabel,
  isValidValue,
  isTrendExists
};
