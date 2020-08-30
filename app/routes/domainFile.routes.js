module.exports = (app) => {
  const domainFile = require("../controllers/domainFile.controller.js");

  var router = require("express").Router();

  // Create a new domainFile
  router.post("/", domainFile.create);

  // Retrieve all domainFile
  router.get("/:domainID", domainFile.findAll);

  // Retrieve a single domainFile by id
  router.get("/:domainID/:id", domainFile.findOne);

  // Update a domainFile by id
  router.put("/:domainID/:id", domainFile.update);

  // Delete a domainFile by id
  router.delete("/:domainID/:id", domainFile.delete);

  // Delete all domainFile
  router.delete("/:domainID", domainFile.deleteAll);

  app.use("/api/domainFile", router);
};
