module.exports = (app) => {
  const domains = require("../controllers/domain.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", domains.create);

  // Retrieve all Tutorials
  router.get("/", domains.findAll);

  // Retrieve all published Tutorials
  router.get("/active", domains.findAllActives);

  // Retrieve a single Tutorial with id
  router.get("/:id", domains.findOne);

  // Update a Tutorial with id
  router.put("/:id", domains.update);

  // Delete a Tutorial with id
  router.delete("/:id", domains.delete);

  // Delete all Tutorials
  router.delete("/", domains.deleteAll);

  app.use("/api/domains", router);
};
