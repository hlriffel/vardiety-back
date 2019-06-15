import express from 'express';

import { Component, ComponentCategory, Category } from '../server/models';

import { DefaultController } from '../controllers/default.controller';

import componentController from '../controllers/component.controller';

const componentApi = express();

const componentControllerDefault = new DefaultController(Component);

componentApi.post('/create', async (req, res) => {
  const { componentName, categoryId } = req.body;

  await componentController.create({
    nm_component: componentName,
    id_category: categoryId
  });

  res.status(200).send();
});

componentApi.delete('/:id', async (req, res) => {
  try {
    const componentId = req.params.id;
    const component = await componentController.deleteComponent(componentId);

    res.status(200).send(component);
  } catch (ex) {
    console.log(ex); 
  }
});

componentApi.get('/', (req, res) => {
  componentControllerDefault.list(req, res, {
    order: ['nm_component'],
    include: [
      { model: ComponentCategory, as: 'category'}
    ]
  });
});

export default componentApi;
