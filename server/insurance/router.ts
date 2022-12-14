import type {Request, Response} from 'express';
import express from 'express';
import InsuranceCardCollection from './collection';
import * as validator from '../middleware';
import * as accountValidator from '../account/middleware';
import * as insuranceCardValidator from '../insurance/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all of an account's insurance cards.
 *
 * @name GET /api/insurance-cards
 *
 * @return {InsuranceCardResponse[]} - An array of insurance cards created by the logged in user
 * @throws {401} - If the account is not logged in
 *
 */
router.get(
  '/',
  accountValidator.isLoggedIn,
  async (req: Request, res: Response) => {
    const insuranceCards = await InsuranceCardCollection.findAllByOwner(req.session.accountId);
    const response = insuranceCards.map(util.constructInsuranceCardResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new insurance card.
 *
 * @name POST /api/insurance-cards
 * @param {string} subscriber_name - The subscriber name of the insurance card
 * @param {string} member_id - The member id of the insurance card
 * @param {string} group_number - The group number of the insurance card
 * @param {string} plan_number - The plan number of the insurance card
 * @param {string} plan_type - The plan type of the insurance card
 * @param {string} purpose - The purpose of the insurance card
 * @param {string} notes - Notes about the insurance card
 * @return {InsuranceCardResponse} - The created insurance card
 * @throws {401} - If the account is not logged in
 * @throws {400} - If the subscriber name of the insurance card is empty or a stream of empty spaces
 * @throws {400} - If the purpose of the insurance card is empty or a stream of empty spaces
 */
router.post(
  '/',
  accountValidator.isLoggedIn,
  validator.isNonEmpty((req: Request) => req.body.subscriber_name, 'Subscriber name', true),
  validator.isNonEmpty((req: Request) => req.body.purpose, 'Purpose', true),
  async (req: Request, res: Response) => {
    const insuranceCard = await InsuranceCardCollection.addOne(req.session.accountId, req.body);
    res.status(201).json({
      message: 'Your insurance card was created successfully.',
      insuranceCard: util.constructInsuranceCardResponse(insuranceCard)
    });
  }
);

/**
 * Modify an insurance card
 *
 * @name PATCH /api/insurance-cards/:insuranceCardId
 *
 * @param {string} subscriber_name - The subscriber name of the insurance card
 * @param {string} member_id - The member id of the insurance card
 * @param {string} group_number - The group number of the insurance card
 * @param {string} plan_number - The plan number of the insurance card
 * @param {string} plan_type - The plan type of the insurance card
 * @param {string} purpose - The purpose of the insurance card
 * @param {string} notes - Notes about the insurance card
 * @return {InsuranceCardResponse} - the updated insurance card
 * @throws {401} - If the account is not logged in
 * @throws {403} - If the account is not the owner of the insurance card
 * @throws {400} - If the subscriber name of the insurance card is empty or a stream of empty spaces
 * @throws {400} - If the purpose of the insurance card is empty or a stream of empty spaces
 * @throws {404} - If the insuranceCardId is invalid
 */
router.patch(
  '/:insuranceCardId',
  accountValidator.isLoggedIn,
  insuranceCardValidator.isInsuranceCardExists,
  insuranceCardValidator.isValidInsuranceCardModifier,
  validator.isNonEmpty((req: Request) => req.body.subscriber_name, 'Subscriber name', false),
  validator.isNonEmpty((req: Request) => req.body.purpose, 'Purpose', false),
  async (req: Request, res: Response) => {
    const insuranceCard = await InsuranceCardCollection.updateOne(req.params.insuranceCardId, req.body);
    res.status(200).json({
      message: 'Your insurance card was updated successfully.',
      insuranceCard: util.constructInsuranceCardResponse(insuranceCard)
    });
  }
);

/**
 * Delete an insurance card
 *
 * @name DELETE /api/insurance-cards/:insuranceCardId
 *
 * @return {string} - A success message
 * @throws {401} - If the account is not logged in
 * @throws {403} - If the account is not the owner of the insurance card
 * @throws {404} - If the insuranceCardId is invalid
 */
router.delete(
  '/:insuranceCardId',
  accountValidator.isLoggedIn,
  insuranceCardValidator.isInsuranceCardExists,
  insuranceCardValidator.isValidInsuranceCardModifier,
  async (req: Request, res: Response) => {
    await InsuranceCardCollection.deleteOne(req.params.insuranceCardId);
    res.status(200).json({
      message: 'Your insurance card was deleted successfully.'
    });
  }
);

export {router as insuranceCardRouter};
