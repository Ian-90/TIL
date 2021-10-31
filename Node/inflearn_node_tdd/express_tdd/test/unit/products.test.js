const productController = require('../../controller/products')
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')
productModel.create = jest.fn()

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })

  it('should call ProductModel.create', () => {
    let req = httpMocks.createRequest()
    let res = httpMocks.createResponse()
    let next = null
    req.body = newProduct
    productController.createProduct(req, res, next)
    expect(productModel.create).toBeCalledWith(newProduct)
  })
})
