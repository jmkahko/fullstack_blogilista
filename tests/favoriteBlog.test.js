const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
      likes: 6,
      id: '644fc510396a8de39985f7cc',
      __v: 0
    },
    {
      title: 'PostMan test blog get one2',
      author: 'PostMan',
      url: 'http://localhost:3003/api/blogs/644fc510396a8de39985f7cc',
      likes: 4,
      id: '644fcbb0efcbee30b2c22144',
      __v: 0
    }
  ]

  test('when blog is favorite', () => {
    const result = listHelper.favoriteBlog(listWithManyBlog)
    expect(result).toEqual({ 'author': 'PostMan', 'likes': 6, 'title': 'PostMan test blog get one' })
  })
})