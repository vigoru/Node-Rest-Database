const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.POSTGRE.DB,
  dbConfig.POSTGRE.USER,
  dbConfig.POSTGRE.PASSWORD,
  {
    host: dbConfig.POSTGRE.HOST,
    dialect: dbConfig.POSTGRE.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.POSTGRE.pool.max,
      min: dbConfig.POSTGRE.pool.min,
      acquire: dbConfig.POSTGRE.pool.acquire,
      idle: dbConfig.POSTGRE.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.domains = require("./domain.model.js")(sequelize, Sequelize);
db.links = require("./link.model.js")(sequelize, Sequelize);
db.tags = require("./tag.model.js")(sequelize, Sequelize);
db.domainFiles = [];
db.posts = [];

module.exports = db;
