import express from 'express';

import userController from '../controllers/user.controller';

const userApi = express();

userApi.post('/create', async (req, res) => {
  const userData = req.body;
  const user = await userController.getUserByEmail(userData.ds_email);

  if (user) {
    res.status(500).send();
  } else {
    await userController.create(userData);
    res.status(200).send();
  }
});

userApi.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const notFound = () => {
    res.status(404).send();
    return;
  };

  if (!email || !password) notFound();

  try {
    const user = await userController.getUserByEmailAndPassword(email, password);

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
  const userRestrictions = await userController.getUserRestrictions(userId);

  res.status(200).send(userRestrictions);
});

userApi.post('/:id/restrictions', async (req, res) => {
  const userId = req.params.id;
  const restrictions = req.body;

  userController.deleteUserRestrictions(userId);
  userController.addUserRestrictions(restrictions);

  res.status(200).send();
});

userApi.post('/google-login', async (req, res) => {
  const googleInfo = req.body;
  const googleUser = await userController.googleLogin(googleInfo);
  const data = {
    id: googleUser.id,
    name: googleUser.nm_person,
    email: googleUser.ds_email,
    userType: googleUser.cn_user_type
  }

  res.status(200).send(data);
})

export default userApi;
