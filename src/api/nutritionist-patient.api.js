import express from 'express';

import nutritionistPatientController from '../controllers/nutritionist-patient.controller';

const nutritionistPatientApi = express();

nutritionistPatientApi.post('/create', async (req, res) => {
  const { nutritionistId, patientEmail } = req.body;
  const patient = await nutritionistPatientController.getPatientByEmail(patientEmail);
  
  await nutritionistPatientController.create({
    id_nutritionist: nutritionistId,
    id_patient: patient.id
  });

  res.status(200).send();
});

nutritionistPatientApi.get('/:id', async (req, res) => {
  const nutritionistId = req.params.id;
  const patients = await nutritionistPatientController.getPatientsByNutritionist(nutritionistId);

  res.status(200).send(patients);
});

nutritionistPatientApi.delete('/:id', async (req, res) => {
  const nutritionistId = req.params.id;
   await nutritionistPatientController.deleteListPatient(nutritionistId); 

  res.status(200).send();
});

export default nutritionistPatientApi;
