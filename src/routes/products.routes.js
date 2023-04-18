const express = require("express");
const router = express.Router();

const products = require("../controllers/products.controller");

router.post("/", products.createProduct);
router.get("/", products.findAllProduct);
router.get("/:id", products.findProduct);
router.put("/:id", products.updateProduct);
router.delete("/:id", products.deleteProduct);
router.delete("/", products.deleteAllProducts);

module.exports = router;
