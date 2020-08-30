module.exports = (sequelize, Sequelize, domainName) => {
  const DomainFiles = sequelize.define(domainName + "Files", {
    name: {
      type: Sequelize.STRING,
    },
    path: {
      type: Sequelize.STRING,
    },
  });

  return DomainFiles;
};
