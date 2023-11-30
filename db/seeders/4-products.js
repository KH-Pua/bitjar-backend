"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("products", [
      {
        product_name: "wBTC Vault",
        apr: 0.025,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "USDC Vault",
        apr: 0.05,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "wBTC Yield",
        apr: 0.015,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "USDC Yield",
        apr: 0.075,
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
    await queryInterface.bulkDelete("products", null, {});
  },
};
