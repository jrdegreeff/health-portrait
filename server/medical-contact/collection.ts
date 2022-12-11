import type {HydratedDocument} from 'mongoose';
import type {MedicalContact} from './model';
import MedicalContactModel from './model';

type ContractDetails = {
  title?: string;
  first_name?: string;
  last_name?: string;
  hospital?: string;
  specialty?: string;
  phone_number?: string;
  notes?: string;
};

export default class MedicalContactCollection {
  /**
   * Add a new medical contact
   *
   * @param {string} owner - The id of the owner of the medical contact
   * @param {string} details - An object with the medical contact's details
   * @return {Promise<HydratedDocument<MedicalContact>>} - The newly created medical contact
   */
  static async addOne(owner: string, details: ContractDetails): Promise<HydratedDocument<MedicalContact>> {
    const active = true; // Since medical contact was just created, it is active
    const medicalContact = new MedicalContactModel({
      owner,
      active,
      ...details,
    });
    await medicalContact.save();
    return medicalContact;
  }

  /**
   * Find a medical contact by medicalContactId.
   *
   * @param {string} medicalContactId - The id of the medical contact to find
   * @return {Promise<HydratedDocument<Account>> | Promise<null>} - The medical contact with the given id, if any
   */
  static async findOne(medicalContactId: string): Promise<HydratedDocument<MedicalContact>> {
    return MedicalContactModel.findOne({_id: medicalContactId});
  }

  /**
   * Get all the medical contacts in by given owner
   *
   * @param {string} owner - The id of the owner of the medical contacts
   * @return {Promise<HydratedDocument<MedicalContact>[]>} - An array of all of the medical contacts sorted in alphabetical order by last name
   */
  static async findAllByOwner(owner: string): Promise<Array<HydratedDocument<MedicalContact>>> {
    return MedicalContactModel.find({owner, active: true}).sort({last_name: 1});
  }

  /**
   * Update medical contact's information
   *
   * @param {string} medicalContactId - The medicalContactId of the medical contact to update
   * @param {Object} details - An object with the medical contact's updated details
   * @return {Promise<HydratedDocument<MedicalContact>>} - The updated medical contact
   */
  static async updateOne(medicalContactId: string, details: ContractDetails): Promise<HydratedDocument<MedicalContact>> {
    const medicalContact = await MedicalContactModel.findOne({_id: medicalContactId});

    // @ts-ignore
    Object.keys(details).forEach(k => medicalContact[k] = details[k]);

    await medicalContact.save();
    return medicalContact;
  }

  /**
   * Delete a medical contact from the collection.
   *
   * @param {string} medicalContactId - The medicalContactId of medical contact to delete
   */
  static async deleteOne(medicalContactId: string): Promise<void> {
    const medicalContact = await MedicalContactModel.findOne({_id: medicalContactId});
    medicalContact.active = false; // Since deleted, they are no longer active
    await medicalContact.save();
  }

  /**
   * Delete all the medical contacts by the given owner
   *
   * @param {string} owner - The id of owner of medical contacts
   */
  static async deleteMany(owner: string): Promise<void> {
    await MedicalContactModel.deleteMany({owner});
  }
}
