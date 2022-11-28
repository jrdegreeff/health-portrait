import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Trend} from './model';

export type TrendResponse = {
  _id: string;
  item: string;
  label: string;
  date: string;
  value: number;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Trend object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Trend>} trend - An trend object
 * @returns {TrendResponse} - The trend object without the password
 */
const constructTrendResponse = (trend: HydratedDocument<Trend>): TrendResponse => {
  const trendCopy: Trend = {
    ...trend.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...trendCopy,
    _id: trendCopy._id.toString(),
    date: formatDate(trend.date)
  };
};

export {
  constructTrendResponse
};
