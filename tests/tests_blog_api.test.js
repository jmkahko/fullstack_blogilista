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

test('check blogs id if not _id', async () => {
  const response = await api.get('/api/blogs')
  const responseList = response.body
  responseList.map(res => expect(res.id).toBeDefined())
})

afterAll(async () => {
  await mongoose.connection.close()
})