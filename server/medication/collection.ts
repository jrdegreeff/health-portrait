import type { HydratedDocument, Types } from 'mongoose';
import type { Medication } from './model';
import { MedicationModel } from './model';

export default class MedicalContactCollection {

  /**
   * Add a new medication record.
   *
   * @param {string} owner - The id of the owner of the record
   * @param {object} details - An object with the details of the medication record
   * @return {Promise<HydratedDocument<Medication>>} - The newly created medication
   */
  static async addOne(owner: string, details: { name?: string; generic_name?: string, dose?: string, notes?: string }): Promise<HydratedDocument<Medication>> {
    const medication = new MedicationModel({
      owner,
      active: true,
      ...details,
    });
    await medication.save();
    return medication;
  }

  /**
   * Find a medication by medicationId.
   *
   * @param {string} medicationId - The id of the medication record to find
   * @return {Promise<HydratedDocument<Medication>> | Promise<null>} - The medicationId with the given id, if any
   */
  static async findOne(medicationId: Types.ObjectId | string): Promise<HydratedDocument<Medication>> {
    return MedicationModel.findOne({ _id: medicationId });
  }

  /**
   * Get all the medications with a given owner.
   *
   * @param {string} owner - The id of the owner of the medication record
   * @return {Promise<HydratedDocument<Medication>[]>} - An array of all of the medications sorted in alphabetical order by medication name
   */
  static async findAllByOwner(owner: string): Promise<Array<HydratedDocument<Medication>>> {
    return MedicationModel.find({ owner, active: true }).sort({ name: 1 });
  }

  /**
   * Update a medication record.
   *
   * @param {string} medicationId - The id of the medication record
   * @param {Object} details - An object with the updated details of the medication record -- all non-empty values in the object will be applied
   * @return {Promise<HydratedDocument<Medication>>} - The updated medication record
   */
  static async updateOne(medicationId: Types.ObjectId | string, details: { name?: string; generic_name?: string, dose?: string, notes?: string }): Promise<HydratedDocument<Medication>> {
    const medication = await MedicationModel.findOne({ _id: medicationId });

    // @ts-ignore
    Object.keys(details).forEach(k => medication[k] = details[k]);

    await medication.save();
    return medication;
  }

  /**
   * Delete a medication record from the collection.
   *
   * @param {string} medicationId - The id of the medication record to delete
   */
  static async deleteOne(medicationId: string): Promise<void> {
    const medication = await MedicationModel.findOne({ _id: medicationId });
    medication.active = false;  // deleted actually just means deactivated
    await medication.save();
  }

  /**
   * Delete all the medical contacts by the given owner
   *
   * @param {string} owner - The id of owner of medical contacts
   */
  static async deleteMany(owner: Types.ObjectId | string): Promise<void> {
    await MedicationModel.deleteMany({ owner });
  }

}
