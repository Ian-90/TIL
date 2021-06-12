import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection

const handleError = (err) => console.log('DB Error', err)
const handleOpen = () => console.log('connected to DB')

db.on('error', handleError)
db.once('open', handleOpen)