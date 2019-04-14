import express from 'express';

import initialDietController from '../controllers/initial-diet.controller';

const initialDietApi = express();

initialDietApi.post('/create', async (req, res) => {
  const {
    nutritionistId,
    patientId,
    meals,
    periods
  } = req.body;

  await initialDietController.create(nutritionistId, patientId, meals, periods);

  res.status(200).send();
});

export default initialDietApi;
