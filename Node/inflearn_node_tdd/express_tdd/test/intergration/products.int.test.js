const request = require('supertest')
const app = require('../../server')
const newProduct = require('../data/new-product.json')
let firstProduct
it('POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send(newProduct)

  expect(response.statusCode).toBe(201)
  expect(response.body.name).toBe(newProduct.name)
  expect(response.body.description).toBe(newProduct.description)
})

it('should return 500 on POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: 'phone' })

  expect(response.statusCode).toBe(500)
  expect(response.body).toStrictEqual({
    message: "Product validation failed: description: Path `description` is required."
  })
})

it('GET /api/products', async () => {
  const response = await request(app).get('/api/products')
  expect(response.statusCode).toBe(200)
  expect(Array.isArray(response.body)).toBeTruthy()
  expect(response.body[0]).toBeDefined()
  expect(response.body[0].description).toBeDefined()
  firstProduct = response.body[0]
})

it('GET /api/products/:productId', async () => {
  // 통합테스트는 실제 몽고DB를 통해서 이루어지기 때문에 실제 몽고DB를 넣거나 다이나믹하게 상단 통합테스트에서 가져오는걸 이용
  const response = await request(app).get(`/api/products/${firstProduct._id}`)
  expect(response.statusCode).toBe(200)
  expect(response.body.name).toBe(firstProduct.name)
  expect(response.body.description).toBe(firstProduct.description)
})
