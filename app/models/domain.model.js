module.exports = (sequelize, Sequelize) => {
  const Domain = sequelize.define("domains", {
    name: {
      type: Sequelize.STRING,
    },
    userID: {
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  });

  const User = require("./user.model")(sequelize, Sequelize);

  Domain.hasOne(User);

  return Domain;
};
