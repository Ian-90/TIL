const productModel = require('../models/Product')

exports.createProduct = (req, res) => {
  productModel.create()
}
