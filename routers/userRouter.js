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

    // router.post(
    //   "/getUserDataViaReferralCode",
    //   this.userController.getUserDataViaReferralCode
    // );

    router.post("/editInfo", this.userController.editInfo);

    router.post(
      "/getUserRefererIfAny",
      this.userController.getUserRefererIfAny
    );

    //-----------Holdings Routes-----------//

    router.get("/holdings/:address", this.userController.getHoldings);

    // CoinMarketCap APIs - Documentation requires APIs to be called from Backend
    router.post("/getCoinLatestinfo", this.userController.getCoinLatestInfo);

    return router;
  };
}

module.exports = UserRouter;
