import type {HydratedDocument} from 'mongoose';
import { Account } from 'server/account/model';
import type {MedicalContact, PopulatedMedicalContact} from './model';

type MedicalContactResponse = {
  _id: string;
  title: string;
  first_name: string;
  last_name: string;
  hospital: string;
  specialty: string;
  phone_number: string;
  notes: string;
};

/**
 * Transform a raw Medical Contact object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<MedicalContact>} medicalContact - A medical contact
 * @returns {MedicalContactResponse} - The medical contact object formatted for the frontend
 */
const constructMedicalContactResponse = (medicalContact: HydratedDocument<MedicalContact>): MedicalContactResponse => {
  const medicalContactCopy: PopulatedMedicalContact = {
    ...medicalContact.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...medicalContactCopy,
    _id: medicalContactCopy._id.toString()
  };
};

export {
  constructMedicalContactResponse
};
