import type { Request, Response } from 'express';
import express from 'express';
import AccountCollection, { CredentialCollection } from './collection';
import EntryCollection from '../entry/collection';
import InsuranceCardCollection from '../insurance/collection';
import MedicalContactCollection from '../medical-contact/collection';
import MedicationCollection from '../medication/collection';
import * as validator from '../middleware';
import * as accountValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get the session shared account.
 *
 * @name GET /api/accounts/session
 *
 * @return {AccountResponse} - The signed in shared account's details
 *                             or null if not signed in
 * @return {string}          - The username used to authenticate
 *                             or null if not signed in
 */
router.get(
  '/session',
  async (req: Request, res: Response) => {
    const credential = await CredentialCollection.findOne(req.session.credentialId);
    const account = await AccountCollection.findOne(req.session.accountId);
    res.status(200).json({
      message: 'Your session info was found successfully.',
      account: account ? await util.constructAccountResponse(account) : null,
      username: account ? credential.username : null
    });
  }
);

/**
 * Sign in user.
 *
 * @name POST /api/accounts/session
 *
 * @param {string} username - The account's username
 * @param {string} password - The account's password
 * 
 * @return {AccountResponse} - The shared account's details
 * @return {string}          - The username used to authenticate
 * 
 * @throws {403} - If the user is already logged in
 * @throws {400} - If username or password is not in correct format or missing
 * @throws {401} - If the user login credentials are invalid
 */
router.post(
  '/session',
  accountValidator.isLoggedOut,
  validator.isValidUsername((req: Request) => req.body.username, true),
  validator.isValidPassword((req: Request) => req.body.password, true),
  accountValidator.isAccountExists,
  async (req: Request, res: Response) => {
    const credential = await CredentialCollection.findOneByUsernameAndPassword(req.body.username, req.body.password);
    req.session.credentialId = credential._id.toString();
    req.session.accountId = credential.account.toString();
    const account = await AccountCollection.findOne(req.session.accountId);
    res.status(201).json({
      message: 'You have logged in successfully',
      account: await util.constructAccountResponse(account),
      username: credential.username
    });
  }
);

/**
 * Sign out user.
 *
 * @name DELETE /api/accounts/session
 * 
 * @throws {401} - If the user is not logged in
 */
router.delete(
  '/session',
  accountValidator.isLoggedIn,
  (req: Request, res: Response) => {
    req.session.credentialId = undefined;
    req.session.accountId = undefined;
    res.status(200).json({
      message: 'You have been logged out successfully.'
    });
  }
);

/**
 * Create a shared account.
 *
 * @name POST /api/accounts
 *
 * @param {string} name     - The shared account owner's name
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * 
 * @return {AccountResponse} - The created shared account's details
 * @return {string}          - The username registered
 * 
 * @throws {403} - If there is an account already logged in
 * @throws {400} - If name is empty or missing
 * @throws {400} - If username or password is not in correct format or missing
 * @throws {409} - If username is already in use
 */
router.post(
  '/',
  accountValidator.isLoggedOut,
  validator.isNonEmpty((req: Request) => req.body.name, 'Name', true),
  validator.isValidUsername((req: Request) => req.body.username, true),
  validator.isValidPassword((req: Request) => req.body.password, true),
  accountValidator.isUsernameNotExists(true),
  async (req: Request, res: Response) => {
    const account = await AccountCollection.addOne(req.body.name);
    const credential = await CredentialCollection.addOne(account._id, req.body.username, req.body.password);
    req.session.credentialId = credential._id.toString();
    req.session.accountId = credential.account.toString();
    res.status(201).json({
      message: `Your account was created successfully. You have been logged in as ${credential.username}.`,
      account: await util.constructAccountResponse(account),
      username: credential.username
    });
  }
);

/**
 * Update a shared account's details.
 *
 * @name PATCH /api/accounts
 *
 * @param {string} name - The new name for the shared account
 * 
 * @return {AccountResponse} - The updated shared account details
 * 
 * @throws {401} - If the user is not logged in
 * @throws {400} - If name is empty or missing
 */
router.patch(
  '/',
  accountValidator.isLoggedIn,
  validator.isNonEmpty((req: Request) => req.body.name, 'Name', true),
  async (req: Request, res: Response) => {
    const account = await AccountCollection.updateOne(req.session.accountId, req.body.name);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      account: await util.constructAccountResponse(account)
    });
  }
);

/**
 * Delete a shared account.
 *
 * @name DELETE /api/accounts
 *
 * @throws {401} - If the user is not logged in
 */
router.delete(
  '/',
  accountValidator.isLoggedIn,
  async (req: Request, res: Response) => {
    await AccountCollection.deleteOne(req.session.accountId);
    await CredentialCollection.deleteMany(req.session.accountId);
    await EntryCollection.deleteMany(req.session.accountId);
    await InsuranceCardCollection.deleteMany(req.session.accountId);
    await MedicalContactCollection.deleteMany(req.session.accountId);
    await MedicationCollection.deleteMany(req.session.accountId);
    
    req.session.credentialId = undefined;
    req.session.accountId = undefined;
    res.status(200).json({
      message: 'Your account has been deleted successfully.'
    });
  }
);

/**
 * Create a credential for a shared account.
 *
 * @name POST /api/accounts/credentials
 *
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * 
 * @return {AccountResponse} - The updated shared account details
 * 
 * @throws {401} - If the user is not logged in
 * @throws {400} - If username or password is not in correct format or missing
 * @throws {409} - If username is already in use
 *
 */
router.post(
  '/credentials',
  accountValidator.isLoggedIn,
  validator.isValidUsername((req: Request) => req.body.username, true),
  validator.isValidPassword((req: Request) => req.body.password, true),
  accountValidator.isUsernameNotExists(true),
  async (req: Request, res: Response) => {
    const account = await AccountCollection.findOne(req.session.accountId);
    const credential = await CredentialCollection.addOne(req.session.accountId, req.body.username, req.body.password);
    res.status(201).json({
      message: `The credential with username ${credential.username} was added successfully.`,
      account: await util.constructAccountResponse(account)
    });
  }
);

/**
 * Update the session credential's details.
 *
 * @name PATCH /api/accounts/credentials
 *
 * @param {string} username - The user's new username (optional)
 * @param {string} password - The user's new password (optional)
 * 
 * @return {AccountResponse} - The updated shared account details
 * @return {string}          - The updated username
 * 
 * @throws {401} - If the user is not logged in
 * @throws {400} - If username or password present and not in the correct format
 * @throws {400} - If username and password are both missing
 * @throws {409} - If username is already in use
 */
router.patch(
  '/credentials',
  accountValidator.isLoggedIn,
  accountValidator.isUsernameOrPasswordPresent,
  validator.isValidUsername((req: Request) => req.body.username, false),
  validator.isValidPassword((req: Request) => req.body.password, false),
  accountValidator.isUsernameNotExists(false),
  async (req: Request, res: Response) => {
    const credential = await CredentialCollection.updateOne(req.session.credentialId, req.body);
    const account = await AccountCollection.findOne(credential.account);
    res.status(200).json({
      message: 'Your credentials were updated successfully.',
      account: await util.constructAccountResponse(account),
      username: credential.username
    });
  }
);

/**
 * Delete a credential from the shared account.
 *
 * @name DELETE /api/accounts/credentials
 * 
 * @return {AccountResponse} - The updated shared account details
 *
 * @throws {401} - If the user is not logged in
 * @throws {400} - If username not in the correct format or missing
 * @throws {404} - If no credential with the username exists
 * @throws {403} - If the credential with the username doesn't belong to the user's shared account
 */
router.delete(
  '/credentials',
  accountValidator.isLoggedIn,
  validator.isValidUsername((req: Request) => req.body.username, true),
  accountValidator.isUsernameExists,
  accountValidator.isUsernameSameAccount,
  async (req: Request, res: Response) => {
    const account = await AccountCollection.findOne(req.session.accountId);
    const credential = await CredentialCollection.findOneByUsername(req.body.username);
    await CredentialCollection.deleteOne(credential._id);
    if (credential._id.toString() === req.session.credentialId) {
      req.session.credentialId = undefined;
      req.session.accountId = undefined;
    }
    res.status(200).json({
      message: `The credential with username ${req.body.username} has been deleted successfully.`,
      account: req.session.credentialId === undefined ? null : await util.constructAccountResponse(account)
    });
  }
);

export { router as accountRouter };
