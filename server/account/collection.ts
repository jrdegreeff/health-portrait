import type {HydratedDocument, Types} from 'mongoose';
import type {Account, Credential} from './model';
import {AccountModel, CredentialModel} from './model';

export default class AccountCollection {
  /**
   * Add a new account
   *
   * @param {string} name - The name of the account
   * @return {Promise<HydratedDocument<Account>>} - The newly created account
   */
  static async addOne(name: string): Promise<HydratedDocument<Account>> {
    const account = new AccountModel({name});
    await account.save();
    return account;
  }

  /**
   * Find an account by accountId.
   *
   * @param {string} accountId - The id of the account to find
   * @return {Promise<HydratedDocument<Account>> | Promise<null>} - The account with the given accountId, if any
   */
  static async findOne(accountId: Types.ObjectId | string): Promise<HydratedDocument<Account>> {
    return AccountModel.findOne({_id: accountId});
  }

  /**
   * Update an account's information
   *
   * @param {string} accountId - The id of the account to update
   * @param {string} name - The new name for the account
   * @return {Promise<HydratedDocument<Account>>} - The updated account
   */
  static async updateOne(accountId: Types.ObjectId | string, name: string): Promise<HydratedDocument<Account>> {
    const account = await AccountModel.findOne({_id: accountId});
    account.name = name;
    await account.save();
    return account;
  }

  /**
   * Delete an account from the collection.
   *
   * @param {string} accountId - The id of the account to delete
   */
  static async deleteOne(accountId: Types.ObjectId | string): Promise<void> {
    await AccountModel.deleteOne({_id: accountId});
  }
}

export class CredentialCollection {
  /**
   * Add a new credential
   *
   * @param {string} username - The username of the credential
   * @param {string} password - The password of the credential
   * @return {Promise<HydratedDocument<Credential>>} - The newly created credential
   */
  static async addOne(account: Types.ObjectId, username: string, password: string): Promise<HydratedDocument<Credential>> {
    const dateJoined = new Date();
    const credential = new CredentialModel({account, username, password, dateJoined});
    await credential.save();
    return credential;
  }

  /**
   * Find a credential by credentialId.
   *
   * @param {string} credentialId - The id of the credential to find
   * @return {Promise<HydratedDocument<Credential>> | Promise<null>} - The credential with the given credentialId, if any
   */
  static async findOne(credentialId: Types.ObjectId | string): Promise<HydratedDocument<Credential>> {
    return CredentialModel.findOne({_id: credentialId});
  }

  /**
   * Find a credential by username (case insensitive).
   *
   * @param {string} username - The username of the credential to find
   * @return {Promise<HydratedDocument<Credential>> | Promise<null>} - The credential with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<Credential>> {
    return CredentialModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  /**
   * Find a credential by username (case insensitive) and password.
   *
   * @param {string} username - The username of the credential to find
   * @param {string} password - The password of the credential to find
   * @return {Promise<HydratedDocument<Credential>> | Promise<null>} - The credential with the given username and password, if any
   */
  static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<Credential>> {
    return CredentialModel.findOne({
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password
    });
  }

  /**
   * Update a credential's information
   *
   * @param {string} credentialId - The id of the credential to update
   * @param {Object} credentialDetails - An object with the credential's updated credentials
   * @return {Promise<HydratedDocument<Credential>>} - The updated credential
   */
  static async updateOne(credentialId: Types.ObjectId | string, credentialDetails: {password?: string; username?: string}): Promise<HydratedDocument<Credential>> {
    const credential = await CredentialModel.findOne({_id: credentialId});

    if (credentialDetails.username) {
      credential.username = credentialDetails.username;
    }
    if (credentialDetails.password) {
      credential.password = credentialDetails.password;
    }

    await credential.save();
    return credential;
  }

  /**
   * Delete a credential from the collection.
   *
   * @param {string} credentialId - The id of credential to delete
   */
  static async deleteOne(credentialId: Types.ObjectId | string): Promise<void> {
    await CredentialModel.deleteOne({_id: credentialId});
  }

  /**
   * Delete all credentials associated with an account.
   *
   * @param {string} account - The id of account whose credentials to delete
   */
  static async deleteMany(account: Types.ObjectId | string): Promise<void> {
    await CredentialModel.deleteMany({account});
  }
}
