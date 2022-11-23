import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Account} from './model';

export type AccountResponse = {
  _id: string;
  username: string;
  dateJoined: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Account object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Account>} account - An account object
 * @returns {AccountResponse} - The account object without the password
 */
const constructAccountResponse = (account: HydratedDocument<Account>): AccountResponse => {
  const accountCopy: Account = {
    ...account.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete accountCopy.password;
  return {
    ...accountCopy,
    _id: accountCopy._id.toString(),
    dateJoined: formatDate(account.dateJoined)
  };
};

export {
  constructAccountResponse
};
