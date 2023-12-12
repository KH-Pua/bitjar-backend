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
          "https://firebasestorage.googleapis.com/v0/b/paired-up.appspot.com/o/wonderpal.png?alt=media&token=a0492748-80b4-4437-b3fd-ecd8dfcb38e0",
        referral_code: "000001",
        points: 8100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0xe2a2beab22308383094613209f44ebf2dfe74aad",
        email: "keehui.pua@gmail.com",
        user_name: "KH",
        profile_picture: "", // blank on purpose
        referral_code: "000002",
        points: 9170,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x2d60041eb25979d0017a1702f8e3b9759822b905",
        email: "thiashanquan93@gmail.com",
        user_name: "", // blank on purpose
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/bitjar-6753a.appspot.com/o/profilepic%2F0x4ac5e0c3a1114d47459a818c85348068745d7cd5?alt=media&token=b90aed9b-9acb-4ae5-a4bb-cb15202611ab",
        referral_code: "000003",
        points: 9160,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wallet_address: "0x3472Ccc4a932cc5c07740781286083048eb4A5f1",
        email: "spencer@gomu.co",
        user_name: "spenceryang",
        profile_picture:
          "https://pbs.twimg.com/profile_images/1532219869902430208/ptk7LviI_400x400.jpg",
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
          "https://i.seadn.io/gcs/files/f0d501cb75b56715e4f3e604765ebbe6.png?auto=format&dpr=1&w=1000",
        referral_code: "323323",
        points: 3210,
        created_at: "2023-12-07T09:00:00Z",
        updated_at: "2023-12-07T09:00:00Z",
      },
      {
        wallet_address: "0x8F6a113b19C5Fe27277A0c84b19fDC6550D3eA29",
        email: "sophie.brown@hotmail.com",
        user_name: "MonkeyBrown",
        profile_picture:
          "https://i.seadn.io/gcs/files/4d4b9b85237712acbc50bf17ec14c217.png?auto=format&dpr=1&w=1000",
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
          "https://i.seadn.io/s/raw/files/daccddc707c4817da36929037a5fc9a1.png?auto=format&dpr=1&w=1000",
        referral_code: "000005",
        points: 6543,
        created_at: "2023-12-09T09:00:00Z",
        updated_at: "2023-12-09T09:00:00Z",
      },
      {
        wallet_address: "0x1A4fDe78f8e3D3b1Fcb22C0a14AbdDA370F2eDA6",
        email: "ultra.laura@gmail.com",
        user_name: "DeGod777",
        profile_picture: "https://metadata.degods.com/g/4043-dead.png",
        referral_code: "000006",
        points: 2876,
        created_at: "2023-12-10T09:00:00Z",
        updated_at: "2023-12-10T09:00:00Z",
      },
      {
        wallet_address: "0x2A9e279cf8b982078DAfBcc20fEF419c4DBf2D63",
        email: "michael.king@binance.com",
        user_name: "Kingdusa",
        profile_picture: "https://metadata.degods.com/g/3250-dead.png",
        referral_code: "000007",
        points: 1098,
        created_at: "2023-12-11T09:00:00Z",
        updated_at: "2023-12-11T09:00:00Z",
      },
      {
        wallet_address: "0x3E24E9d6C6C82116bA5d23520D8616fD3f60B173",
        email: "beeple.hasmoneynow@web.com",
        user_name: "Beeple",
        profile_picture:
          "https://static.metav.rs/assets/uploads/2021/12/The-first-five-thousand-day-Beeple-metav.rs-NFT-715x715.png",
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
