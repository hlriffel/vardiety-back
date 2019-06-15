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

componentNutrientApi.get('/:id', async (req, res) => {
  
  const componentId = req.params.id;
  const nutrients = await componentNutrientController.getNutrientByComponent(componentId);

  res.status(200).send(nutrients);
});

componentApi.delete('/:id', async (req, res) => {
  try {
    const nutrientId = req.params.id;
    const nutrient = await componentNutrientController.deleteNutrient(nutrientId);

    res.status(200).send(nutrient);
  } catch (ex) {
    console.log(ex); 
  }
});

export default componentNutrientApi;
