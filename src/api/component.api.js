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

componentApi.get('/', (req, res) => {
  componentControllerDefault.list(req, res, {
    order: ['nm_component']/*,
    include: [
      { model: ComponentCategory, as: 'componentCategory', include: [
        { model: Category, as: 'category', attributes: ['nm_category'] }
      ] }
    ]*/
  });
});

export default componentApi;
