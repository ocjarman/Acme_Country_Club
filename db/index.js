const db = require("./db");
const Sequelize = require("sequelize");

const Facility = require("./facility");
const Member = require("./member");
const Booking = require("./booking");

// async function createMember(...newMember) {}

// async function createFacility(...newFacility) {
//   await Facility.create({
//     name: newFacility,
//   });
// }

// async function createSponsor(sponsorObj) {
//   await .setSponsor(member2.id)
// }

async function syncAndSeed() {
  await Member.sync({ force: true });
  await Facility.sync({ force: true });
  await Booking.sync({ force: true });

  const data = {
    members: ["moe", "larry", "lucy", "ethyl"],
    facilities: ["tennis", "ping pong", "marbles"],
  };

  // await createMember(data.members);
  const memberPromises = data.members.map((memberName) =>
    Member.create({ name: memberName })
  );

  const [moe, larry, lucy, ethyl] = await Promise.all(memberPromises);

  const facilityPromises = data.facilities.map((facilityName) =>
    Facility.create({ name: facilityName })
  );

  const [tennis, pingpong, marbles] = await Promise.all(facilityPromises);

  // await createFacility(data.facilities);
  //   await createThing(data.things);

  ethyl.update({ sponsorId: moe.id });
  moe.update({ sponsorId: lucy.id });
  larry.update({ sponsorId: lucy.id });

  const lucyMarbles1 = Booking.create({
    bookerId: lucy.id,
    facilityId: marbles.id,
  });
  const lucyMarbles2 = Booking.create({
    bookerId: lucy.id,
    facilityId: marbles.id,
  });
  const moeTennis = Booking.create({
    bookerId: moe.id,
    facilityId: tennis.id,
  });
  // const lucyMarbles1 = Booking.create();
}

module.exports = { syncAndSeed };

//associations
Member.hasMany(Booking, { as: "booker" });
Booking.belongsTo(Member, { foreignKey: "bookerId" });

Facility.hasMany(Booking, { foreignKey: "bookingId" });
Booking.belongsTo(Facility);

Member.hasMany(Member, { as: "sponsees" });
// lucy sponsors moe and larry
// moe is a sponsee of lucy
//name  | foreignkey (sponsee)
//lucy | moes primary id
//   moe | lucy
// larry | lucy

Member.belongsTo(Member, {
  as: "sponsor",
  foreignKey: "sponsorId",
});

// moe sponsors ethyl
// ethyl belongs to moe
//name  | foreign
//ethyl | moes primary id

// member1.update({
//   sponsorId: member2.id,
// });

/**
 * username | Id  | sponsorId
 * Ben         1
 * Louis       2        1
 */
// Member.hasMany(Member, { as: "sponsees" });
// Member.belongsTo(Member, { as: "sponsor", foreignKey: "sponsorId" });
// // member1.setSponsor(member2);
// member1.update({
//     sponsorId: member2.id
// });

// await UserGroup.create({
//     userId: louis.id,
//     groupId: group1.id
// })

// await UserGroup.create({
//     userId: louis.id,
//     groupId: group2.id
// })

syncAndSeed();
