const db = require("./db");
const Sequelize = require("sequelize");

const Facility = require("./facility");
const Member = require("./member");
const Booking = require("./booking");

// const syncAndSeed = () => {};

async function createMember(...newMember) {
  await Member.create({
    name: newMember,
  });
}

async function createFacility(...newFacility) {
  await Facility.create({
    name: newFacility,
  });
}

async function createBooking( ...newBooking) {
  await Booking.create({.name});
}

async function createSponsor(sponsorObj) {
  await Member[sponsorObj.membersSponsored]
}

async function syncAndSeed() {
  await Member.sync({ force: true });
  await Facility.sync({ force: true });
  await Booking.sync({ force: true });

  const data = {
    members: ["moe", "larry", "lucy", "ethyl"],
    facilities: ["tennis", "ping pong", "marbles"],
    lucySponsors: {sponsor: 'lucy', membersSponsored: ["moe", "larry"]},
    moeSponsors: {sponsor: 'moe', membersSponsored: ["ethyl"]},
    
  };

  await createMember(data.members);
  await createFacility(data.facilities);
  //   await createThing(data.things);
}

module.exports = { syncAndSeed };

//associations
Member.hasMany(Booking);
Booking.belongsTo(Member);

Facility.hasMany(Booking);
Booking.belongsTo(Facility);

Member.belongsTo(Member, {
  as: "id",
  foreignKey: "sponsorId",
  useJunctionTable: false,
});
