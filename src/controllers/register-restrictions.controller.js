import express from 'express';

import { DefaultController } from './default.controller';
import { User } from '../../server/models';

const registerRestrictionsAP1 = express();

const registerRestrictionsController = new DefaultController(User);