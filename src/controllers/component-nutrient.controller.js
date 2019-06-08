import { ComponentNutrient } from '../server/models';

class ComponentNutrientController {

  async create(componentNutrient) {
    return await ComponentNutrient.create(componentNutrient);
  }

  async getNutrientByComponent(componentId) {
    try {
      return await ComponentNutrient.findAll({
        where: {
          id_component: componentId
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  }
}

const componentNutrientController = new ComponentNutrientController();

export default componentNutrientController;
