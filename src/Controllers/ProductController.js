const ProductModel = require("../Models/ProductModel");

class ProductController {
  async store(req, res) {
    const { title, description, price } = req.body;

    const productAlreadyExists = await ProductModel.findOne({ title });

    if (productAlreadyExists) {
        return res
        .status(400)
        .json({ message: "This name already exists" });
    }

    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ message: "Title, description and price are required" });
    }

    const createdProduct = await ProductModel.create(req.body);
    return res.status(200).json(createdProduct);
  }

  async index(req, res) {
    const products = await ProductModel.find();
    return res.status(200).json(products);
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product does not exists" });
    } else {
      return res.status(200).json(product);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product does not exists" });
    } else {
      return res.status(200).json({ message: "Product updated" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exists" });
    } else {
      return res.status(200).json({ message: "Product deleted" });
    }
  }
}

module.exports = new ProductController();
