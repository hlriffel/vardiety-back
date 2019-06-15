import { Component, Nutrient, ComponentNutrient } from '../server/models';

class ComponentNutrientController {

  async create(componentNutrient) {
    try {
      return await ComponentNutrient.create(componentNutrient);
    } catch (ex) {
      console.log(ex);
    }
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

  async deleteNutrient(nutrientId) {
    try {
      return await ComponentNutrient.destroy({
        where: {
          id: nutrientId
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  }
}

const componentNutrientController = new ComponentNutrientController();

export default componentNutrientController;
