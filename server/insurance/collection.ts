import type {HydratedDocument, Types} from 'mongoose';
import type {InsuranceCard} from './model';
import InsuranceCardModel from './model';

type InsuranceDetails = {
  subscriber_name?: string;
  member_id?: string;
  group_number?: string;
  plan_number?: string;
  plan_type?: string;
  purpose?: string;
  notes?: string;
};

export default class InsuranceCardCollection {
  /**
   * Add a new insurance card
   *
   * @param {string} owner - The id of the owner of the insurance card
   * @param {string} details - the details about the insurance card
   * @return {Promise<HydratedDocument<InsuranceCard>>} - The newly created insurance card
   */
  static async addOne(owner: Types.ObjectId | string, details: InsuranceDetails): Promise<HydratedDocument<InsuranceCard>> {
    const insuranceCard = new InsuranceCardModel({
      owner,
      ...details,
    });
    await insuranceCard.save();
    return insuranceCard;
  }

  /**
   * Find an insurance card by insuranceCardId.
   *
   * @param {string} insuranceCardId - The id of the insurance card to find
   * @return {Promise<HydratedDocument<InsuranceCard>> | Promise<null>} - The insurance card with the given id, if any
   */
  static async findOne(insuranceCardId: string): Promise<HydratedDocument<InsuranceCard>> {
    return InsuranceCardModel.findOne({_id: insuranceCardId});
  }

  /**
   * Get all insurance cards in by given owner
   *
   * @param {string} owner - The id of the owner of the medical contacts
   * @return {Promise<HydratedDocument<InsuranceCard>[]>} - An array of all of the insurance cards sorted in alphabetical order by purpose
   */
  static async findAllByOwner(owner: string): Promise<Array<HydratedDocument<InsuranceCard>>> {
    return InsuranceCardModel.find({owner}).sort({purpose: 1});
  }

  /**
   * Update an insurance card's information
   *
   * @param {string} insuranceCardId - The id of the insurance card to update
   * @param {Object} details - An object with the insurance card's updated details
   * @return {Promise<HydratedDocument<InsuranceCard>>} - The updated insurance card
   */
  static async updateOne(insuranceCardId: string, details: InsuranceDetails): Promise<HydratedDocument<InsuranceCard>> {
    const insuranceCard = await InsuranceCardModel.findOne({_id: insuranceCardId});

    // @ts-ignore
    Object.keys(details).forEach(k => insuranceCard[k] = details[k]);

    await insuranceCard.save();
    return insuranceCard;
  }

  /**
   * Delete an insurance card from the collection.
   *
   * @param {string} insuranceCardId - The id of the insurance card to delete
   */
  static async deleteOne(insuranceCardId: string): Promise<void> {
    await InsuranceCardModel.deleteOne({_id: insuranceCardId});
  }

  /**
   * Delete all the insurance cards by the given owner
   *
   * @param {string} owner - The id of owner of medical contacts
   */
  static async deleteMany(owner: string): Promise<void> {
    await InsuranceCardModel.deleteMany({owner});
  }
}
