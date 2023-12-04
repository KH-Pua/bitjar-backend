"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("transaction_payments", [
      {
        user_id: 1, // Gab
        coin_id: 1, // wBTC
        payment_status: "Paid",
        fiat_amount_usd: "100.42",
        coin_amount_purchased: "0.00265",
        from_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1", // Spencer wallet
        to_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5", // Gab wallet
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1, // Gab
        coin_id: 1, // wBTC
        payment_status: "Failed",
        fiat_amount_usd: "300",
        from_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1", // Spencer wallet
        to_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5", // Gab wallet
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // Kee Hui
        coin_id: 1, // wBTC
        payment_status: "Paid",
        fiat_amount_usd: "1000",
        coin_amount_purchased: "0.02654",
        from_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1", // Spencer wallet
        to_address: "0xe2A2BeAb22308383094613209F44eBf2dFE74AAD", // KH wallet
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2, // Kee Hui
        coin_id: 1, // wBTC
        payment_status: "Payment Rejected",
        fiat_amount_usd: "1000",
        from_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1", // Spencer wallet
        to_address: "0xe2A2BeAb22308383094613209F44eBf2dFE74AAD", // KH wallet
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3, // Shan Quan
        coin_id: 3, // wETH
        payment_status: "Paid",
        fiat_amount_usd: "500",
        coin_amount_purchased: "0.23",
        from_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1", // Spencer wallet
        to_address: "0x4610C1231A1452186c1C9434eb1320400b4e5E2E", // SQ wallet
        transaction_hash:
          "0x3a4d8aa74bcd08e66fca6217166bccfeeef0e0f98ee35cb39eb2212a35c5f6a7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4, // Spencer
        coin_id: 3, // wETH
        payment_status: "Paid",
        fiat_amount_usd: "88888",
        coin_amount_purchased: "39.81",
        from_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5", // Spencer wallet
        to_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1", // Gab wallet
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
    await queryInterface.bulkDelete("transaction_payments", null, {});
  },
};
