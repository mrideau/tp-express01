const Category = require("../models/category.model");

const createCategory = (req, res) => {
  // Validation de la requete
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide",
    });
  }
  // Création du produit
  const product = new Category({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description || false,
  });
  // sauvegarde du produit dans la base de données
  Category.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "apparition d'erreurs lors de la création d'un produit",
      });
    else res.send(data);
  });
};

const findAllCategories = (req, res) => {
  const name = req.query.name;
  Category.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erreurs lors de la récupération des produits",
      });
    else res.send(data);
  });
};

const findCategory = (req, res) => {
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération du produit avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

const updateCategory = (req, res) => {
  // Validation de la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide!",
    });
  }
  console.log(req.body);
  Category.updateById(req.params.id, new Category(req.body), (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération du produit avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

const deleteCategory = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Impossible de supprimé le produit avec l'id " + req.params.id,
        });
      }
    } else res.send({ message: `Le produit a été supprimé avec succès!` });
  });
};

const deleteAllCategories = (req, res) => {
  exports.deleteAll = (req, res) => {
    Category.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Apparition d'erreurs lors de la suppression de tous les produits.",
        });
      else res.send({ message: `Tous les produits ont été supprimés!` });
    });
  };
};

module.exports = {
  createCategory,
  findAllCategories,
  findCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
