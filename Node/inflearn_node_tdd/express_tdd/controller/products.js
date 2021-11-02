const productModel = require('../models/Product')

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body)
    res.status(201).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

exports.getProducts = async (req, res, next) => {
  const allProducts = await productModel.find({})
  res.status(200).json(allProducts)
}
