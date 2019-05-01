import { ComponentNutrient } from '../server/models';

class ComponentNutrientController {

  async create(componentNutrient) {
    return await ComponentNutrient.create(componentNutrient);
  }
}

const componentNutrientController = new ComponentNutrientController();

export default componentNutrientController;
