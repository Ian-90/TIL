const productController = require('../../controller/products')

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })
})
