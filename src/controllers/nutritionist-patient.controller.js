import { NutritionistPatient, User } from '../../server/models';

class NutritionistPatientController {

  async create(nutritionistPatient) {
    return await NutritionistPatient.create(nutritionistPatient);
  }

  async getPatientByEmail(patientEmail) {
    return await User.findOne({
      where: {
        ds_email: patientEmail
      }
    });
  }

  async deleteListPatient(idRegister) {
    return await NutritionistPatient.destroy({
      where: {
        id: idRegister
      }
    });
  }
  
  async getPatientsByNutritionist(nutritionistId) {
    return await NutritionistPatient.findAll({
      where: {
        id_nutritionist: nutritionistId
      },
      include: [
        { model: User, as: 'patient' },
        { model: User, as: 'nutritionist' }
      ]
    });
  }

  async getNutritionistPatientId(nutritionistId, patientId) {
    return await NutritionistPatient.findOne({
      where: {
        id_nutritionist: nutritionistId,
        id_patient: patientId
      }
    });
  }
}

const nutritionistPatientController = new NutritionistPatientController();

export default nutritionistPatientController;
