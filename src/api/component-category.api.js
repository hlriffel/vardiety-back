import express from 'express';

import { DefaultController } from '../controllers/default.controller';
import { ComponentCategory } from '../../server/models';

const componentCategoryApi = express();

const componentCategoryController = new DefaultController(ComponentCategory);

componentCategoryApi.get('/', (req, res) => {
  componentCategoryController.list(req, res);
});

export default componentCategoryApi;
