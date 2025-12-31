const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Primer blog',
    author: 'Agustin',
    url: 'http://example.com',
    likes: 5,
  },
  {
    title: 'Segundo blog',
    author: 'Chelo',
    url: 'http://example.com/2',
    likes: 10,
  }
]

const blogsInDb = async () => {

  const blogs = await Blog.find({})
  return blogs.map (blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
