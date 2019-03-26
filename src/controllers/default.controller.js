export class DefaultController {

  constructor(model) {
    this.model = model;
  }

  async showRecord(req, res) {
    const record = await this.model.findById(req.params.id);

    return res.json(record);
  }

  async list(req, res) {
    const rows = await this.model.findAll();

    return res.json(rows);
  }

  async store(req, res) {
    const record = await this.model.create(req.body);

    return res.json(record);
  }

  async show(req, res) {
    return await this.showRecord(req, res);
  }

  async update(req, res) {
    await this.model.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    return await this.showRecord(req, res);
  }

  async destroy(req, res) {
    const recordToDelete = await this.showRecord(req, res);

    await this.model.destroy({
      where: {
        id: req.params.id
      }
    });

    return res.json(recordToDelete);
  }
}
