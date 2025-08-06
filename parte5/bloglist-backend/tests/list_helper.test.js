const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { likes: 1 },
      { likes: 2 },
      { likes: 3 }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 6)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Autor 1',
      url: 'url1',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Autor 2',
      url: 'url2',
      likes: 10,
      __v: 0
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Autor 3',
      url: 'url3',
      likes: 7,
      __v: 0
    }
  ]

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('of a bigger list is returned right', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Blog 2',
      author: 'Autor 2',
      likes: 10
    })
  })
})

describe('most blogs', () => {
  const blogs = [
    { title: 'Blog 1', author: 'Autor 1', likes: 5 },
    { title: 'Blog 2', author: 'Autor 2', likes: 10 },
    { title: 'Blog 3', author: 'Autor 1', likes: 7 },
    { title: 'Blog 4', author: 'Autor 2', likes: 2 },
    { title: 'Blog 5', author: 'Autor 2', likes: 1 }
  ]

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('of a bigger list is returned right', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Autor 2',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  const blogs = [
    { title: 'Blog 1', author: 'Autor 1', likes: 5 },
    { title: 'Blog 2', author: 'Autor 2', likes: 10 },
    { title: 'Blog 3', author: 'Autor 1', likes: 7 },
    { title: 'Blog 4', author: 'Autor 2', likes: 2 },
    { title: 'Blog 5', author: 'Autor 2', likes: 1 }
  ]

  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('of a bigger list is returned right', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Autor 2',
      likes: 13
    })
  })
})