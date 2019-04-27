import { Component } from '../server/models';

class ComponentController {

  async create(component) {
    return await Component.create(component);
  }
}

const componentController = new ComponentController();

export default componentController;
