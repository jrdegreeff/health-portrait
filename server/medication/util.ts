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
  const { _id, name, generic_name, dose, notes } = medication;
  return { _id: _id.toString(), name, generic_name, dose, notes };
};
