import type {HydratedDocument, Types} from 'mongoose';
import type {Account} from './model';
import AccountModel from './model';

class AccountCollection {
  /**
   * Add a new account
   *
   * @param {string} username - The username of the account
   * @param {string} password - The password of the account
   * @return {Promise<HydratedDocument<Account>>} - The newly created account
   */
  static async addOne(username: string, password: string): Promise<HydratedDocument<Account>> {
    const dateJoined = new Date();

    const account = new AccountModel({username, password, dateJoined});
    await account.save();
    return account;
  }

  /**
   * Find an account by accountId.
   *
   * @param {string} accountId - The id of the account to find
   * @return {Promise<HydratedDocument<Account>> | Promise<null>} - The account with the given username, if any
   */
  static async findOneByAccountId(accountId: Types.ObjectId | string): Promise<HydratedDocument<Account>> {
    return AccountModel.findOne({_id: accountId});
  }

  /**
   * Find an account by username (case insensitive).
   *
   * @param {string} username - The username of the account to find
   * @return {Promise<HydratedDocument<Account>> | Promise<null>} - The account with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<Account>> {
    return AccountModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  /**
   * Find an account by username (case insensitive) and password.
   *
   * @param {string} username - The username of the account to find
   * @param {string} password - The password of the account to find
   * @return {Promise<HydratedDocument<Account>> | Promise<null>} - The account with the given username and password, if any
   */
  static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<Account>> {
    return AccountModel.findOne({
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password
    });
  }

  /**
   * Update an account's information
   *
   * @param {string} accountId - The id of the account to update
   * @param {Object} accountDetails - An object with the account's updated credentials
   * @return {Promise<HydratedDocument<Account>>} - The updated account
   */
  static async updateOne(accountId: Types.ObjectId | string, accountDetails: {password?: string; username?: string}): Promise<HydratedDocument<Account>> {
    const account = await AccountModel.findOne({_id: accountId});
    if (accountDetails.password) {
      account.password = accountDetails.password;
    }

    if (accountDetails.username) {
      account.username = accountDetails.username;
    }

    await account.save();
    return account;
  }

  /**
   * Delete an account from the collection.
   *
   * @param {string} accountId - The id of account to delete
   * @return {Promise<boolean>} - true if the account has been deleted, false otherwise
   */
  static async deleteOne(accountId: Types.ObjectId | string): Promise<boolean> {
    const account = await AccountModel.deleteOne({_id: accountId});
    return account !== null;
  }
}

export default AccountCollection;
