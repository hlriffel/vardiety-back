import express from 'express';

import { ComponentNutrient } from '../server/models';

import { DefaultController } from '../controllers/default.controller';

import componentNutrientController from '../controllers/component-nutrient.controller';

const componentNutrientApi = express();

const componentNutrientControllerDefault = new DefaultController(ComponentNutrient);

componentNutrientApi.post('/create', async (req, res) => {
  const { componentId, nutrientId, nutrientQuant } = req.body;

  await componentNutrientController.create({
    id_component: componentId,
    id_nutrient: nutrientId,
    qt_nutrient: nutrientQuant
  });

  res.status(200).send();
});

componentNutrientApi.get('/', (req, res) => {
  componentNutrientControllerDefault.list(req, res)
});

export default componentNutrientApi;