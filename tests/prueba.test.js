const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const emptyBlog = []
    const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 14,
    __v: 0
  } 
]

const singleBlog = [ 
      {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  } 
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {

test('una lista vacia es 0', () => {

    const result = listHelper.totalLikes(emptyBlog)
    assert.strictEqual(result, 0)
})

test('cuando una lista tiene un solo blog el total deben ser los likes de ese blog', () => {
    const result = listHelper.totalLikes(singleBlog)
    assert.strictEqual(result, singleBlog[0].likes)
})

test('el total de likes de la lista completa es calculado correctamente', () => {
    const result = listHelper.totalLikes(blogs)
    const total = blogs.reduce( (acc, blog) =>  { return acc + blog.likes}, 0)
    assert.strictEqual(result, total)
})

})

describe ('blog con mas me gustas', () => {
    
  test('una lista vacia no devuelve nada', () => {
    const result = listHelper.favoriteBlog(emptyBlog)
    assert.deepStrictEqual(result, null)
  })

  test('una lista con un solo blog, devuelve el mismo', () => {
    const result = listHelper.favoriteBlog(singleBlog)
    
    assert.deepStrictEqual(result, singleBlog([0]))
  })

  test('de una lista se devuelve el blog con mas likes', () => {

    const result = listHelper.favoriteBlog(blogs)

    const blogWithMoreLikes = blogs.reduce((max, blog) => {
      return blog.likes > max.likes ? blog : max
    }, blogs[0])

    console.log('desde prueba 2')
    console.log('blog con mas likes',blogWithMoreLikes)

    assert.deepStrictEqual(result, blogWithMoreLikes)
  })
})