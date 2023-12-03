const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes

app.get("/", (req, res) => {
  res.send("Hello This is Muhammad Amir Abdurrozaq API");
});

app.get("/blog", (req, res) => {
  res.send("This is in blog");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create Product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messages: error.message });
  }
});

//delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "cammot find any product with ID ${id}" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ messages: error.message });
  }
});

//update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if (!product) {
      return res
        .status(404)
        .json({ message: "cannot find any product with ID ${id}" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@amirapi.cuv8mkg.mongodb.net/AmirShopApi?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");

    app.listen(3000, () => {
      console.log("node api app is run");
    });
  })
  .catch((error) => {
    console.log(error);
  });
