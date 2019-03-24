import express from 'express';

import { userRepo } from '../../db/repos/user';

const userApi = express();

userApi.post('/create', (req, res) => {
  const { name, email, password, userType } = req.body;
  const user = {
    name,
    email,
    password,
    userType
  };

  userRepo.createUser(user).then(() => {
    res.status(200).send();
  });
});

userApi.post('/login', (req, res) => {
  const { email, password } = req.body;
  const notFound = () => {
    res.status(404).send();
    return;
  };

  if (!email || !password) notFound();

  userRepo.getUserLogin(email, password).then(user => {
    const responseData = {
      id: user.id_usuario,
      name: user.nm_pessoa,
      email: user.ds_email,
      userType: user.cn_tipo_usuario
    };

    res.status(200).send(responseData);
  }).catch(() => {
    notFound();
  });
});

export default userApi;
