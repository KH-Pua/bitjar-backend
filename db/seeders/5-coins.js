"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("coins", [
      {
        coin_symbol: "WBTC",
        coin_name: "Wrapped Bitcoin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        coin_symbol: "USDC",
        coin_name: "USDC",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        coin_symbol: "WETH",
        coin_name: "Wrapped Ethereum",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        coin_symbol: "ETH",
        coin_name: "Ethereum",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        coin_symbol: "sepoliaWBTC",
        coin_name: "Sepolia WBTC",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        coin_symbol: "sepoliaWETH",
        coin_name: "Sepolia WETH",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        coin_symbol: "sepoliaUSDC",
        coin_name: "Sepolia USDC",
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
    await queryInterface.bulkDelete("coins", null, {});
  },
};
