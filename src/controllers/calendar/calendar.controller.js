import Sequelize from 'sequelize';

import {
  Calendar,
  CalendarDay,
  CalendarDayMeal,
  CalendarDayMealComp,
  Component
} from '../../../server/models';

import { SuggestionArray } from './suggestion-array';
import calendarConstants from './calendar.constants';

import userController from '../user.controller';
import nutritionistPatientController from '../nutritionist-patient.controller';

class CalendarController {

  async getPatientCalendar(nutritionistId, patientId) {
    const nutritionistPatient = await nutritionistPatientController.getNutritionistPatientId(nutritionistId, patientId);
    
    return await Calendar.findOne({
      where: {
        id_nutritionist_patient: nutritionistPatient.id
      },
      include: [
        {
          model: CalendarDay,
          as: 'days',
          include: [
            {
              model: CalendarDayMeal,
              as: 'meals',
              include: [
                {
                  model: CalendarDayMealComp,
                  as: 'components',
                  include: [
                    { model: Component, as: 'component' }
                  ]
                }
              ]
            },
          ]
        },
      ]
    });
  }

  async generateNewCalendar(initialDiet) {
    /** 
     * Object containing the origin item ID as the key 
     * and its possible suggestions as the values
     */
    const suggestions = {};
    let userRestrictions = await userController.getUserRestrictions(initialDiet.patientId);
    userRestrictions = userRestrictions.map(r => r.id_component);

    for (const meal of initialDiet.meals) {
      for (const item of meal.items) {
        if (suggestions[item.id]) return;
  
        const alternatives = await Calendar.sequelize.query(
          calendarConstants.SQL_GET_SIMILAR_COMPONENTS,
          {
            bind: {
              id_component: item.id,
              qt_results: 10
            },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        suggestions[item.id] = new SuggestionArray(alternatives);
        suggestions[item.id].iterator = suggestions[item.id][Symbol.iterator]();
      }
    }

    const nextCalendarDays = await Calendar.sequelize.query(
      calendarConstants.SQL_GET_NEXT_DAYS.replace('@@PERIOD', initialDiet.periodCode === 'S' ? 'WEEK' : 'MONTH'),
      {
        replacements: {
          week_days: initialDiet.weekDays.join(',')
        },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const calendarDays = nextCalendarDays.map(day => {
      return {
        date: day.dt_calendar,
        meals: []
      }
    });
    
    calendarDays.forEach(day => {
      initialDiet.meals.forEach(meal => {
        const items = [];

        meal.items.forEach(item => {
          const getNextItem = iterator => {
            let suggestedItem = iterator.next().value;

            if (!suggestedItem) {
              iterator = suggestions[item.id][Symbol.iterator]();
              suggestedItem = iterator.next().value;
            }

            return suggestedItem;
          };

          let iterator = suggestions[item.id].iterator;
          let suggestedItem = getNextItem(iterator);

          while (userRestrictions.includes(suggestedItem.id)) {
            suggestedItem = getNextItem(iterator);
          }

          items.push({
            id: suggestedItem.id,
            amount: suggestedItem.qt_grams
          })
        });

        day.meals.push({
          name: meal.name,
          items
        });
      });
    });
    
    const calendarData = {
      initialDietId: initialDiet.id,
      nutritionistPatientId: initialDiet.nutritionistPatientId,
      calendarDays,
      beginningDate: calendarDays[0].date,
      endingDate: calendarDays[calendarDays.length - 1].date
    };

    await this.createCalendarRecords(calendarData);
  }

  async createCalendarRecords(calendarData) {
    const calendar = {
      id_initial_diet: calendarData.initialDietId,
      id_nutritionist_patient: calendarData.nutritionistPatientId,
      dt_beginning: calendarData.beginningDate,
      dt_ending: calendarData.endingDate
    };

    const calendarRecord = await Calendar.create(calendar);
    const calendarDaysData = calendarData.calendarDays.map(calendarDay => {
      return {
        id_calendar: calendarRecord.id,
        dt_day: calendarDay.date
      }
    });
    
    const calendarDaysRecords = await CalendarDay.bulkCreate(calendarDaysData, {
      returning: true
    });

    for (const [calendarDayIndex, calendarDay] of calendarData.calendarDays.entries()) {
      const mealsData = calendarDay.meals.map(meal => {
        return {
          id_calendar_day: calendarDaysRecords[calendarDayIndex].id,
          ds_meal: meal.name
        }
      });

      const mealsRecords = await CalendarDayMeal.bulkCreate(mealsData, {
        returning: true
      });

      for (const [mealIndex, meal] of calendarDay.meals.entries()) {
        const itemsData = meal.items.map(item => {
          return {
            id_calendar_day_meal: mealsRecords[mealIndex].id,
            id_component: item.id,
            qt_grams: item.amount
          }
        });

        await CalendarDayMealComp.bulkCreate(itemsData);
      }
    }
  }

  async clearCalendar(nutritionistId, patientId) {
    const nutritionistPatient = await nutritionistPatientController.getNutritionistPatientId(nutritionistId, patientId);

    await Calendar.destroy({
      where: {
        id_nutritionist_patient: nutritionistPatient.id
      }
    });
  }
}

const calendarController = new CalendarController();

export default calendarController;
