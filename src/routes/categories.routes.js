const express = require("express");
const router = express.Router();

const categories = require("../controllers/category.controller");

router.post("/", categories.createCategory);
router.get("/", categories.findAllCategories);
router.get("/:id", categories.findCategory);
router.put("/:id", categories.updateCategory);
router.delete("/:id", categories.deleteCategory);
router.delete("/", categories.deleteAllCategories);

module.exports = router;
