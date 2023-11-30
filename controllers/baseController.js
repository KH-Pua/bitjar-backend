class BaseController {
  constructor(model) {
    this.model = model;
  }

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };

  test = (req, res) => {
    return res.send(
      `This is my awesome deployed new ${this.model.name} controller`
    );
  };

  getAll = async (req, res) => {
    const output = await this.model.findAll();
    return res.json({ success: true, data: output });
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const output = await this.model.findByPk(id);
    if (!output) {
      return res
        .status(404)
        .json({ success: false, msg: `${this.model.name} is not found` });
    }
    return res.json({ success: true, data: output });
  };

  editOne = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const output = await this.model.findByPk(id);

      if (!output) {
        return res
          .status(404)
          .json({ success: false, msg: `${this.model.name} is not found` });
      }

      const update = await output.update(updateData);

      return res.json({ success: true, update });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
      const output = await this.model.findByPk(id);
      if (!output) {
        return res.status(404).json({
          success: false,
          msg: `This ${this.model.name} was not found`,
        });
      }
      await output.destroy();
      return res.json({
        success: true,
        msg: `A new ${this.model.name} has been deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: `Unable to delete ${this.model.name}`,
        error: err,
      });
    }
  };
}

module.exports = BaseController;
