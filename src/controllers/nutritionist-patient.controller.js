import express from 'express';

import { DefaultController } from './default.controller';
import { NutritionistPatients, User } from '../../server/models';

const nutritionistPatientApi = express();

const nutritionistPatientController = new DefaultController(NutritionistPatients);

nutritionistPatientApi.post('/create', (req, res) => {
  nutritionistPatientController.store(req, res);
});

nutritionistPatientApi.get('/:id', async (req, res) => {
  const nutritionistId = req.params.id;
  
  const patients = await NutritionistPatients.findAll({
    where: {
      id_nutritionist: nutritionistId
    },
    include: [
      { model: User, as: 'patient' },
      { model: User, as: 'nutritionist' }
    ]
  });

  res.status(200).send(patients);
});

export default nutritionistPatientApi;
