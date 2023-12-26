"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("transaction_points", [
      {
        user_id: 1,
        action_name: "Sign Up Bonus",
        points_allocated: 50,
        created_at: "2023-12-12T09:51:07.749Z",
        updated_at: "2023-12-12T09:51:07.749Z",
      },
      {
        user_id: 1,
        action_name: "Daily Login for 9 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-9T09:51:07.749Z",
        updated_at: "2023-12-9T09:51:07.749Z",
      },
      {
        user_id: 1,
        action_name: "Daily Login for 8 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-8T09:51:07.749Z",
        updated_at: "2023-12-8T09:51:07.749Z",
      },
      {
        user_id: 1,
        action_name: "Daily Login for 7 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-7T09:51:07.749Z",
        updated_at: "2023-12-7T09:51:07.749Z",
      },
      {
        user_id: 1,
        action_name: "Daily Login for 6 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-6T09:51:07.749Z",
        updated_at: "2023-12-6T09:51:07.749Z",
      },
      {
        user_id: 1,
        action_name: "Referred new user: 5E2E", //Shan Quan
        points_allocated: 10,
        created_at: "2023-12-13T10:51:07.749Z",
        updated_at: "2023-12-13T10:51:07.749Z",
      },
      {
        user_id: 1,
        transaction_payment_id: 1, // Purchased $100 worth of wBTC
        action_name: "Purchased wBTC via MoonPay",
        points_allocated: 10,
        created_at: "2023-12-14T10:00:07.749Z",
        updated_at: "2023-12-14T10:00:07.749Z",
      },
      {
        user_id: 1,
        transaction_product_id: 1, // Deposit $100 worth of wBTC
        action_name: "Deposited wBTC into AAVE",
        points_allocated: 10,
        created_at: "2023-12-14T10:01:07.749Z",
        updated_at: "2023-12-14T10:01:07.749Z",
      },
      {
        user_id: 2,
        action_name: "Sign Up Bonus",
        points_allocated: 50,
        created_at: "2023-12-12T09:51:07.749Z",
        updated_at: "2023-12-12T09:51:07.749Z",
      },
      {
        //10
        user_id: 2, // KH earned daily login points
        action_name: "Daily Login for 13 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-13T09:51:07.749Z",
        updated_at: "2023-12-13T09:51:07.749Z",
      },
      {
        user_id: 2, // KH earned daily login points again
        action_name: "Daily Login for 14 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 2,
        action_name: "Referred new user: A5f1", //Spencer
        points_allocated: 10,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 2,
        transaction_payment_id: 3, // Purchased $1000 worth of wBTC
        action_name: "Purchased wBTC via MoonPay",
        points_allocated: 100,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 2, // KH stake WBTC into Yield Vault
        transaction_product_id: 1,
        action_name: "Deposited wBTC into AAVE",
        points_allocated: 1000,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 2, // KH stake USDC into Yield Vault
        transaction_product_id: 2,
        action_name: "Deposited USDC into AAVE",
        points_allocated: 1000,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 2, // KH stake WETH into Yield Vault
        transaction_product_id: 3,
        action_name: "Deposited WETH into AAVE",
        points_allocated: 1000,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 3,
        action_name: "Sign Up Bonus",
        points_allocated: 50,
        created_at: "2023-12-12T09:51:07.749Z",
        updated_at: "2023-12-12T09:51:07.749Z",
      },
      {
        user_id: 3, // SQ earned daily login points
        action_name: "Daily Login for 13 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-13T09:51:07.749Z",
        updated_at: "2023-12-13T09:51:07.749Z",
      },
      {
        user_id: 3, // SQ earned daily login points again
        action_name: "Daily Login for 14 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        //20
        user_id: 3,
        transaction_payment_id: 5, // SQ purchased $500 wETH
        action_name: "Purchased wETH via MoonPay",
        points_allocated: 50,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 3,
        transaction_product_id: 3, // SQ stake $500 wETH
        action_name: "Deposited wETH into AAVE",
        points_allocated: 50,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 4,
        action_name: "Sign Up Bonus",
        points_allocated: 50,
        created_at: "2023-12-12T09:51:07.749Z",
        updated_at: "2023-12-12T09:51:07.749Z",
      },
      {
        user_id: 4,
        action_name: "Daily Login for 14 Dec 2023",
        points_allocated: 5,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 4, // Spencer purchased $88888 wETH
        transaction_payment_id: 6,
        action_name: "Purchased wETH via MoonPay",
        points_allocated: 8889,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
      {
        user_id: 4, // Spencer stake $88888
        transaction_product_id: 4,
        action_name: "Staked wETH via MoonPay",
        points_allocated: 8889,
        created_at: "2023-12-14T09:51:07.749Z",
        updated_at: "2023-12-14T09:51:07.749Z",
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("transaction_points", null, {});
  },
};
