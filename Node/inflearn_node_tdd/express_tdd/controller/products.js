const productModel = require('../models/Product')

exports.createProduct = (req, res, next) => {
  productModel.create(req.body)
  res.status(201).send()
}
