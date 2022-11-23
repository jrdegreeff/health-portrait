import type {Request, Response, NextFunction} from 'express';
import AccountCollection from './collection';

/**
 * Checks if the current session (if any) still exists in the database
 */
const isCurrentSessionAccountExists = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.accountId) {
    const account = await AccountCollection.findOneByAccountId(req.session.accountId);

    if (!account) {
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
 * Checks if a username in req.body is valid, that is, it matches the username regex
 */
const isValidUsername = (req: Request, res: Response, next: NextFunction) => {
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
const isValidPassword = (req: Request, res: Response, next: NextFunction) => {
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

  if (!username || !password) {
    res.status(400).json({error: `Missing ${username ? 'password' : 'username'} credentials for sign in.`});
    return;
  }

  const account = await AccountCollection.findOneByUsernameAndPassword(
    username, password
  );

  if (account) {
    next();
  } else {
    res.status(401).json({error: 'Invalid account login credentials provided.'});
  }
};

/**
 * Checks if a username in req.body is already in use
 */
const isUsernameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.username !== undefined) { // If username is not being changed, skip this check
    const account = await AccountCollection.findOneByUsername(req.body.username);

    // If the current session user wants to change their username to one which matches
    // the current one irrespective of the case, we should allow them to do so
    if (account && (account?._id.toString() !== req.session.accountId)) {
      res.status(409).json({
        error: 'An account with this username already exists.'
      });
      return;
    }
  }

  next();
};

/**
 * Checks if the account is logged in, that is, whether the accountId is set in session
 */
const isAccountLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.accountId) {
    res.status(403).json({
      error: 'You must be logged in to complete this action.'
    });
    return;
  }

  next();
};

/**
 * Checks if the account is signed out, that is, accountId is undefined in session
 */
const isAccountLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.accountId) {
    res.status(403).json({
      error: 'You are already signed in.'
    });
    return;
  }

  next();
};

/**
 * Checks if an account with the specified username exists.
 */
const isUsernameExists = (username: string) => async (req: Request, res: Response, next: NextFunction) => {
  if (!username) {
    res.status(400).json({
      error: 'Provided username must be nonempty.'
    });
    return;
  }

  const account = await AccountCollection.findOneByUsername(username);
  if (!account) {
    res.status(404).json({
      error: `An account with username ${username} does not exist.`
    });
    return;
  }

  next();
};


export {
  isCurrentSessionAccountExists,
  isValidUsername,
  isValidPassword,
  isAccountExists,
  isUsernameNotAlreadyInUse,
  isAccountLoggedIn,
  isAccountLoggedOut,
  isUsernameExists,
};
