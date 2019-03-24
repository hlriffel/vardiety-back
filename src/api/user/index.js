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
    res.status(200).send({
      message: 'olhasó'
    });
  });
});

export default userApi;
