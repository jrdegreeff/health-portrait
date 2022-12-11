import type {HydratedDocument} from 'mongoose';
import type {Entry} from './model';
import EntryModel from './model';

type EntryDetails = {
  type?: string;
  detail?: string;
  condition?: string;
  scale?: number;
  notes?: string;
  date?: Date;
};

export default class EntryCollection {
  static async addOne(owner: string, details: EntryDetails): Promise<HydratedDocument<Entry>> {
    const entry = new EntryModel({
        owner,
        ...details,
      });
      await entry.save();
      return entry;
  }

  static async findOne(entryId: string): Promise<HydratedDocument<Entry>> {
    return EntryModel.findOne({_id: entryId});
  }

  static async findAllByOwner(owner: string): Promise<HydratedDocument<Entry>[]> {
    return EntryModel.find({owner}).sort({date: -1});
  }

  static async updateOne(entryId: string, details: EntryDetails): Promise<HydratedDocument<Entry>> {
    const entry = await EntryModel.findOne({_id: entryId});

    // @ts-ignore
    Object.keys(details).forEach(k => entry[k] = details[k]);

    await entry.save();
    return entry;
  }

  static async deleteOne(entryId: string): Promise<boolean> {
    const entry = await EntryModel.deleteOne({_id: entryId});
    return entry !== null;
  }

  static async deleteMany(owner: string): Promise<boolean> {
    const entries = await EntryModel.deleteMany({owner});
    return entries !== null;
  }
}
