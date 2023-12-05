const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  routes = () => {
    router.get("/", this.userController.test);
    router.get("/userData/:address", this.userController.getUserData);
    // Points and referral leaderboard data
    router.get("/points/ranking", this.userController.getPointsLeaderboard);
    router.get(
      "/referrals/ranking",
      this.userController.getReferralLeaderboard
    );
    router.get("/referrals/:userId", this.userController.getReferralHistory);
    // Transaction Points
    router.get(
      "/transactions/points/:userId",
      this.userController.getTransactionPointsHistory
    );
    router.post(
      "/transactions/points/add/:userId",
      this.userController.addPoints
    );

    return router;
  };
}

module.exports = UserRouter;
