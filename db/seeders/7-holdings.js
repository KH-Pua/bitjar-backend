"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("holdings", [
      {
        user_id: 1, // Gab
        coin_id: 1, // wBTC
        product_id: 1, // wBTC Vault
        amount: "0.88886",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // Kee Hui
        coin_id: 1, // wBTC
        product_id: 1, // wBTC Vault
        amount: "1.2345",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // Shan Quan
        coin_id: 2, // USDC
        product_id: 2, // USDC Vault
        amount: "50000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4, // Spencer
        coin_id: 2, // USDC
        product_id: 2, // USDC Vault
        amount: "100000",
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
    await queryInterface.bulkDelete("holdings", null, {});
  },
};
