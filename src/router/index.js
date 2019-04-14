import express from 'express';
import cors from 'cors';

import userApi from '../api/user.api';
import componentApi from '../api/component.api';
import componentCategoryApi from '../api/component-category.api';
import nutrientApi from '../api/nutrient.api';
import nutritionistPatientApi from '../api/nutritionist-patient.api';
import initialDietApi from '../api/initial-diet.api';

const router = express.Router();

router.use(cors());
router.use('/user', userApi);
router.use('/component', componentApi);
router.use('/component-category', componentCategoryApi);
router.use('/nutrient', nutrientApi);
router.use('/nutritionist-patient', nutritionistPatientApi);
router.use('/initial-diet', initialDietApi);

export default router;
