import type {HydratedDocument, Types} from 'mongoose';
import type {Entry} from './model';
import EntryModel from './model';

class EntryCollection {
  static async addOne(ownerId: Types.ObjectId | string, type: string, detail: string, 
    notes: string, date: Date): Promise<HydratedDocument<Entry>> {
      const entry = new EntryModel({
        owner: ownerId,
        type,
        detail,
        notes,
        date
      });
      await entry.save();
      return entry.populate(['owner']);
  }

  static async findOne(entryId: Types.ObjectId | string): Promise<HydratedDocument<Entry>> {
    return EntryModel.findOne({_id: entryId}).populate(['owner']);
  }

  static async findAllByOwnerId(ownerId: Types.ObjectId | string): Promise<HydratedDocument<Entry>[]> {
    return EntryModel.find({owner: ownerId}).sort({date: -1}).populate(['owner']);
  }

  static async updateOne(entryId: Types.ObjectId | string, entryDetails: {type?: string; detail?: string; notes?: string, date?: Date}): Promise<HydratedDocument<Entry>> {
    const entry = await EntryModel.findOne({_id: entryId});
    if (entryDetails.type) {
      entry.type = entryDetails.type;
    }

    if (entryDetails.detail) {
      entry.detail = entryDetails.detail;
    }

    if (entryDetails.notes) {
      entry.notes = entryDetails.notes;
    }

    if (entryDetails.date) {
      entry.date = entryDetails.date;
    }

    await entry.save();
    return entry.populate(['owner']);
  }

  /**
   * Delete an entry from the collection.
   *
   * @param {string} entryId - The id of entry to delete
   * @return {Promise<boolean>} - true if the entry has been deleted, false otherwise
   */
  static async deleteOne(entryId: Types.ObjectId | string): Promise<boolean> {
    const entry = await EntryModel.deleteOne({_id: entryId});
    return entry !== null;
  }
}

export default EntryCollection;
