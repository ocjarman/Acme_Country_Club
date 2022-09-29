const Sequelize = require("sequelize");

const DB_URL =
  process.env.DB_URL || "postgres://localhost/acme-country-club-db";

const db = new Sequelize(DB_URL);

module.exports = db;
