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
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogs = response.body.map((res) => res.title);

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  assert(blogs.includes("testeando prueba"));
});

test("los likes por defecto seran 0", async () => {
  const newBlog = {
    title: "testeando prueba",
    author: "chelo sosa",
    url: "http://test.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const likeOfBlogs = response.body.map((res) => res.likes);
  console.log(likeOfBlogs[2]);

  assert.strictEqual(likeOfBlogs[2], 0);
});

test("blog sin titulo o url no es agregado, status 400", async () => {
  const newBlog = {
    author: "chelo sosa",
    url: "http://test.com",
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
});

test('se elimina un determinado blog', async () => {

  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map( blogs => blogs.title)

  assert(!titles.includes(blogToDelete.title))
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('se actualiza una nota correctamente', async () => {

  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]
  console.log('blog a modificar: ', blogToUpdate)
  const updatedBlog = {
    title: 'test',
    author: "chelo sosa",
    url: "http://test.com",
    likes: 2,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  const updated = blogsAtEnd.find( blog => blog.id === blogToUpdate.id)
  console.log(updated)

  assert.strictEqual(updated.title, updatedBlog.title)
  assert.strictEqual(updated.author, updatedBlog.author)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close();
});
