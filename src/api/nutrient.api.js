import express from 'express';

import { DefaultController } from '../controllers/default.controller';
import { Nutrient } from '../../server/models';
import NutritionistPatientController from '../controllers/nutritionist-patient.controller';

const nutrientApi = express();

const nutrientController = new DefaultController(Nutrient);

nutrientApi.get('/', (req, res) => {
  nutrientController.list(req, res);
});

nutrientApi.post('/create', async (req, res) => {
  const idRegister = req.params.id;

  NutritionistPatientController.deleteListPatient(idRegister);
  NutritionistPatientController.create(nutritionistPatient);

  res.status(200).send();
});


export default nutrientApi;
