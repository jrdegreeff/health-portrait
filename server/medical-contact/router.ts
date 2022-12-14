import type {Request, Response} from 'express';
import express from 'express';
import MedicalContactCollection from './collection';
import * as validator from '../middleware';
import * as accountValidator from '../account/middleware';
import * as medicalContactValidator from '../medical-contact/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all of an account's medical contacts.
 *
 * @name GET /api/medical-contacts
 *
 * @return {MedicalContactResponse[]} - An array of medical contacts created by the logged in user
 * @throws {401} - If the account is not logged in
 *
 */
router.get(
  '/',
  accountValidator.isLoggedIn,
  async (req: Request, res: Response) => {
    const medicalContacts = await MedicalContactCollection.findAllByOwner(req.session.accountId);
    const response = medicalContacts.map(util.constructMedicalContactResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new medical contact.
 *
 * @name POST /api/medical-contacts
 * @param {string} title - The username of the user
 * @param {string} first_name - The username of the user
 * @param {string} last_name - The username of the user
 * @param {string} hospital - The username of the user
 * @param {string} specialty - The username of the user
 * @param {string} phone_number - The username of the user
 * @param {string} notes - The username of the user
 * @return {MedicalContactResponse} - The created medical contact
 * @throws {401} - If the account is not logged in
 * @throws {400} - If the first name of the medical contact is empty or a stream of empty spaces
 * @throws {400} - If the last name of the medical contact is empty or a stream of empty spaces
 * @throws {400} - If the phone number of the medical contact is not a valid phone number
 */
router.post(
  '/',
  accountValidator.isLoggedIn,
  validator.isNonEmpty((req: Request) => req.body.title, 'Title', true),
  validator.isNonEmpty((req: Request) => req.body.first_name, 'First name', true),
  validator.isNonEmpty((req: Request) => req.body.last_name, 'Last name', true),
  validator.isValidPhoneNumber((req: Request) => req.body.phone_number, true),
  async (req: Request, res: Response) => {
    const medicalContact = await MedicalContactCollection.addOne(req.session.accountId, req.body);
    res.status(201).json({
      message: 'Your medical contact was created successfully.',
      medicalContact: util.constructMedicalContactResponse(medicalContact)
    });
  }
);

/**
 * Modify a medical contact
 *
 * @name PATCH /api/medical-contacts/:medicalContactId
 *
 * @param {string} title - The username of the user
 * @param {string} first_name - The username of the user
 * @param {string} last_name - The username of the user
 * @param {string} hospital - The username of the user
 * @param {string} specialty - The username of the user
 * @param {string} phone_number - The username of the user
 * @param {string} notes - The username of the user
 * @return {MedicalContactResponse} - the updated medical contact
 * @throws {401} - If the account is not logged in
 * @throws {403} - If the account is not the owner of the medical contact
 * @throws {400} - If the first name of the medical contact is empty or a stream of empty spaces
 * @throws {400} - If the last name of the medical contact is empty or a stream of empty spaces
 * @throws {400} - If the phone number of the medical contact is not a valid phone number
 * @throws {404} - If the medicalContactId is invalid
 */
router.patch(
  '/:medicalContactId',
  accountValidator.isLoggedIn,
  medicalContactValidator.isMedicalContactExists,
  medicalContactValidator.isValidMedicalContactModifier,
  validator.isNonEmpty((req: Request) => req.body.title, 'Title', false),
  validator.isNonEmpty((req: Request) => req.body.first_name, 'First name', false),
  validator.isNonEmpty((req: Request) => req.body.last_name, 'Last name', false),
  validator.isValidPhoneNumber((req: Request) => req.body.phone_number, false),
  async (req: Request, res: Response) => {
    const medicalContact = await MedicalContactCollection.updateOne(req.params.medicalContactId, req.body);
    res.status(200).json({
      message: 'Your medical contact was updated successfully.',
      medicalContact: util.constructMedicalContactResponse(medicalContact)
    });
  }
);

/**
 * Deactivate a medical contact
 *
 * @name DELETE /api/medical-contacts/:medicalContactId
 *
 * @return {string} - A success message
 * @throws {401} - If the account is not logged in
 * @throws {403} - If the account is not the owner of the medical contact
 * @throws {404} - If the medicalContactId is invalid
 * @throws {409} - If the medicalContactId is already deactivated
 */
router.delete(
  '/:medicalContactId',
  accountValidator.isLoggedIn,
  medicalContactValidator.isMedicalContactExists,
  medicalContactValidator.isValidMedicalContactModifier,
  medicalContactValidator.isMedicalContactActive,
  async (req: Request, res: Response) => {
    await MedicalContactCollection.deleteOne(req.params.medicalContactId);
    res.status(200).json({
      message: 'Your medical contact was deactivated successfully.'
    });
  }
);

export {router as medicalContactRouter};
