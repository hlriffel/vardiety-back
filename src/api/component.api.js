import express from 'express';

import { Component } from '../server/models';

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
  componentControllerDefault.list(req, res, ['nm_component']);
});

export default componentApi;
