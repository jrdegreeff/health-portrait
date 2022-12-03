import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Entry, PopulatedEntry} from './model';

export type EntryResponse = {
  _id: string;
  type: string;
  detail: string;
  condition: string;
  scale: number;
  notes: string;
  date: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('YYYY/MM/DD');

/**
 * Transform a raw Entry object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Entry>} entry - An entry object
 * @returns {EntryResponse} - The entry object formatted for the frontend
 */
const constructEntryResponse = (entry: HydratedDocument<Entry>): EntryResponse => {
  const entryCopy: PopulatedEntry = {
    ...entry.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete entryCopy.owner;
  return {
    ...entryCopy,
    _id: entryCopy._id.toString(),
    date: formatDate(entry.date)
  };
};

export {
  constructEntryResponse
};
