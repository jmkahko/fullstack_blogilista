const Blog = require('../models/blog')
const initialBlogs = [
  {
    'title': 'PostMan testiblogi',
    'author': 'PostMan',
    'url': 'http://localhost:3003/api/blogs',
    'likes': 4,
  },
  {
    'title': 'PostMan testiblogi get one',
    'author': 'PostMan',
    'url': 'http://localhost:3003/api/blogs/:id',
    'likes': 4,
  }
]

const blogsInDataBase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDataBase
}