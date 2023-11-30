"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        wallet_address: "0x4ac5E0c3a1114D47459A818C85348068745d7CD5",
        email: "gbrllim@gmail.com",
        userName: "pichukaku",
        profile_pic:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referralCode: "000001",
        points: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "KeeHuiWalletAddresss",
        email: "keehui.pua@gmail.com",
        userName: "pichukaku",
        profile_pic:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referralCode: "000002",
        points: 888,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x4610C1231A1452186c1C9434eb1320400b4e5E2E",
        email: "thiashanquan93@gmail.com",
        userName: "Mr SQ",
        profile_pic:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referralCode: "000003",
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
