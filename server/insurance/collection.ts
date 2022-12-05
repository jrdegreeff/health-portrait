import type {HydratedDocument, Types} from 'mongoose';
import type {InsuranceCard} from './model';
import InsuranceCardModel from './model';

class InsuranceCardCollection {
  /**
   * Add a new insurance card
   *
   * @param {string} ownerId - The id of the owner of the insurance card
   * @param {string} cardDetails - the details about the insurance card
   * @return {Promise<HydratedDocument<InsuranceCard>>} - The newly created insurance card
   */
  static async addOne(ownerId: Types.ObjectId | string, cardDetails: {subscriber_name?: string; member_id?: string; group_number?: string; plan_number?: string; plan_type?: string; purpose?: string; notes?: string}): Promise<HydratedDocument<InsuranceCard>> {
    const insuranceCard = new InsuranceCardModel({
      ownerId,
      ...cardDetails,
    });
    await insuranceCard.save(); // Saves user to MongoDB
    return insuranceCard;
  }

  /**
   * Find an insurance card by insuranceCardId.
   *
   * @param {string} insuranceCardId - The id of the insurance card to find
   * @return {Promise<HydratedDocument<InsuranceCard>> | Promise<null>} - The insurance card with the given id, if any
   */
  static async findOne(insuranceCardId: Types.ObjectId | string): Promise<HydratedDocument<InsuranceCard>> {
    return InsuranceCardModel.findOne({_id: insuranceCardId});
  }

  /**
   * Get all insurance cards in by given owner
   *
   * @param {string} ownerId - The id of the owner of the medical contacts
   * @return {Promise<HydratedDocument<InsuranceCard>[]>} - An array of all of the insurance cards sorted in alphabetical order by purpose
   */
  static async findAllByOwnerId(ownerId: string): Promise<Array<HydratedDocument<InsuranceCard>>> {
    return InsuranceCardModel.find({ownerId}).sort({purpose: 1});
  }

  /**
   * Update an insurance card's information
   *
   * @param {string} insuranceCardId - The id of the insurance card to update
   * @param {Object} cardDetails - An object with the insurance card's updated details
   * @return {Promise<HydratedDocument<InsuranceCard>>} - The updated insurance card
   */
  static async updateOne(insuranceCardId: Types.ObjectId | string, cardDetails: {subscriber_name?: string; member_id?: string; group_number?: string; plan_number?: string; plan_type?: string; purpose?: string; notes?: string}): Promise<HydratedDocument<InsuranceCard>> {
    const insuranceCard = await InsuranceCardModel.findOne({_id: insuranceCardId});

    if (cardDetails.subscriber_name) {
      insuranceCard.subscriber_name = cardDetails.subscriber_name;
    }

    if (cardDetails.member_id) {
      insuranceCard.member_id = cardDetails.member_id;
    }

    if (cardDetails.group_number) {
      insuranceCard.group_number = cardDetails.group_number;
    }

    if (cardDetails.plan_number) {
      insuranceCard.plan_number = cardDetails.plan_number;
    }

    if (cardDetails.plan_type) {
      insuranceCard.plan_type = cardDetails.plan_type;
    }

    if (cardDetails.purpose) {
      insuranceCard.purpose = cardDetails.purpose;
    }

    if (cardDetails.notes) {
      insuranceCard.notes = cardDetails.notes;
    }

    await insuranceCard.save();
    return insuranceCard;
  }

  /**
   * Delete an insurance card from the collection.
   *
   * @param {string} insuranceCardId - The id of the insurance card to delete
   */
  static async deleteOne(insuranceCardId: Types.ObjectId | string): Promise<void> {
    await InsuranceCardModel.deleteOne({_id: insuranceCardId});
  }

  /**
   * Delete all the insurance cards by the given owner
   *
   * @param {string} ownerId - The id of owner of medical contacts
   */
  static async deleteMany(ownerId: Types.ObjectId | string): Promise<void> {
    await InsuranceCardModel.deleteMany({ownerId});
  }
}

export default InsuranceCardCollection;
