module.exports = (sequelize, Sequelize) => {
  const Link = sequelize.define("links", {
    name: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
  });

  return Link;
};
