import express from 'express';

import { DefaultController } from './default.controller';
import { User } from '../../server/models/';

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

export default userApi;
