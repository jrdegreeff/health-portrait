import type {HydratedDocument, Types} from 'mongoose';
import type {MedicalContact} from './model';
import MedicalContactModel from './model';
import AccountCollection from '../account/collection';

class MedicalContactCollection {
  /**
   * Add a new medical contact
   *
   * @param {string} ownerId - The id of the owner of the medical contact
   * @param {string} title - The username of the user
   * @param {string} first_name - The username of the user
   * @param {string} last_name - The username of the user
   * @param {string} hospital - The username of the user
   * @param {string} specialty - The username of the user
   * @param {string} phone_number - The username of the user
   * @param {string} notes - The username of the user
   * @return {Promise<HydratedDocument<MedicalContact>>} - The newly created medical contact
   */
  static async addOne(ownerId: Types.ObjectId | string, title: string, first_name: string, last_name: string, hospital: string, specialty: string, phone_number: string, notes: string): Promise<HydratedDocument<MedicalContact>> {
    
    const active = true; // Since medical contact was just created, it is active
    const medicalContact = new MedicalContactModel({
        ownerId,
        active, 
        title, 
        first_name, 
        last_name, 
        hospital, 
        specialty, 
        phone_number, 
        notes
    });
    await medicalContact.save(); // Saves user to MongoDB
    return medicalContact;
  }

  /**
   * Find a medical contact by medicalContactId.
   *
   * @param {string} medicalContactId - The id of the medical contact to find
   * @return {Promise<HydratedDocument<Account>> | Promise<null>} - The medical contact with the given id, if any
   */
   static async findOne(medicalContactId: Types.ObjectId | string): Promise<HydratedDocument<MedicalContact>> {
    return MedicalContactModel.findOne({_id: medicalContactId});
  }

  /**
   * Get all the medical contacts in by given owner
   *
   * @param {string} ownerId - The id of the owner of the medical contacts
   * @return {Promise<HydratedDocument<MedicalContact>[]>} - An array of all of the medical contacts sorted in alphabetical order by last name
   */
   static async findAllByOwnerId(ownerId: string): Promise<Array<HydratedDocument<MedicalContact>>> {
    //const owner = await AccountCollection.findOneByAccountId(ownerId);
    return MedicalContactModel.find({ownerId: ownerId}).sort({last_name: 1});
  }

  /**
   * Update medical contact's information
   *
   * @param {string} medicalContactId - The medicalContactId of the medical contact to update
   * @param {Object} contactDetails - An object with the medical contact's updated details
   * @return {Promise<HydratedDocument<MedicalContact>>} - The updated medical contact
   */
  static async updateOne(medicalContactId: Types.ObjectId | string, contactDetails: {title?: string; first_name?: string, last_name?: string, hospital?: string, specialty?: string, phone_number?: string, notes?: string}): Promise<HydratedDocument<MedicalContact>> {
    
    const medicalContact = await MedicalContactModel.findOne({_id: medicalContactId});
    
    if (contactDetails.title) {
        medicalContact.title = contactDetails.title;
    }

    if (contactDetails.first_name) {
        medicalContact.first_name = contactDetails.first_name;
    }

    if (contactDetails.last_name) {
        medicalContact.last_name = contactDetails.last_name;
    }

    if (contactDetails.hospital) {
        medicalContact.hospital = contactDetails.hospital;
    }

    if (contactDetails.specialty) {
        medicalContact.specialty = contactDetails.specialty;
    }

    if (contactDetails.phone_number) {
      medicalContact.phone_number = contactDetails.phone_number;
  }

    if (contactDetails.notes) {
        medicalContact.notes = contactDetails.notes;
    }

    await medicalContact.save();
    return medicalContact;
  }

  /**
   * Delete a medical contact from the collection.
   *
   * @param {string} medicalContactId - The medicalContactId of medical contact to delete
   */
  static async deleteOne(medicalContactId: Types.ObjectId | string): Promise<void> {

    const medicalContact = await MedicalContactModel.findOne({_id: medicalContactId});
    medicalContact.active = false; // Since deleted, they are no longer active
    await medicalContact.save();
  }

  /**
   * Delete all the medical contacts by the given owner
   *
   * @param {string} ownerId - The id of owner of medical contacts
   */
  static async deleteMany(ownerId: Types.ObjectId | string): Promise<void> {
    await MedicalContactModel.deleteMany({ownerId});
  }

}

export default MedicalContactCollection;