import express from 'express';
import cors from 'cors';

import userApi from '../api/user.api';
import componentApi from '../api/component.api';
import componentCategoryApi from '../api/component-category.api';
import componentNutrientApi from '../api/component-nutrient.api';
import nutrientApi from '../api/nutrient.api';
import nutritionistPatientApi from '../api/nutritionist-patient.api';
import initialDietApi from '../api/initial-diet.api';
import calendarApi from '../api/calendar.api';

const router = express.Router();

router.use(cors());
router.use('/user', userApi);
router.use('/component', componentApi);
router.use('/component-category', componentCategoryApi);
router.use('/component-nutrient', componentNutrientApi);
router.use('/nutrient', nutrientApi);
router.use('/nutritionist-patient', nutritionistPatientApi);
router.use('/initial-diet', initialDietApi);
router.use('/calendar', calendarApi);

export default router;
