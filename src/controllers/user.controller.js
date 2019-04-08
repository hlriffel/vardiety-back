import express from 'express';

import { DefaultController } from './default.controller';
import { User, UserRestriction, Component } from '../../server/models/';

const userApi = express();

const userController = new DefaultController(User);

userApi.post('/create', (req, res) => {
  userController.store(req, res);
});

userApi.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const notFound = () => {
    res.status(404).send();
    return;
  };

  if (!email || !password) notFound();

  try {
    const user = await User.findOne({
      where: {
        ds_email: email,
        ds_password: password
      }
    });

    const responseData = {
      id: user.id,
      name: user.nm_person,
      email: user.ds_email,
      userType: user.cn_user_type
    };

    res.status(200).send(responseData);
  } catch (e) {
    notFound();
  }
});

userApi.get('/:id/restrictions', async (req, res) => {
  const userId = req.params.id;

  const userRestrictions = await UserRestriction.findAll({
    where: {
      id_user: userId
    },
    include: [
      { model: Component, as: 'component', attributes: ['nm_component'] }
    ],
    order: [
      [{ model: Component, as: 'component' }, 'nm_component']
    ]
  });

  res.status(200).send(userRestrictions);
});

userApi.post('/:id/restrictions', async (req, res) => {
  const userId = req.params.id;
  const restrictions = req.body;

  await UserRestriction.destroy({
    where: {
      id_user: userId
    }
  });

  await UserRestriction.bulkCreate(restrictions);

  res.status(200).send();
});

export default userApi;
