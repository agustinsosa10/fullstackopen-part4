const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((actual, blogs) => actual + blogs.likes, 0);
};

const favoriteBlog = (blogs) => {
  // console.log('desde list helper',blogs)
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((max, blogActual) => {
    // console.log('valor maximo actual:', max)
    // console.log('blog actual:', blogActual)
    return blogActual.likes > max.likes ? blogActual : max;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  //cuenta cuantas veces aparece cada autor en la lista de blogs
  const counts = _.countBy(blogs, "author");

  //entre todos los autores que aparecen en la lista de blog, se queda con el que tiene mas blogs
  const author = _.maxBy(
    Object.keys(counts), //al objeto counts (autores), se los transforma en clave
    (autor) => counts[autor] //aca se obtiene el valor de cada clave guardada en el objeto counts(osea cuantas veces aparece cada autor en la lista de blogs)
  );

  console.log("desde la funcion mostblogs", author);
  return author;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  //agrupa los autores con sus blogs 
  const grouped = _.groupBy(blogs, "author");

  //autor que contiene mas likes
  const author = _.maxBy(
    Object.keys(grouped), //al objeto counts (autores), se los transforma en clave
    (autor) => _.sumBy(grouped[autor], 'likes') //se suma la cantidad de likes de cada autor
  );
  
  return {
    author,
    likes: _.sumBy(grouped[author], 'likes')
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
