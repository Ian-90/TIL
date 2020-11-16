const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: ObjectId } = Schema

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// _id 작성자 댓글내용 생성일

module.exports = mongoose.model('Comment', commentSchema)
