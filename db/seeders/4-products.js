"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("products", [
      {
        product_name: "wBTC AAVE",
        apr: 0.0116,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "USDC AAVE",
        apr: 0.0512,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: "wETH AAVE",
        apr: 0.0186,
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
