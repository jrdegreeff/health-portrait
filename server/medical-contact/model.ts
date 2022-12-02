import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {Account} from '../account/model';

/**
 * This file defines the properties stored in a Medical Contact
 */

// Type definition for Medical Contact on the backend
export type MedicalContact = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  ownerId: Types.ObjectId;
  active: boolean;
  title: string;
  first_name: string;
  last_name: string;
  hospital: string;
  specialty: string;
  phone_number: string;
  notes: string;
};

export type PopulatedMedicalContact = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  ownerId: Account;
  active: boolean;
  title: string;
  first_name: string;
  last_name: string;
  hospital: string;
  specialty: string;
  phone_number: string;
  notes: string;
};

const MedicalContactSchema = new Schema<MedicalContact>({
  // The owner of the medical contact
  owner: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  // Whether the medical contact is in use or deleted (true/false)
  active: {
    type: Boolean,
    required: true
  },
  // The medical contact's title (Dr., Nurse, etc.)
  title: {
    type: String,
    required: true
  },
  // The medical contact's first name
  first_name: {
    type: String,
    required: true
  },
  // The medical contact's last name
  last_name: {
    type: String,
    required: true
  },
  // The medical contact's hospital
  hospital: {
    type: String,
    required: true
  },
  // The medical contact's specialty
  specialty: {
    type: String,
    required: true
  },
  // The medical contact's phone number
  phone_number: {
    type: String,
    required: true
  },
  // Notes about the medical contact
  notes: {
    type: String,
    required: true
  },
});

const MedicalContactModel = model<MedicalContact>('MedicalContact', MedicalContactSchema);
export default MedicalContactModel;