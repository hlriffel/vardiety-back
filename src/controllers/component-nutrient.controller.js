import { Component, Nutrient, ComponentNutrient } from '../server/models';

class ComponentNutrientController {

  async create(componentNutrient) {
    return await ComponentNutrient.create(componentNutrient);
  }

  async getNutrientByComponent(componentId) {
    return await ComponentNutrient.findAll({
      where: {
        id_component: componentId
      },
      attributes: ['id', 'id_component', 'id_nutrient', 'qt_nutrient', 'createdAt', 'updatedAt'],
      include: [
        { model: Component, as: 'component' },
        { model: Nutrient, as: 'nutrient' }
      ]
    });
  }
}

const componentNutrientController = new ComponentNutrientController();

export default componentNutrientController;
