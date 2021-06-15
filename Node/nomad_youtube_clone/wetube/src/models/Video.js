import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  title: { type: String, reuqired: true, trim: true, maxLength: 80 },
  description: { type: String, reuqired: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  }
})

videoSchema.static('formatHashtags', function(hashtags) {
  return hashtags.split(',').map(word => word.startsWith('#') ? word: `#${word}`)
})

const Video = mongoose.model("Video", videoSchema)

export default Video