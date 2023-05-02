const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithZero = []

  const listWithOneBlog = [
    {
      title: 'PostMan test blog',
      author: 'PostMan',
      url: 'http://localhost:3003/api/blogs',
      likes: 4,
      _id: '644fc413efb7bda3b85df9d2',
      __v: 0
    }
  ]

  const listWithManyBlog = [
    {
      title: 'PostMan test blog',
      author: 'PostMan',
      url: 'http://localhost:3003/api/blogs',
      likes: 3,
      _id: '644fc413efb7bda3b85df9d2',
      __v: 0
    },
    {
      title: 'PostMan test blog get one',
      author: 'PostMan',
      url: 'http://localhost:3003/api/blogs/644fc413efb7bda3b85df9d2',
      likes: 4,
      id: '644fc510396a8de39985f7cc',
      __v: 0
    }
  ]

  test('when list has many blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithManyBlog)
    expect(result).toBe(7)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(4)
  })

  test('when list zero blog, list is empty', () => {
    const result = listHelper.totalLikes(listWithZero)
    expect(result).toBe(0)
  })
})