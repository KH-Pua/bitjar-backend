"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("referrals", [
      {
        referer_id: 0, // Gab refer KH
        referee_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        referer_id: 1, // Gab refer SQ
        referee_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        referer_id: 2, // KH refer Spencer
        referee_id: 4,
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
    await queryInterface.bulkDelete("referrals", null, {});
  },
};
