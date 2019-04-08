import express from 'express';

import { DefaultController } from './default.controller';
import { Component } from '../../server/models/';

const componentApi = express();

const componentController = new DefaultController(Component);

componentApi.get('/', (req, res) => {
  componentController.list(req, res, ['nm_component']);
});

export default componentApi;
