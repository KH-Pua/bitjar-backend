"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        wallet_address: "0x4ac5e0c3a1114d47459a818c85348068745d7cd5",
        email: "gbrllim@gmail.com",
        user_name: "pichukaku",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/image%2Fdisplayphotos-00.png?alt=media&token=601bcde8-f58e-4fcb-aa80-13abdc74f2e9",
        referral_code: "000001",
        points: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0xe2A2BeAb22308383094613209F44eBf2dFE74AAD",
        email: "keehui.pua@gmail.com",
        user_name: "KH",
        profile_picture: "", // blank on purpose
        referral_code: "000002",
        points: 170,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x2d60041Eb25979D0017A1702f8E3b9759822b905",
        email: "thiashanquan93@gmail.com",
        user_name: "", // blank on purpose
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referral_code: "000003",
        points: 160,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1",
        email: "spencer@gomu.co",
        user_name: "spenceryang",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/githired-c0060.appspot.com/o/profile-images%2Fdisplayphotos-01.jpg?alt=media&token=aca70dc5-3623-4186-9408-97d2836801f7",
        referral_code: "000004",
        points: 17843,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x8bBc92b4B99B85a147309A4A50B40a50Cce28762",
        email: "adam.bitcoin@gmail.com",
        user_name: "AdamBitcoin",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/image%2Fdisplayphotos-00.png?alt=media&token=601bcde8-f58e-4fcb-aa80-13abdc74f2e9",
        referral_code: "323323",
        points: 3210,
        created_at: "2023-12-07T09:00:00Z",
        updated_at: "2023-12-07T09:00:00Z",
      },
      {
        wallet_address: "0x8F6a113b19C5Fe27277A0c84b19fDC6550D3eA29",
        email: "sophie.brown@hotmail.com",
        user_name: "SophieBrown",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/image%2Fmorty.png?alt=media&token=fc87c333-2ddb-480b-a2a5-a54418e2681b",
        referral_code: "111111",
        points: 8765,
        created_at: "2023-12-08T09:00:00Z",
        updated_at: "2023-12-08T09:00:00Z",
      },
      {
        wallet_address: "0x854BdbFbBd6Adf2034d0656d09A34E18784A7fFe",
        email: "alex.miller@outlook.com",
        user_name: "AlexMiller",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/image%2Fmorty.png?alt=media&token=fc87c333-2ddb-480b-a2a5-a54418e2681b",
        referral_code: "000005",
        points: 6543,
        created_at: "2023-12-09T09:00:00Z",
        updated_at: "2023-12-09T09:00:00Z",
      },
      {
        wallet_address: "0x1A4fDe78f8e3D3b1Fcb22C0a14AbdDA370F2eDA6",
        email: "ultra.laura@gmail.com",
        user_name: "Ultrasound",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/image%2Fdisplayphotos-02.jpg?alt=media&token=083cad9f-6795-4311-b882-48d535ce3589",
        referral_code: "000006",
        points: 2876,
        created_at: "2023-12-10T09:00:00Z",
        updated_at: "2023-12-10T09:00:00Z",
      },
      {
        wallet_address: "0x2A9e279cf8b982078DAfBcc20fEF419c4DBf2D63",
        email: "michael.king@binance.com",
        user_name: "KingKing",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/image%2Fdog.jpg?alt=media&token=a9c427b3-40f6-431d-badf-33270d08b29f",
        referral_code: "000007",
        points: 1098,
        created_at: "2023-12-11T09:00:00Z",
        updated_at: "2023-12-11T09:00:00Z",
      },
      {
        wallet_address: "0x3E24E9d6C6C82116bA5d23520D8616fD3f60B173",
        email: "olivia.moore@web.com",
        user_name: "Monkey2",
        referral_code: "000008",
        points: 4567,
        created_at: "2023-12-12T09:00:00Z",
        updated_at: "2023-12-12T09:00:00Z",
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
