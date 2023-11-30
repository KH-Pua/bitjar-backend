"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("transactions_points", [
      {
        user_id: 1, // Gab earned daily login points
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        reward_id: 5, // Gab refer Kee Hui
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        reward_id: 5, // Gab refer SQ
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        reward_id: 6, // Kee Hui refer Spencer (Gab earn points too)
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1, // Gab purchased wBTC
        transaction_payment_id: 1,
        reward_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1, // Gab stake wBTC into Yield Vault
        transaction_product_id: 1,
        reward_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // KH earned daily login points
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // KH earned daily login points again
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        reward_id: 5, // KH refer Spencer
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // KH purchased wBTC
        transaction_payment_id: 3,
        reward_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1, // KH stake wBTC into Yield Vault
        transaction_product_id: 2,
        reward_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // SQ earned daily login points
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // SQ earned daily login points again
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // SQ purchased USDC
        transaction_payment_id: 5,
        reward_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // SQ stake USDC into Yield Vault
        transaction_product_id: 3,
        reward_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4, // Spencer earned daily login points
        reward_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4, // Spencer purchased USDC
        transaction_payment_id: 6,
        reward_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4, // Spencer stake USDC into Yield Vault
        transaction_product_id: 4,
        reward_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
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
    await queryInterface.bulkDelete("transactions_points", null, {});
  },
};
