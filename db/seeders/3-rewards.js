"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("rewards", [
      {
        action_name: "Reward: Daily log-in",
        points_allocated: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Purchased wBTC ",
        points_allocated: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Purchased USDC ",
        points_allocated: 500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Swapped crypto ",
        points_allocated: 300,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Referral used invite link",
        points_allocated: 2500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Referee invited a new user",
        points_allocated: 500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Staked crypto",
        points_allocated: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action_name: "Reward: Added to yield vault",
        points_allocated: 1000,
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
    await queryInterface.bulkDelete("rewards", null, {});
  },
};
