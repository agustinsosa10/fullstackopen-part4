const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    return blogs.length === 0 ? 0 : blogs.reduce( (actual, blogs) => actual + blogs.likes, 0)
    
}

const favoriteBlog = (blogs) => {

    if ( blogs.length === 0) {return null}

    return blogs.reduce( (max, blogActual) => {
        console.log('valor maximo actual:', max)
        console.log('blog actual:', blogActual)
        return blogActual.likes > max.likes ? blogActual : max
    }, blogs[0])
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}