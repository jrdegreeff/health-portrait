import type { Request, Response, NextFunction } from 'express';
import AccountCollection, { CredentialCollection } from './collection';

/**
 * Checks if the current session (if any) still exists in the database
 */
const isCurrentSessionAccountExists = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.credentialId && req.session.accountId) {
    const credential = await CredentialCollection.findOne(req.session.credentialId);
    const account = await AccountCollection.findOne(req.session.accountId);

    if (!credential || !account || credential.account.toString() !== req.session.accountId) {
      req.session.credentialId = undefined;
      req.session.accountId = undefined;
      res.status(500).json({
        error: 'Session was not recognized.'
      });
      return;
    }
  }

  next();
};

/**
 * Checks if the account is logged in, that is, whether the credentialId is set in session
 */
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.credentialId || !req.session.accountId) {
    res.status(401).json({
      error: 'You must be logged in to complete this action.'
    });
    return;
  }

  next();
};

/**
 * Checks if the account is signed out, that is, credentialId is undefined in session
 */
const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.credentialId || req.session.accountId) {
    res.status(403).json({
      error: 'You are already signed in.'
    });
    return;
  }

  next();
};

/**
 * Checks if a account with username and password in req.body exists
 */
const isAccountExists = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as { username: string; password: string };

  const credential = await CredentialCollection.findOneByUsernameAndPassword(username, password);

  if (!credential) {
    res.status(401).json({ error: 'Invalid account login credentials provided.' });
    return;
  }

  next();
};

/**
 * Checks if a username in req.body is already in use
 */
const isUsernameExists = async (req: Request, res: Response, next: NextFunction) => {
  const credential = await CredentialCollection.findOneByUsername(req.body.username);

  if (!credential) {
    res.status(404).json({
      error: `An account with username ${req.body.username} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a username in req.body is not already in use
 */
const isUsernameNotExists = (required: boolean) => async (req: Request, res: Response, next: NextFunction) => {
  if (!required && req.body.username === undefined) {
    next();
    return;
  }

  const credential = await CredentialCollection.findOneByUsername(req.body.username);
  if (credential) {
    res.status(409).json({
      error: `An account with username ${req.body.username} already exists.`
    });
    return;
  }

  next();
};

/**
 * Checks if at least one of req.body.username or request.body.password is defined
 */
const isUsernameOrPasswordPresent = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.username === undefined && req.body.password === undefined) {
    res.status(400).json({
      error: '`username` or `password` must be specified'
    });
    return;
  }

  next();
}

/**
 * Checks if a username in req.body belongs to the same shared account as the session credential
 */
const isUsernameSameAccount = async (req: Request, res: Response, next: NextFunction) => {
  const credential = await CredentialCollection.findOneByUsername(req.body.username);

  if (req.session.accountId !== credential.account.toString()) {
    res.status(403).json({
      error: `Your account does not have any credential with username ${req.body.username}`
    });
    return;
  }

  next();
}


export {
  isCurrentSessionAccountExists,
  isLoggedIn,
  isLoggedOut,
  isAccountExists,
  isUsernameExists,
  isUsernameNotExists,
  isUsernameOrPasswordPresent,
  isUsernameSameAccount,
};
