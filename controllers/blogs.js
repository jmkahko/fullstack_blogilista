const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  blog.user = user.id

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  try {
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  if (token === undefined) {
    return response.status(401).json({ error: 'token needed' })
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (user === null) {
      return response.status(401).json({ error: 'user not found' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog === null) {
      return response.status(401).json({ error: 'blog not found' })
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)

      const blogList = user.blogs.filter(u => u.toString() !== request.params.id)
      user.blogs = blogList
      await user.save()

      response.status(204).end()
    } else {
      response.status(401).json({ error: 'wrong user' })
    }
  } catch (e) {
    logger.error('error ', e)
    response.status(500).json({ error: 'error contact support' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new : true })
  response.status(201).json(updateBlog)
})

module.exports = blogsRouter