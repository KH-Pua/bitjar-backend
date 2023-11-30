const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  routes = () => {
    router.get("/", this.userController.test);
    // router.post("/newUser", this.verifyToken, this.userController.createOne);
    // router.put("/edit", this.verifyToken, this.userController.editOneUser);

    return router;
  };
}

module.exports = UserRouter;
