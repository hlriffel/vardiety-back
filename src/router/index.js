import express from 'express';
import cors from 'cors';

import userApi from '../controllers/user.controller';
import componentApi from '../controllers/component.controller';
import componentCategoryApi from '../controllers/componentCategory.controller';
import nutrientApi from '../controllers/nutrient.controller';
import nutritionistPatientApi from '../controllers/nutritionist-patient.controller';

const router = express.Router();

router.use(cors());
router.use('/user', userApi);
router.use('/component', componentApi);
router.use('/component-category', componentCategoryApi);
router.use('/nutrient', nutrientApi);
router.use('/nutritionist-patient', nutritionistPatientApi);

export default router;
