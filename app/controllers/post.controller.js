const db = require("../models");
const Op = db.Sequelize.Op;

const getPostDB = (domainID) => {
  db.posts.find((item) => {
    if (item.domainID === domainID) return item;
  });
};

// Create and Save a new post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const post = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    active: req.body.active,
    domainID: req.body.domainID,
  };

  const postDB = getPostDB(post.domainID);

  postDB
    .create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the post.",
      });
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const domainID = req.param.domainID;
  var condition = title ? { title: { [Op.like]: `%${name}%` } } : null;

  const postDB = getPostDB(domainID);

  postDB
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Find a single post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const domainID = req.param.domainID;
  const postDB = getPostDB(domainID);

  postDB
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving post with id=" + id,
      });
    });
};

// Update a post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const domainID = req.param.domainID;
  const postDB = getPostDB(domainID);

  postDB
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "postDB was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating post with id=" + id,
      });
    });
};

// Delete a post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const domainID = req.param.domainID;
  const postDB = getPostDB(domainID);

  postDB
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete postDB with id=${id}. Maybe post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete post with id=" + id,
      });
    });
};

// Delete all posts from the database.
exports.deleteAll = (req, res) => {
  const domainID = req.param.domainID;
  const postDB = getPostDB(domainID);

  postDB
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} postDBs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts.",
      });
    });
};
