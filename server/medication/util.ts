import type { HydratedDocument } from 'mongoose';
import type { Medication } from './model';

export type MedicationResponse = {
  _id: string;
  name: string;
  generic_name: string;
  dose: string;
  notes: string;
};

/**
 * Transform a raw Medication object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Medication>} medication - The medication object to transform
 * @returns {MedicationResponse} - The medical contact object formatted for the frontend
 */
export const constructMedicationResponse = (medication: HydratedDocument<Medication>): MedicationResponse => {
  const medicationCopy: Medication = {
    ...medication.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete medicationCopy.owner;
  return {
    ...medicationCopy,
    _id: medicationCopy._id.toString()
  };
};
