const dummy = (blogs) => {
  if (blogs.length > 1 || blogs.length === 0) {
    return 1
  } else {
    return blogs.length
  }
}

module.exports = {
  dummy
}