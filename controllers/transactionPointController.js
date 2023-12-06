const BaseController = require("./baseController");
const { Op } = require("sequelize");

const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../constants/statusCodes");
class TransactionPointController extends BaseController {
  constructor(transactionPointModel, userModel, sequelize) {
    super(transactionPointModel);
    this.userModel = userModel;
    this.sequelize = sequelize;
  }

  checkDailyPointsClaim = async (req, res) => {
    const { userId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    const result = await this.model.findOne({
      where: {
        userId,
        actionName: {
          [Op.startsWith]: "daily login", // Using Sequelize operator to find actionName starting with 'daily login'
        },
        createdAt: {
          [Op.gte]: today, // Using Sequelize operator for 'greater than or equal to' today's date
        },
      },
    });

    console.log(result);
    return res.status(CREATED).json({ success: true, result });
  };

  addPoints = async (req, res) => {
    const { userId } = req.params;
    const { actionName, pointsAllocated } = req.body;

    console.log("addpoints", userId, actionName, pointsAllocated);

    if (!userId || !actionName || !pointsAllocated) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }
    try {
      const output = await this.sequelize.transaction(async (t) => {
        const updatePointsTransactions = await this.model.create(
          {
            userId,
            actionName,
            pointsAllocated,
          },
          { transaction: t }
        );
        // Find user details within the same transaction
        const user = await this.userModel.findByPk(userId, { transaction: t });
        if (user) {
          // If the user exists, update the points by adding pointsAllocated
          const updatedPoints = user.points + pointsAllocated;
          // Update the user's points within the transaction
          await user.update({ points: updatedPoints }, { transaction: t });
        }
        return res
          .status(CREATED)
          .json({ success: true, message: "Points Added" });
      });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: error.message,
      });
    }
  };
}

module.exports = TransactionPointController;
