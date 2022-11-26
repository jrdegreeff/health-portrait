import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type { Account } from '../account/model';

type ParameterizedEntry<U, T, D> = {
  _id: Types.ObjectId;
  owner: U;
  type: T;
  detail: D;
  notes: string;
  date: Date;
};

export type Entry = ParameterizedEntry<Types.ObjectId, string, string>;
export type PopulatedEntry = ParameterizedEntry<Account, string, string>;

const EntrySchema = new Schema<Entry>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  }
});

const EntryModel = model<Entry>('Entry', EntrySchema);
export default EntryModel;
