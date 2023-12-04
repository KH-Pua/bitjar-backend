"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("transaction_products", [
      {
        user_id: 1, // Gab
        coin_id: 1, // wBTC
        product_id: 1,
        amount: "0.88886",
        from_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5", // Gab wallet
        to_address: "wBTC Vault",
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // Kee Hui
        coin_id: 1, // wBTC
        product_id: 1,
        amount: "1.2345",
        from_address: "0xe2A2BeAb22308383094613209F44eBf2dFE74AAD", // KH wallet
        to_address: "wBTC vault",
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // Shan Quan
        coin_id: 3, // wETH
        product_id: 3,
        amount: "0.23",
        from_address: "0x4610C1231A1452186c1C9434eb1320400b4e5E2E", // SQ wallet
        to_address: "wETH vault",
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4, // Spencer
        coin_id: 3, // wETH
        product_id: 3,
        amount: "39.81",
        from_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5", // Spencer wallet
        to_address: "wETH vault",
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
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
    await queryInterface.bulkDelete("transaction_products", null, {});
  },
};
