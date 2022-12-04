import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type Account = {
  _id: Types.ObjectId;
  name: string;
};

export type Credential = {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  username: string;
  password: string;
  dateJoined: Date;
};

const AccountSchema = new Schema({
  // The user's username
  name: {
    type: String,
    required: true
  },
});

AccountSchema.virtual('credentials', {
  ref: 'Credential',
  localField: '_id',
  foreignField: 'account'
});

const CredentialSchema = new Schema({
  // The credential's shared account
  account: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  // The credential's username
  username: {
    type: String,
    required: true
  },
  // The credential's password
  password: {
    type: String,
    required: true
  },
  // The date the credential was added
  dateJoined: {
    type: Date,
    required: true
  },
});

export const AccountModel = model<Account>('Account', AccountSchema);
export const CredentialModel = model<Credential>('Credential', CredentialSchema);
