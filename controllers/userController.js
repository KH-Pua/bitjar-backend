const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(userModel) {
    super(userModel);
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

  // getOneUser = async (req, res) => {
  //   const user = req.auth;
  //   try {
  //     const userData = await this.model.findByPk(user.userId);

  //     if (!userData) {
  //       return res.status(404).json({ success: false, msg: "User not found" });
  //     }
  //     return res.json({
  //       success: true,
  //       userData,
  //     });
  //   } catch (err) {
  //     return res.status(500).json({ success: false, msg: err.message });
  //   }
  // };
}

module.exports = UserController;
