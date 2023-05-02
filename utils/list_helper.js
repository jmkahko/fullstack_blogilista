const dummy = (blogs) => {
  if (blogs.length > 1 || blogs.length === 0) {
    return 1
  } else {
    return blogs.length
  }
}

const totalLikes = (blogs) => {
  let sum = 0

  blogs.map(b => {
    sum += b.likes
  })

  return sum
}

const favoriteBlog = (blogs) => {
  let max = 0
  let maxBlog = {
    title: String,
    author: String,
    likes: Number
  }

  blogs.map(b => {
    if (b.likes > max) {
      max = b.likes
      maxBlog.title = b.title
      maxBlog.author = b.author
      maxBlog.likes = b.likes
    }
    return maxBlog
  })
  return maxBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}