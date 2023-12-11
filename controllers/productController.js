const BaseController = require("./baseController");

const { OK, BAD_REQUEST, NOT_FOUND } = require("../constants/statusCodes");

class ProductController extends BaseController {
  constructor(productModel) {
    super(productModel);
  }

  // Get all product info
  getAllProductInfo = async (req, res) => {
    try {
      const output = await this.model.findAll();
      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res
        .status(NOT_FOUND)
        .json({ success: false, msg: "Product info not found" });
    }
  };
}

module.exports = ProductController;
