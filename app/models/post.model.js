const domainFiles = require("./domainFiles.model");
const tag = require("./tag.model");
const link = require("./link.model");

module.exports = (sequelize, Sequelize, domainName) => {
  const Post = sequelize.define(domainName + "Post", {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
    domainID: {
      type: Sequelize.INTEGER,
    },
  });

  const Links = require("./link.model")(sequelize, Sequelize);
  const Tags = require("./tag.model")(sequelize, Sequelize);
  const Files = require("./domainFiles.model")(
    sequelize,
    Sequelize,
    domainName
  );

  Post.hasMany(Files);
  Post.hasMany(Tags);
  Post.hasMany(Links);
  return Post;
};
