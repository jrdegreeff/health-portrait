import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type Medication = {
  id: Types.ObjectId;
  owner: Types.ObjectId;
  active: boolean;
  name: string;
  generic_name: string;
  dose: string;
  notes: string;
};

const MedicationSchema = new Schema<Medication>({
  // The owner of the record
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  // Whether the medication is in use or deleted
  active: {
    type: Boolean,
    required: true
  },
  // The name of the medication
  name: {
    type: String,
    required: true
  },
  // The generic name of the medication
  generic_name: {
    type: String,
    required: true
  },
  // The dose of the medication
  dose: {
    type: String,
    required: true
  },
  // Notes about the medication
  notes: {
    type: String,
    required: true,
    default: ""
  }
});

export const MedicationModel = model<Medication>('Medication', MedicationSchema);
