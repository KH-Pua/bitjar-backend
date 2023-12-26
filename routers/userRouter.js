const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  routes = () => {
    router.get("/", this.userController.test);
    router.get("/userData/:address", this.userController.getUserData);

    //-----------Ranking Routes-----------//
    router.get("/points/ranking", this.userController.getPointsLeaderboard);
    router.get(
      "/referrals/ranking",
      this.userController.getReferralLeaderboard
    );
    router.get("/referrals/:address", this.userController.getReferralHistory);
    //-----------Transaction Routes-----------//

    router.post("/referrals/add", this.userController.checkAndRecordReferral);

    router.post(
      "/getInfoViaWalletAdd",
      this.userController.getInfoViaWalletAdd
    );

    router.post("/editInfo", this.userController.editInfo); // Why is this post not put?

    router.post(
      "/getUserRefererIfAny",
      this.userController.getUserRefererIfAny
    );

    //-----------Holdings Routes-----------//

    router.get("/holdings/:address", this.userController.getHoldings);

    // CoinMarketCap APIs - Documentation requires APIs to be called from Backend
    router.post("/getCoinLatestinfo", this.userController.getCoinLatestInfo);

    //-----------Notification Routes-----------//

    router.get("/notifications/:address", this.userController.getNotifications);

    router.put(
      "/notifications/read",
      this.userController.markNotificationAsRead
    );

    return router;
  };
}

module.exports = UserRouter;
