module.exports = (app) => {
  const links = require("../controllers/link.controller.js");

  var router = require("express").Router();

  // Create a new link
  router.post("/", links.create);

  // Retrieve all links
  router.get("/", links.findAll);

  // Retrieve a single link by id
  router.get("/:id", links.findOne);

  // Update a link by id
  router.put("/:id", links.update);

  // Delete a link by id
  router.delete("/:id", links.delete);

  // Delete all links
  router.delete("/", links.deleteAll);

  app.use("/api/links", router);
};
