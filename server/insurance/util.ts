import type {HydratedDocument} from 'mongoose';
import type {InsuranceCard, PopulatedInsuranceCard} from './model';

type InsuranceCardResponse = {
  _id: string;
  subscriber_name: string;
  member_id: string;
  group_number: string;
  plan_number: string;
  plan_type: string;
  purpose: string;
  notes: string;
};

/**
 * Transform a raw Insurance Card object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<InsuranceCard>} insuranceCard - An insurance card
 * @returns {InsuranceCardResponse} - The insurance card object formatted for the frontend
 */
const constructInsuranceCardResponse = (insuranceCard: HydratedDocument<InsuranceCard>): InsuranceCardResponse => {
  const insuranceCardCopy: PopulatedInsuranceCard = {
    ...insuranceCard.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...insuranceCardCopy,
    _id: insuranceCardCopy._id.toString()
  };
};

export {
  constructInsuranceCardResponse
};