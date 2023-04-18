const sql = require("../mysql.service");

const Category = function (category) {
  this.name = category.name;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (id, result) => {
  sql.query(
    `SELECT *
         FROM categories
         WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Produit trouvé: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "Aucun produit ne correspond" }, null);
    }
  );
};

Category.getAll = (name, result) => {
  let query = "SELECT * FROM categories";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Produits: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [category.name, id],
    (err, res) => {
      if (err) {
        console.log("Erreur: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "Aucun produit ne correspond" }, null);
        return;
      }
      console.log("Produit modifié: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      // not found Product with the id
      result({ kind: "Aucun produit ne correspond" }, null);
      return;
    }
    console.log("Suppression du produit avec l'identifiant: ", id);
    result(null, res);
  });
};

Category.removeAll = (result) => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    console.log(`Suppression de ${res.affectedRows} produits`);
    result(null, res);
  });
};

module.exports = Category;
