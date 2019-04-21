import express from 'express';

import calendarController from '../controllers/calendar/calendar.controller';

const calendarApi = express();

calendarApi.get('/:nutritionistId/:patientId', async (req, res) => {
  const { nutritionistId, patientId } = req.params;
  
  const calendarData = await calendarController.getPatientCalendar(nutritionistId, patientId);

  res.status(200).send(calendarData);
});

export default calendarApi;
