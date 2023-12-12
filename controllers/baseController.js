class BaseController {
  constructor(model) {
    this.model = model;
  }

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };

  test = (req, res) => {
    return res.send(
      `This is my super awesome deployed new ${this.model.name} controller`
    );
  };
}

module.exports = BaseController;
