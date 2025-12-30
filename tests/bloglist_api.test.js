const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const app = require("../app");
const assert = require("node:assert");

const api = supertest(app);
//esta funcion es para que cada vez que hagamos una prueba la base de datos de prueba este igual en todos los casos (2 blogs)
beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("los blogs son devueltos en json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("devuelve la cantidad de blogs correctos", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("el identificador se llama id", async () => {
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id);
});

test("un nuevo blog es agregado", async () => {
  const newBlog = {
    title: "testeando prueba",
    author: "chelo sosa",
    url: "http://test.com",
    likes: 25,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body.map ( res => res.title)
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(blogs.includes('testeando prueba'))
});

after(async () => {
  await mongoose.connection.close();
});
