import { Component } from '../server/models';

class ComponentController {

  async create(component) {
    try {
      return await Component.create(component);
    } catch (ex) {
      console.log(ex);
    }
  }

  async deleteComponent(componentId) {
    try {
      return await Component.destroy({
        where: {
          id: componentId
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  }
}

const componentController = new ComponentController();

export default componentController;
