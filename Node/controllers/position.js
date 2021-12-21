const Position = require("../models/Position");

module.exports.findOrCreate = async (position) => {
  return await Position.findOrCreate({
    where: { id: position.id ?? null },
    defaults: {
      coordinate_x: position.coordinate_x,
      coordinate_y: position.coordinate_y
    }
  });
}
