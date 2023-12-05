const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(
    userModel,
    referralModel,
    holdingModel,
    transactionPaymentModel,
    transactionPointModel,
    transactionProductModel
  ) {
    super(userModel);
    this.referralModel = referralModel;
    this.holdingModel = holdingModel;
    this.transactionPaymentModel = transactionPaymentModel;
    this.transactionPointModel = transactionPointModel;
    this.transactionProductModel = transactionProductModel;
  }

  // Create new user via the route /user/newUser
  createOne = async (req, res) => {
    const { email, firstName, lastName, profilePic } = req.body;
    //input validation

    if (!email || !firstName || !lastName) {
      return res
        .status(400)
        .json({ success: false, msg: "Please ensure all inputs are in" });
    }
    try {
      console.log("body:", req.body);
      const newUser = await this.model.create({
        email,
        firstName,
        lastName,
        profilePic,
      });
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email }, // Add userId and email to JWT body
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.json({ success: true, newUser, token });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  editOneUser = async (req, res) => {
    const user = req.auth;
    const updateData = req.body;

    try {
      const output = await this.model.findByPk(user.userId);

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

  // Get leaderboard for points sorted by number of points
  getPointsLeaderboard = async (req, res) => {
    let output = await this.model.findAll({
      include: { model: this.referralModel, as: "referer", attributes: ["id"] },
      order: [["points", "DESC"]],
      attributes: ["userName", "profilePicture", "points"],
    });

    // Count referrals and add it
    output = output.map((item) => {
      const referralCount = item.referer ? item.referer.length : 0;
      return {
        ...item.toJSON(),
        referralCount: referralCount,
      };
    });

    return res.json({ success: true, data: output });
  };

  getUserPastTransactions = async (req, res) => {
    const { userId } = req.body;
    try {
      // console.log(this.transactionProductModel);
      // console.log(userId);
      // let output = await this.transactionProductModel.findAll({
      //   where: { userId: userId },
      // });

      let user = await this.model.findByPk(userId);
      const output = await user.getTransactionProducts();

      return res.json({ success: true, data: output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };
}

module.exports = UserController;
