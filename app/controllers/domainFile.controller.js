const db = require("../models");
const Op = db.Sequelize.Op;

const getDomainDB = (domainID) => {
  db.domainFiles.find((item) => {
    if (item.domainID === domainID) return item;
  });
};

// Create and Save a new domainFileDB
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const domainFile = {
    name: req.body.name,
    path: req.body.path,
    domainID: req.body.domainID,
  };

  const domainFileDB = getDomainDB(domainFile.domainID);

  domainFileDB
    .create(domainFile)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the domainFile.",
      });
    });
};

// Retrieve all domainFiles from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const domainID = req.param.domainID;
  var condition = title ? { title: { [Op.like]: `%${name}%` } } : null;

  const domainFileDB = getDomainDB(domainID);

  domainFileDB
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving domainFiles.",
      });
    });
};

// Find a single domainFile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const domainID = req.param.domainID;
  const domainFileDB = getDomainDB(domainID);

  domainFileDB
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving domainFile with id=" + id,
      });
    });
};

// Update a domainFile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const domainID = req.param.domainID;
  const domainFileDB = getDomainDB(domainID);

  domainFileDB
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "domainFile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update domainFile with id=${id}. Maybe domainFileDB was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating domainFile with id=" + id,
      });
    });
};

// Delete a domainFileDB with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const domainID = req.param.domainID;
  const domainFileDB = getDomainDB(domainID);

  domainFileDB
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "domainFile was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete domainFile with id=${id}. Maybe domainFile was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete domainFile with id=" + id,
      });
    });
};

// Delete all domainFiles from the database.
exports.deleteAll = (req, res) => {
  const domainID = req.param.domainID;
  const domainFileDB = getDomainDB(domainID);

  domainFileDB
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} domainFiles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all domainFiles.",
      });
    });
};
