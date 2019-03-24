import express from 'express';
import cors from 'cors';

import userApi from '../api/user';

const router = express.Router();

router.use(cors());
router.use('/user', userApi);

export default router;
