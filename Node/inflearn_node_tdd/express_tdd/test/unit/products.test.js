const productController = require('../../controller/products')
const productModel = require('../../models/Product')

productModel.create = jest.fn()

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })

  it('should call ProductModel.create', () => {
    productController.createProduct()
    expect(productModel.create).toBeCalled()
  })
})
