const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  category: {
    type: String,
  },
  isbn: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  description: {
    type: String
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  year: {
    type: Date,
    default: new Date().getFullYear()
  }
});




module.exports = Book = mongoose.model('books', BookSchema);