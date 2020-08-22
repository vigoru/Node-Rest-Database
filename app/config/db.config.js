module.exports = {
  HOST: "localhost",
  USER: "node_rest_db",
  PASSWORD: "N0d3_R3st_D4t4B4s3",
  DB: "react_cms",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};