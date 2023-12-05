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
    await queryInterface.createTable("transaction_points", {
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
      transaction_product_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "transaction_products",
          key: "id",
        },
      },
      transaction_payment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "transaction_payments",
          key: "id",
        },
      },
      reward_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rewards",
          key: "id",
        },
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
    await queryInterface.dropTable("transaction_points");
  },
};
