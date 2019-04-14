import { Period } from '../../server/models';

class PeriodController {

  async getPeriodByCode(periodCode) {
    return await Period.findOne({
      where: {
        cd_period: periodCode
      }
    });
  }
}

const periodController = new PeriodController();

export default periodController;
