import type {HydratedDocument} from 'mongoose';
import type {Account, Credential} from './model';

export type AccountResponse = {
  _id: string;
  name: string;
  credentials: Array<string>;
};

/**
 * Transform a raw Account object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Account>} account - An account object
 * @returns {Promise<AccountResponse>} - The account object without the password
 */
const constructAccountResponse = async (account: HydratedDocument<Account>): Promise<AccountResponse> => {
  const populatedAccount = await account.populate('credentials');
  return {
    _id: populatedAccount._id.toString(),
    name: populatedAccount.name,
    // @ts-ignore
    credentials: populatedAccount.credentials.map((c: Credential) => c.username)
  };
};

export {
  constructAccountResponse
};
