const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Import middlewares

// Import routers
const UserRouter = require("./routers/userRouter");
const TransactionRouter = require("./routers/transactionRouter");

// Import controllers
const UserController = require("./controllers/userController");
const TransactionPointController = require("./controllers/transactionPointController");

// Import db
const db = require("./db/models");
const {
  user,
  holding,
  coin,
  product,
  referral,
  transactionPayment,
  transactionProduct,
  transactionPoint,
  sequelize,
} = db;

// Initialize controllers
const userController = new UserController(
  user,
  referral,
  holding,
  transactionPayment,
  transactionPoint,
  transactionProduct,
  sequelize
);

const transactionPointController = new TransactionPointController(
  transactionPoint,
  user,
  sequelize
);

// Initialize routers
const userRouter = new UserRouter(userController);
const transactionRouter = new TransactionRouter(transactionPointController);

const app = express();

// Cors options setup
const allowedOrigins = [
  "https://bitjar.netlify.app",
  "http://localhost:3000", // Add localhost:3000 as an allowed origin
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

// Initializing middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter.routes());
app.use("/transactions", transactionRouter.routes());

app.listen(PORT, () => {
  console.log(`Bitjar app listening on port ${PORT}!`);
});
