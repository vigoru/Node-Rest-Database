const db = require("../models");
const Domain = db.domains;
const Op = db.Sequelize.Op;

// Create and Save a new Domain
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const domain = {
    name: req.body.name,
    userID: req.body.userID,
    active: req.body.active ? req.body.active : false,
  };
  Domain.create(domain)
    .then((data) => {
      db.domainFiles = require("../models/domainFiles.model")(
        db.sequelize,
        db.Sequelize,
        data.name
      );
      db.posts = require("../models/post.model")(
        db.sequelize,
        db.Sequelize,
        data.name
      );
      db.sequelize.sync().then(() => {
        console.log("force sync after create a domain");
      });

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Domain.",
      });
    });
};

// Retrieve all Domains from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = title ? { title: { [Op.like]: `%${name}%` } } : null;

  Domain.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving domains.",
      });
    });
};

// Find a single Domain with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Domain.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Domain with id=" + id,
      });
    });
};

// Update a Domain by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Domain.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Domain was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Domain with id=${id}. Maybe Domain was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Domain with id=" + id,
      });
    });
};

// Delete a Domain with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Domain.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Domain was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Domain with id=${id}. Maybe Domain was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Domain with id=" + id,
      });
    });
};

// Delete all Domains from the database.
exports.deleteAll = (req, res) => {
  Domain.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Domains were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all domains.",
      });
    });
};

// Find all published Domains
exports.findAllActives = (req, res) => {
  Domain.findAll({ where: { active: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving domains.",
      });
    });
};
