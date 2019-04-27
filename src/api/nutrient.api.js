import express from 'express';

import { DefaultController } from '../controllers/default.controller';
import { Nutrient } from '../server/models';

const nutrientApi = express();

const nutrientController = new DefaultController(Nutrient);

nutrientApi.get('/', (req, res) => {
  nutrientController.list(req, res);
});

export default nutrientApi;
