const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    return blogs.length === 0 ? 0 : blogs.reduce( (actual, blogs) => actual + blogs.likes, 0)
    
}

module.exports = {
    dummy, totalLikes
}