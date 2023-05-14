const supertest = require('supertest')
const mongoose = require('mongoose')
const testHelper = require('../utils/test_Helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.initialBlogs)
})

test('get all blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})