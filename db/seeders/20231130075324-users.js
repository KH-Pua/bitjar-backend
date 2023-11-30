"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        wallet_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5",
        email: "gbrllim@gmail.com",
        user_name: "pichukaku",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referral_code: "000001",
        points: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0xe2A2BeAb22308383094613209F44eBf2dFE74AAD",
        email: "keehui.pua@gmail.com",
        user_name: "pichukaku",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referral_code: "000002",
        points: 888,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x4610C1231A1452186c1C9434eb1320400b4e5E2E",
        email: "thiashanquan93@gmail.com",
        user_name: "Mr SQ",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referral_code: "000003",
        points: 1,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
