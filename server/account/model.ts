import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

export type Account = {
  _id: Types.ObjectId;
  username: string;
  password: string;
  dateJoined: Date;
};

const AccountSchema = new Schema({
  // The user's username
  username: {
    type: String,
    required: true
  },
  // The user's password
  password: {
    type: String,
    required: true
  },
  // The date the user joined
  dateJoined: {
    type: Date,
    required: true
  }
});

const AccountModel = model<Account>('Account', AccountSchema);
export default AccountModel;
