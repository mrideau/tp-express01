const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "http://localhost:8000",
};

const productRoutes = require("./routes/products.routes");
const categoryRoutes = require("./routes/categories.routes");

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
