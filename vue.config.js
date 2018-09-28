module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://connect4vue.herokuapp.com/'
    : '/',
  outputDir: 'public'
}
