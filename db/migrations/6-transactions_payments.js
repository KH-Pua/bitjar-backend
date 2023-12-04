"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("transactions_payments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      coin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "coins",
          key: "id",
        },
      },
      payment_status: {
        type: Sequelize.STRING, // Accept different payment results
        allowNull: false,
      },
      fiat_amount_usd: {
        type: Sequelize.FLOAT,
        allowNull: true, // Allow for payment failure
      },
      coin_amount_purchased: {
        type: Sequelize.FLOAT,
        allowNull: true, // Allow for payment failure
      },
      from_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_hash: {
        type: Sequelize.STRING,
        allowNull: true, // Allow for payment failure
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("transactions_payments");
  },
};
