import { User, UserRestriction, Component } from '../../server/models';

class UserController {

  async create(user) {
    return await User.create(user);
  }

  async getUserByEmailAndPassword(email, password) {
    return await User.findOne({
      where: {
        ds_email: email,
        ds_password: password
      }
    });
  }

  async getUserRestrictions(userId) {
    return await UserRestriction.findAll({
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
  }

  async deleteUserRestrictions(userId) {
    return await UserRestriction.destroy({
      where: {
        id_user: userId
      }
    });
  }

  async addUserRestrictions(restrictions) {
    return await UserRestriction.bulkCreate(restrictions);
  }
}

const userController = new UserController();

export default userController;
