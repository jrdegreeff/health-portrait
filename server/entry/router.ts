import type {Request, Response} from 'express';
import express from 'express';
import EntryCollection from './collection';
import * as validator from '../middleware';
import * as accountValidator from '../account/middleware';
import * as entryValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all entries of the account
 *
 * @name GET /api/entries
 *
 * @return {EntryResponse[]} - a list of entries by the logged in account sorted in descending order by date
 * @throws {401} if the account is not logged in
 */
router.get(
  '/',
  accountValidator.isLoggedIn,
  async (req: Request, res: Response) => {
    const entries = await EntryCollection.findAllByOwnerId(req.session.accountId);
    const response = entries.map(util.constructEntryResponse);
    res.status(200).json(response);
  }
);

/**
 * Create an entry.
 *
 * @name POST /api/entries
 *
 * @param {string} type
 * @param {string} detail
 * @param {string} condition
 * @param {number} scale
 * @param {string} notes
 * @param {string} date
 * @return {EntryResponse} - The newly created entry object
 * @throws {401} if the account is not logged in
 * @throws {400} - If type, detail, notes, or date is not in correct format
 *
 */
router.post(
  '/',
  accountValidator.isLoggedIn,
  validator.isNonEmpty((req: Request) => req.body.type, 'Type', true),
  validator.isNonEmpty((req: Request) => req.body.detail, 'Detail', true),
  entryValidator.isValidEntryType(true),
  entryValidator.isValidEntryCondition(true),
  entryValidator.isValidEntryScale(true),
  validator.isValidDate((req: Request) => req.body.date, true),
  async (req: Request, res: Response) => {
    const entry = await EntryCollection.addOne(
      req.session.accountId,
      req.body.type,
      req.body.detail,
      req.body.condition,
      req.body.scale,
      req.body.notes,
      req.body.date
    );
    res.status(201).json({
      message: 'Your entry was created successfully.',
      entry: util.constructEntryResponse(entry)
    });
  }
);

/**
 * Update an entry's content.
 *
 * @name PATCH /api/entries/:entryId
 *
 * @param {string} type
 * @param {string} detail
 * @param {string} condition
 * @param {number} scale
 * @param {string} notes
 * @param {string} date
 * @return {EntryResponse} - The updated entry object
 * @throws {401} if the account is not logged in
 * @throws {404} if the entryId is invalid
 * @throws {403} if the account is not the owner of the entry
 * @throws {400} - If type, detail, notes, or date is not in correct format
 *
 * */
router.patch(
  '/:entryId',
  accountValidator.isLoggedIn,
  entryValidator.isValidEntry,
  entryValidator.isValidEntryModifier,
  validator.isNonEmpty((req: Request) => req.body.type, 'Type', false),
  validator.isNonEmpty((req: Request) => req.body.detail, 'Detail', false),
  entryValidator.isValidEntryType(false),
  entryValidator.isValidEntryCondition(false),
  entryValidator.isValidEntryScale(false),
  validator.isValidDate((req: Request) => req.body.date, false),
  async (req: Request, res: Response) => {
    const entry = await EntryCollection.updateOne(req.params.entryId, req.body);
    res.status(200).json({
      message: 'Your entry was updated successfully.',
      entry: util.constructEntryResponse(entry)
    });
  }
);

/**
 * Delete an entry.
 *
 * @name DELETE /api/entries/:entryId
 *
 * @return {string} - A success message
 * @throws {401} if the account is not logged in
 * @throws {404} if the entryId is invalid
 * @throws {403} if the account is not the owner of the entry
 */
router.delete(
  '/:entryId',
  accountValidator.isLoggedIn,
  entryValidator.isValidEntry,
  entryValidator.isValidEntryModifier,
  async (req: Request, res: Response) => {
    await EntryCollection.deleteOne(req.params.entryId);
    res.status(200).json({
      message: 'Your entry has been deleted successfully.'
    });
  }
);

export {router as entryRouter};
