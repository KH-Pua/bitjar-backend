"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("products", [
      {
        product_name: "WBTC AAVE",
        apr: 0.0116,
        tvl: 447943423,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "USDC AAVE",
        apr: 0.0512,
        tvl: 45294037,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "WETH AAVE",
        apr: 0.0186,
        tvl: 206095007,
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
