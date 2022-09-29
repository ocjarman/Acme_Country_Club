const db = require("./db");
const Sequelize = require("sequelize");

const Facility = db.define("facility", {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: "VARCHAR(20)",
    allowNull: false,
  },
});

module.exports = Facility;
