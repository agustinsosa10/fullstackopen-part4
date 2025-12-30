const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)
//esta funcion es para que cada vez que hagamos una prueba la base de datos de prueba este igual en todos los casos (2 blogs)
beforeEach( async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('los blogs son devueltos en json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('devuelve la cantidad de notas correctas', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    
})

test('el identificador se llama id', async () => {
    
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
})


after(async () => {
    await mongoose.connection.close()
})



