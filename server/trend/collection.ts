import type {HydratedDocument, Types} from 'mongoose';
import type {Trend} from './model';
import TrendModel from './model';

class TrendCollection {
  /**
   * Add a new point
   *
   * @param {string} item - The log entry to be added to the trend
   * @param {string} label - the label of the condition
   * @param {string} value - the value of the condition scale (1-5)
   * @return {Promise<HydratedDocument<Trend>>} - The newly created point
   */
  static async addOne(item: string, label: string, value: number): Promise<HydratedDocument<Trend>> {
    const date = new Date();
    const trend = new TrendModel({
      item, 
      label, 
      value, 
      date
    });
    await trend.save();
    return trend;
  }

  /**
   * Find a trend by trendId.
   *
   * @param {string} trendId - The id of the trend to find
   * @return {Promise<HydratedDocument<Trend>> | Promise<null>} - The trend with the given username, if any
   */
  static async findOneByTrendId(trendId: Types.ObjectId | string): Promise<HydratedDocument<Trend>> {
    return TrendModel.findOne({_id: trendId});
  }

  /**
   * Get all the trends in the database
   *
   * @return {Promise<HydratedDocument<Trend>[]>} - An array of all of the trends
   */
   static async findAll(): Promise<Array<HydratedDocument<Trend>>> {
    // Retrieves trends and sorts them from most to least recent
    return TrendModel.find({}).sort({date: -1});
  }

  /**
   * Find all trends by item (case insensitive).
   *
   * @param {string} item - The item to find within trends
   * @return {Promise<HydratedDocument<Trend>[]>} - The trends with the given item, if any
   */
  static async findAllByItem(item: string): Promise<Array<HydratedDocument<Trend>>> {
    return TrendModel.find({item: new RegExp(`^${item.trim()}$`, 'i')});
  }

  // /**
  //  * Find a trend (an array of points) containing a given set of items.
  //  *
  //  * @param {string[]} items - The items to find
  //  * @param {string} label - The label of the condition
  //  * @param {Date} start_date - The lower bound date of points to search for
  //  * @param {Date} end_date - The upper bound date of points to search for
  //  * @return {Promise<HydratedDocument<Trend>[]> | Promise<null>} - The trend with the given username and password, if any
  //  */
  // static async findOneByUsernameAndPassword(items: string[], label: string, start_date: Date, end_date: Date): Promise<Array<HydratedDocument<Trend>>> {
  //   var results = [];
  //   for (var i=0; i<items.length; i++) {
  //     var foundTrend = TrendModel.findOne({item: new RegExp(`^${items[i].trim()}$`, 'i')});
  //     results.push(foundTrend);
  //   }
  //   return results;
  // }

  /**
   * Update an trend's information
   *
   * @param {string} trendId - The id of the point to update
   * @param {Object} trendDetails - An object with the point's updated details
   * @return {Promise<HydratedDocument<Trend>>} - The updated point
   */
  static async updateOne(trendId: Types.ObjectId | string, trendDetails: {value?: number; date?: Date; label?: string}): Promise<HydratedDocument<Trend>> {
    const trend = await TrendModel.findOne({_id: trendId});
    if (trendDetails.value) {
      trend.value = trendDetails.value;
    }

    if (trendDetails.date) {
      trend.date = trendDetails.date;
    }

    if (trendDetails.label) {
      trend.label = trendDetails.label;
    }

    await trend.save();
    return trend;
  }

  /**
   * Delete an trend from the collection.
   *
   * @param {string} trendId - The id of trend to delete
   * @return {Promise<boolean>} - true if the trend has been deleted, false otherwise
   */
  static async deleteOne(trendId: Types.ObjectId | string): Promise<boolean> {
    const trend = await TrendModel.deleteOne({_id: trendId});
    return trend !== null;
  }
}

export default TrendCollection;
