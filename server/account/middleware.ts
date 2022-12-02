import type {Request, Response, NextFunction} from 'express';
import {AccountCollection, CredentialCollection} from './collection';

/**
 * Checks if the current session (if any) still exists in the database
 */
const isCurrentSessionAccountExists = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.credentialId) {
    const account = await AccountCollection.findOneByCredentialId(req.session.credentialId);

    if (!account) {
      req.session.credentialId = undefined;
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
  if (!req.session.credentialId) {
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
  if (req.session.credentialId) {
    res.status(403).json({
      error: 'You are already signed in.'
    });
    return;
  }

  next();
};

/**
 * Checks if a name in req.body is valid, that is, it matches the name regex
 */
const isValidAccountName = (required: boolean) => (req: Request, res: Response, next: NextFunction) => {
  if (!required && req.body.username === undefined) {
    next();
    return;
  }
  
  const nameRegex = /^[a-z ,.'-]+$/i;
  if (!nameRegex.test(req.body.name)) {
    res.status(400).json({
      error: 'Name must be a nonempty string of valid characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if a username in req.body is valid, that is, it matches the username regex
 */
const isValidUsername = (required: boolean) => (req: Request, res: Response, next: NextFunction) => {
  if (!required && req.body.username === undefined) {
    next();
    return;
  }
  
  const usernameRegex = /^\w+$/i;
  if (!usernameRegex.test(req.body.username)) {
    res.status(400).json({
      error: 'Username must be a nonempty alphanumeric string.'
    });
    return;
  }

  next();
};

/**
 * Checks if a password in req.body is valid, that is, at 6-50 characters long without any spaces
 */
const isValidPassword = (required: boolean) => (req: Request, res: Response, next: NextFunction) => {
  if (!required && req.body.username === undefined) {
    next();
    return;
  }
  
  const passwordRegex = /^\S+$/;
  if (!passwordRegex.test(req.body.password)) {
    res.status(400).json({
      error: 'Password must be a nonempty string.'
    });
    return;
  }

  next();
};

/**
 * Checks if a account with username and password in req.body exists
 */
const isAccountExists = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body as {username: string; password: string};

  const credential = await CredentialCollection.findOneByUsernameAndPassword(username, password);

  if (!credential) {
    res.status(401).json({error: 'Invalid account login credentials provided.'});
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

  // If the current session user wants to change their username to one which matches
  // the current one irrespective of the case, we should allow them to do so
  if (credential && (credential?._id.toString() !== req.session.credentialId)) {
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
  const credential1 = await CredentialCollection.findOne(req.session.credentialId);
  const credential2 = await CredentialCollection.findOneByUsername(req.body.username);

  if (credential1.account !== credential2.account) {
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
  isValidAccountName,
  isValidUsername,
  isValidPassword,
  isAccountExists,
  isUsernameExists,
  isUsernameNotExists,
  isUsernameOrPasswordPresent,
  isUsernameSameAccount,
};
