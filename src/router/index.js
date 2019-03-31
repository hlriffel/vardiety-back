import express from 'express';
import cors from 'cors';

import userApi from '../controllers/user.controller';
import componentApi from '../controllers/component.controller';

const router = express.Router();

router.use(cors());
router.use('/user', userApi);
router.use('/component', componentApi);

export default router;
