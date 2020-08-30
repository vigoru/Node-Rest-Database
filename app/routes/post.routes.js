module.exports = (app) => {
  const post = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // Create a new post
  router.post("/", post.create);

  // Retrieve all post
  router.get("/:domainID", post.findAll);

  // Retrieve a single post by id
  router.get("/:domainID/:id", post.findOne);

  // Update a post by id
  router.put("/:domainID/:id", post.update);

  // Delete a post by id
  router.delete("/:domainID/:id", post.delete);

  // Delete all post
  router.delete("/:domainID", post.deleteAll);

  app.use("/api/posts", router);
};
