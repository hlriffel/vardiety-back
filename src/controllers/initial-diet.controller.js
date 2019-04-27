import { InitialDiet, InitialDietMeal, InitialDietMealComp, InitialDietWeekDay } from '../server/models';

import nutritionistPatientController from './nutritionist-patient.controller';
import periodController from './period.controller';
import calendarController from './calendar/calendar.controller';

class InitialDietController {

  async create(nutritionistId, patientId, meals, periods) {
    const nutritionistPatient = await nutritionistPatientController.getNutritionistPatientId(nutritionistId, patientId);
    const period = await periodController.getPeriodByCode(periods.period);
    const weekDays = periods.weekDays;

    const initialDietData = {
      id_nutritionist_patient: nutritionistPatient.id,
      id_period: period.id
    };

    const initialDiet = await InitialDiet.create(initialDietData);

    const weekDaysData = weekDays.map(weekDay => {
      return {
        id_initial_diet: initialDiet.id,
        nr_week_day: weekDay
      }
    });

    await InitialDietWeekDay.bulkCreate(weekDaysData);

    await meals.forEach(async meal => {
      const mealData = {
        id_initial_diet: initialDiet.id,
        ds_meal: meal.name
      };

      const mealRecord = await InitialDietMeal.create(mealData);

      const mealItemsData = meal.items.map(item => {
        return {
          id_initial_diet_meal: mealRecord.id,
          id_component: item.id,
          qt_grams: item.amount
        }
      });

      await InitialDietMealComp.bulkCreate(mealItemsData);
    });

    await calendarController.generateNewCalendar({
      id: initialDiet.id,
      nutritionistId,
      patientId,
      nutritionistPatientId: nutritionistPatient.id,
      meals,
      periodCode: periods.period,
      weekDays
    });
  }
}

const initialDietController = new InitialDietController();

export default initialDietController;
