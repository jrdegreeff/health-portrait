import type { Request, Response } from 'express';
import express from 'express';
import MedicationCollection from './collection';
import * as medicationValidator from './middleware';
import * as accountValidator from '../account/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all of the session account's medications
 *
 * @name GET /api/medications
 *
 * @return {MedicationResponse[]} - An array of medications created by the user in alphabetical order with respect to the name of the medication
 * 
 * @throws {401} - If the user is not logged in
 */
router.get(
  '/',
  accountValidator.isLoggedIn,
  async (req: Request, res: Response) => {
    const medicalContacts = await MedicationCollection.findAllByOwner(req.session.credentialId as string);
    res.status(200).json(medicalContacts.map(util.constructMedicationResponse));
  }
);

/**
 * Create a new medication record.
 *
 * @name POST /api/medication
 * 
 * @param {string} name - The medication's name
 * @param {string} generic_name - The medication's generic compound name
 * @param {string} dose - The medication's dose
 * @param {string} notes - Notes about the medication
 * 
 * @return {MedicationResponse} - The created medical contact
 * 
 * @throws {401} - If the user is not logged in
 * @throws {400} - If the name, generic_name, or dose is empty or a stream of empty spaces
 */
router.post(
  '/',
  accountValidator.isLoggedIn,
  medicationValidator.isNonEmpty((req: Request) => req.body.name, 'Name', true),
  medicationValidator.isNonEmpty((req: Request) => req.body.generic_name, 'Generic Name', true),
  medicationValidator.isNonEmpty((req: Request) => req.body.dose, 'Dose', true),
  async (req: Request, res: Response) => {
    const medication = await MedicationCollection.addOne((req.session.credentialId as string), req.body)
    res.status(201).json({
      message: 'Your medication was added successfully.',
      medication: util.constructMedicationResponse(medication)
    });
  }
);

/**
 * Modify a medication record.
 *
 * @name PATCH /api/medication/:medicationId
 *
 * @param {string} name - The medication's name
 * @param {string} generic_name - The medication's generic compound name
 * @param {string} dose - The medication's dose
 * @param {string} notes - Notes about the medication
 * 
 * @return {MedicalContactResponse} - the updated medical contact
 * 
 * @throws {401} - If the user is not logged in
 * @throws {404} - If the medicationId is invalid
 * @throws {403} - If the user is not the owner of the medication
 * @throws {400} - If the name, generic_name, or dose is empty or a stream of empty spaces
 */
router.patch(
  '/:medicalContactId',
  accountValidator.isLoggedIn,
  medicationValidator.isMedicationExists,
  medicationValidator.isMedicationOwner,
  medicationValidator.isNonEmpty((req: Request) => req.body.name, 'Name', false),
  medicationValidator.isNonEmpty((req: Request) => req.body.generic_name, 'Generic Name', false),
  medicationValidator.isNonEmpty((req: Request) => req.body.dose, 'Dose', false),
  async (req: Request, res: Response) => {
    const medication = await MedicationCollection.updateOne(req.params.medicationId, req.body);
    res.status(200).json({
      message: 'Your medication was updated successfully.',
      medication: util.constructMedicationResponse(medication)
    });
  }
);

/**
 * Deactivate a medication.
 *
 * @name DELETE /api/medication/:medicationId
 * 
 * @throws {401} - If the user is not logged in
 * @throws {404} - If the medicationId is invalid
 * @throws {403} - If the user is not the owner of the medication
 * @throws {409} - If the medicationId is already deactivated
 */
router.delete(
  '/:medicalContactId',
  accountValidator.isLoggedIn,
  medicationValidator.isMedicationExists,
  medicationValidator.isMedicationOwner,
  medicationValidator.isMedicationActive,
  async (req: Request, res: Response) => {
    await MedicationCollection.deleteOne(req.params.medicationId);
    res.status(200).json({
      message: 'Your medical contact was deactivated successfully.'
    });
  }
);


export { router as medicalContactRouter };
