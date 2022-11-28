import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import TrendCollection from './collection';
import * as trendValidator from './middleware';
import * as accountValidator from '../account/middleware';
import * as util from './util';

const router = express.Router();
/**
 * Get all trends
 *
 * @name GET /api/trends
 * 
 * @return {TrendResponse[]} - A list of all the trends sorted in descending
 *                             order by date
 * @throws {401} - If the user is not logged in
 */
router.get(
  '/',
  [
    accountValidator.isAccountLoggedIn
  ],
  async (req: Request, res: Response) => {
    const trends = await TrendCollection.findAll();
    const response = trends.map(util.constructTrendResponse);
    res.status(200).json(response);
  },
);

/**
 * Add a trend to a trend.
 *
 * @name POST /api/trends
 *
 * @return {TrendResponse} - An object with trend's details
 * @throws {400} - If item, label, date, or value content is not in the correct format,
 *                 or missing in the req
 * @throws {400} - If label is not one of "pain", "happiness", or "cognition"
 * @throws {400} - If value is not one of {1, 2, 3, 4, 5}
 * @throws {401} - If the user is not logged in
 *
 */
router.post(
  '/',
  [
    trendValidator.isValidItem,
    trendValidator.isValidLabel,
    trendValidator.isValidValue,
    accountValidator.isAccountLoggedIn
  ],
  async (req: Request, res: Response) => {
    const trend = await TrendCollection.addOne(
      req.body.item, req.body.label, req.body.value
    );
    res.status(201).json({
      message: 'Successfully uploaded trend.',
      trend: util.constructTrendResponse(trend)
    });
  }
);

/**
 * Update a trend.
 *
 * @name PATCH /api/trends/:trendId
 *
 * @param {string} trendId - The id of the trend to update
 * @return {TrendResponse} - The updated trend
 * @throws {400} - If item, label, date, or value content is not in the correct format,
 *                 or missing in the req
 * @throws {400} - If label is not one of "pain", "happiness", or "cognition"
 * @throws {400} - If value is not one of {1, 2, 3, 4, 5}
 * @throws {401} - If the user is not logged in
 * @throws {402} - If user is not the creator of the trend
 * @throws {404} - If trendId is invalid
 */
router.patch(
  '/:trendId',
  [
    trendValidator.isValidItem,
    trendValidator.isValidLabel,
    trendValidator.isValidValue,
    accountValidator.isAccountLoggedIn,
    trendValidator.isTrendExists
  ],
  async (req: Request, res: Response) => {
    const trendId = (req.params.trendId as string) ?? ''; // Will not be an empty string since its validated in isTrendExists
    const trend = await TrendCollection.updateOne(trendId, req.body);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      trend: util.constructTrendResponse(trend)
    });
  }
);

/**
 * Delete a trend.
 *
 * @name DELETE /api/trends/:trendId
 *
 * @return {string} - A success message
 * @throws {401} - If the user is not logged in
 * @throws {403} - If the user is not the creator of the trend
 * @throws {404} - If the trendId is invalid
 */
router.delete(
  '/:trendId',
  [
    accountValidator.isAccountLoggedIn,
    trendValidator.isTrendExists
  ],
  async (req: Request, res: Response) => {
    const trendId = (req.params.trendId as string) ?? ''; // Will not be an empty string since its validated in isTrendLoggedIn
    await TrendCollection.deleteOne(trendId);
    res.status(200).json({
      message: 'Your trend has been deleted successfully.'
    });
  }
);

export {router as trendRouter};
