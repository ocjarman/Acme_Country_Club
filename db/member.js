const Sequelize = require("sequelize");
const db = require("./db");

const Member = db.define("member", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: "VARCHAR(20)",
    allowNull: false,
  },
});

module.exports = Member;
