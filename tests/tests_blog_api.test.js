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

test('added new blog', async () => {
  const newBlog = {
    'title': 'PostMan Jest test',
    'author': 'Jest',
    'url': 'http://localhost:3003/api/blogs',
    'likes': 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper.blogsInDataBase()
  expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
})

test('check new blog likes is 0 or bigger. If likes is null added likes 0', async () => {
  const newBlog = {
    'title': 'PostMan Jest test',
    'author': 'Jest',
    'url': 'http://localhost:3003/api/blogs',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper.blogsInDataBase()
  expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
})

test('try added new bad blog, no author', async () => {
  const newBadBlog = {
    'title': 'PostMan Jest bad blog',
    'url': 'http://localhost:3003/api/blogs',
    'likes': '5'
  }

  await api
    .post('/api/blogs')
    .send(newBadBlog)
    .expect(400)

  const blogs = await testHelper.blogsInDataBase()
  expect(blogs).toHaveLength(testHelper.initialBlogs.length)
})

test('try added new bad blog, no title', async () => {
  const newBadBlog = {
    'author': 'Jest',
    'url': 'http://localhost:3003/api/blogs',
    'likes': 5
  }

  await api
    .post('/api/blogs')
    .send(newBadBlog)
    .expect(400)

  const blogs = await testHelper.blogsInDataBase()
  expect(blogs).toHaveLength(testHelper.initialBlogs.length)
})

test('try added new bad blog, no url', async () => {
  const newBadBlog = {
    'title': 'PostMan Jest test',
    'author': 'Jest',
    'likes': 5
  }

  await api
    .post('/api/blogs')
    .send(newBadBlog)
    .expect(400)

  const blogs = await testHelper.blogsInDataBase()
  expect(blogs).toHaveLength(testHelper.initialBlogs.length)
})

test('try delete blog', async () => {
  const allBlogsFirst = await testHelper.blogsInDataBase()
  const deleteFirstBlog = allBlogsFirst[0]

  await api
    .delete(`/api/blogs/${deleteFirstBlog.id}`)
    .expect(204)

  const allBlogsLast = await testHelper.blogsInDataBase()
  expect(allBlogsLast).toHaveLength(allBlogsFirst.length - 1)
})

test('update blog', async () => {
  const allBlogsFirst = await testHelper.blogsInDataBase()

  const updateBlog = {
    title: allBlogsFirst[0].title,
    author: allBlogsFirst[0].author,
    url: allBlogsFirst[0].url,
    likes: 9
  }

  await api
    .put(`/api/blogs/${allBlogsFirst[0].id}`)
    .send(updateBlog)
    .expect(201)

  const allBlogsLast = await testHelper.blogsInDataBase()
  expect(allBlogsLast[0].likes).toBe(9)
})

afterAll(async () => {
  await mongoose.connection.close()
})