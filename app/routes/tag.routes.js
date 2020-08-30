module.exports = (app) => {
  const tags = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new tag
  router.post("/", tags.create);

  // Retrieve all tags
  router.get("/", tags.findAll);

  // Retrieve a single tag by id
  router.get("/:id", tags.findOne);

  // Update a tag by id
  router.put("/:id", tags.update);

  // Delete a tag by id
  router.delete("/:id", tags.delete);

  // Delete all tags
  router.delete("/", tags.deleteAll);

  app.use("/api/tags", router);
};
