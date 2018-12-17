if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://Iyiola:Olanicmi2013@ds163410.mlab.com:63410/Bookstore',
    secretOrKey: 'secret'
  } // DB for production mlab (heroku deployment)
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/Bookstore',
    secretOrKey: 'secret'
  } // DB for local deployment
}