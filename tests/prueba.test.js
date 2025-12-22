const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const _ = require("lodash");

const emptyBlog = [];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 14,
    __v: 0,
  },
];

const singleBlog = [
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("una lista vacia es 0", () => {
    const result = listHelper.totalLikes(emptyBlog);
    assert.strictEqual(result, 0);
  });

  test("cuando una lista tiene un solo blog el total deben ser los likes de ese blog", () => {
    const result = listHelper.totalLikes(singleBlog);
    assert.strictEqual(result, singleBlog[0].likes);
  });

  test("el total de likes de la lista completa es calculado correctamente", () => {
    const result = listHelper.totalLikes(blogs);
    const total = blogs.reduce((acc, blog) => {
      return acc + blog.likes;
    }, 0);
    assert.strictEqual(result, total);
  });
});

describe("blog con mas me gustas", () => {
  test("una lista vacia no devuelve nada", () => {
    const result = listHelper.favoriteBlog(emptyBlog);
    assert.deepStrictEqual(result, null);
  });

  test("una lista con un solo blog, devuelve el mismo", () => {
    console.log(singleBlog);
    console.log(typeof singleBlog);
    const result = listHelper.favoriteBlog(singleBlog);
    console.log("desde test viendo el blog con una sola entrada ", result);

    assert.deepStrictEqual(result, singleBlog[0]);
  });

  test("de una lista se devuelve el blog con mas likes", () => {
    const result = listHelper.favoriteBlog(blogs);

    const blogWithMoreLikes = blogs.reduce((max, blog) => {
      return blog.likes > max.likes ? blog : max;
    }, blogs[0]);

    console.log("desde prueba 2");
    console.log("blog con mas likes", blogWithMoreLikes);

    assert.deepStrictEqual(result, blogWithMoreLikes);
  });
});

describe("autores con mas blogs", () => {
  test("una lista vacia no devuelve ningun autor", () => {
    const result = listHelper.mostBlogs(emptyBlog);
    assert.deepStrictEqual(result, null);
  });

  test("una lista con un solo blog devuelve el autor del mismo", () => {
    const { author } = singleBlog[0];
    console.log("desde test, el autor es:", author);
    const result = listHelper.mostBlogs(singleBlog);
    assert.strictEqual(result, author);
  });

  test("de la lista completa devuelve el autor con mas blog", () => {
    const counts = _.countBy(blogs, "author");

    //entre todos los autores que aparecen en la lista de blog, se queda con el que tiene mas blogs
    const author = _.maxBy(
      Object.keys(counts), //al objeto counts (autores), se los transforma en clave
      (autor) => counts[autor] //aca se obtiene el valor de cada clave guardada en el objeto counts(osea cuantas veces aparece cada autor en la lista de blogs)
    );

    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result, author);
  });
});

describe("autor con mas likes", () => {
  test("un lista vacia no devuelve nada", () => {
    const result = listHelper.mostLikes(emptyBlog);
    assert.strictEqual(result, null);
  });

  test("una lista con un solo blog devuelve los likes de ese blog y el nombre del autor", () => {
    const { author, likes } = singleBlog[0];
    const authorWithMoreLikes = { author, likes };
    console.log(authorWithMoreLikes);
    const result = listHelper.mostLikes(singleBlog);
    assert.deepStrictEqual(result, authorWithMoreLikes);
  });

  test("de una lista se devuelve el autor con mas likes y la cantidad de likes", () => {
    const grouped = _.groupBy(blogs, "author");

    //autor que contiene mas likes
    const author = _.maxBy(
      Object.keys(grouped), //al objeto counts (autores), se los transforma en clave
      (autor) => _.sumBy(grouped[autor], "likes") //se suma la cantidad de likes de cada autor
    );

    const likes = _.sumBy(grouped[author], "likes");

    const authorWithMoreLikes = { author, likes };
    console.log('autor con mas likes de una lista', authorWithMoreLikes)
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, authorWithMoreLikes);
  });
});
