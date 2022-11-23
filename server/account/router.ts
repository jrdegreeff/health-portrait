import type {Request, Response} from 'express';
import express from 'express';
import AccountCollection from './collection';
import * as accountValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get the signed in user
 *
 * @name GET /api/accounts/session
 *
 * @return {AccountResponse} - currently logged in account, or null if not logged in
 */
router.get(
  '/session',
  [],
  async (req: Request, res: Response) => {
    const account = await AccountCollection.findOneByAccountId(req.session.accountId);
    res.status(200).json({
      message: 'Your session info was found successfully.',
      account: account ? util.constructAccountResponse(account) : null
    });
  }
);

/**
 * Sign in account.
 *
 * @name POST /api/accounts/session
 *
 * @param {string} username - The account's username
 * @param {string} password - The account's password
 * @return {AccountResponse} - An object with account's details
 * @throws {403} - If account is already signed in
 * @throws {400} - If username or password is  not in the correct format,
 *                 or missing in the req
 * @throws {401} - If the account login credentials are invalid
 *
 */
router.post(
  '/session',
  [
    accountValidator.isAccountLoggedOut,
    accountValidator.isValidUsername,
    accountValidator.isValidPassword,
    accountValidator.isAccountExists
  ],
  async (req: Request, res: Response) => {
    const account = await AccountCollection.findOneByUsernameAndPassword(
      req.body.username, req.body.password
    );
    req.session.accountId = account._id.toString();
    res.status(201).json({
      message: 'You have logged in successfully',
      account: util.constructAccountResponse(account)
    });
  }
);

/**
 * Sign out a user
 *
 * @name DELETE /api/accounts/session
 *
 * @return - None
 * @throws {401} - If account is not logged in
 *
 */
router.delete(
  '/session',
  [
    accountValidator.isAccountLoggedIn
  ],
  (req: Request, res: Response) => {
    req.session.accountId = undefined;
    res.status(200).json({
      message: 'You have been logged out successfully.'
    });
  }
);

/**
 * Create an account account.
 *
 * @name POST /api/accounts
 *
 * @param {string} username - username of user
 * @param {string} password - account's password
 * @return {AccountResponse} - The created user
 * @throws {403} - If there is an account already logged in
 * @throws {409} - If username is already taken
 * @throws {400} - If password or username is not in correct format
 *
 */
router.post(
  '/',
  [
    accountValidator.isAccountLoggedOut,
    accountValidator.isValidUsername,
    accountValidator.isUsernameNotAlreadyInUse,
    accountValidator.isValidPassword
  ],
  async (req: Request, res: Response) => {
    const account = await AccountCollection.addOne(req.body.username, req.body.password);
    req.session.accountId = account._id.toString();
    res.status(201).json({
      message: `Your account was created successfully. You have been logged in as ${account.username}`,
      account: util.constructAccountResponse(account)
    });
  }
);

/**
 * Update an account's profile.
 *
 * @name PATCH /api/accounts
 *
 * @param {string} username - The account's new username
 * @param {string} password - The account's new password
 * @return {AccountResponse} - The updated user
 * @throws {401} - If account is not logged in
 * @throws {409} - If username already taken
 * @throws {400} - If username or password are not of the correct format
 */
router.patch(
  '/',
  [
    accountValidator.isAccountLoggedIn,
    accountValidator.isValidUsername,
    accountValidator.isUsernameNotAlreadyInUse,
    accountValidator.isValidPassword
  ],
  async (req: Request, res: Response) => {
    const accountId = (req.session.accountId as string) ?? ''; // Will not be an empty string since its validated in isAccountLoggedIn
    const account = await AccountCollection.updateOne(accountId, req.body);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      account: util.constructAccountResponse(account)
    });
  }
);

/**
 * Delete an account.
 *
 * @name DELETE /api/accounts
 *
 * @return {string} - A success message
 * @throws {401} - If the account is not logged in
 */
router.delete(
  '/',
  [
    accountValidator.isAccountLoggedIn
  ],
  async (req: Request, res: Response) => {
    const accountId = (req.session.accountId as string) ?? ''; // Will not be an empty string since its validated in isAccountLoggedIn
    await AccountCollection.deleteOne(accountId);
    req.session.accountId = undefined;
    res.status(200).json({
      message: 'Your account has been deleted successfully.'
    });
  }
);

export {router as accountRouter};
