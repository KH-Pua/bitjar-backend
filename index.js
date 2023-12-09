const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Import APY updater
const apyUpdateJob = require("./scripts/apyUpdater");

// Import middlewares

// Import routers
const UserRouter = require("./routers/userRouter");
const TransactionRouter = require("./routers/transactionRouter");

// Import controllers
const UserController = require("./controllers/userController");
const TransactionController = require("./controllers/transactionController");

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
  coin,
  product,
  sequelize
);

const transactionController = new TransactionController(
  transactionPoint,
  transactionPayment,
  transactionProduct,
  user,
  coin,
  product,
  holding,
  sequelize
);

// Initialize routers
const userRouter = new UserRouter(userController);
const transactionRouter = new TransactionRouter(transactionController);

const app = express();

// Call to update products table "apr" column
apyUpdateJob.start();

// Cors options setup
const allowedOrigins = [
  "https://bitjar.xyz",
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
  console.log(
    `Bitjar app listening on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
