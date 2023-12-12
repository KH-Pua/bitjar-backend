const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(productController) {
    this.productController = productController;
  }

  routes = () => {
    router.get("/", this.productController.getAllProductInfo);

    return router;
  };
}

module.exports = ProductRouter;
