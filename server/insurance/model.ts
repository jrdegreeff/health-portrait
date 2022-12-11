import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in an insurance card
 */

// Type definition for Insurance Card on the backend
export type InsuranceCard = {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  subscriber_name: string;
  member_id: string;
  group_number: string;
  plan_number: string;
  plan_type: string;
  purpose: string;
  notes: string;
};

const InsuranceCardSchema = new Schema<InsuranceCard>({
  // The owner of the insurance card
  ownerId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  // The insurance card's subscriber
  subscriber_name: {
    type: String,
    required: true
  },
  // The insurance card's member ID
  member_id: {
    type: String,
    default: ''
  },
  // The insurance card's group number
  group_number: {
    type: String,
    default: ''
  },
  // The insurance card's plan number
  plan_number: {
    type: String,
    default: ''
  },
  // The insurance card's plan type
  plan_type: {
    type: String,
    default: ''
  },
  // The insurance card's purpose
  purpose: {
    type: String,
    required: true
  },
  // Notes about the insurance card
  notes: {
    type: String,
    default: ''
  }
});

const InsuranceCardModel = model<InsuranceCard>('InsuranceCard', InsuranceCardSchema);
export default InsuranceCardModel;
