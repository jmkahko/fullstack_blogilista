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

module.exports = {
  dummy,
  totalLikes
}