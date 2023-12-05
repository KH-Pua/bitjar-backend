const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  routes = () => {
    router.get("/", this.userController.test);
    router.get("/all", this.userController.getPointsLeaderboard);
    // router.post("/newUser", this.verifyToken, this.userController.createOne);
    // router.put("/edit", this.verifyToken, this.userController.editOneUser);

    router.post(
      "/getUserPastTransactions",
      this.userController.getUserPastTransactions
    );

    return router;
  };
}

module.exports = UserRouter;
