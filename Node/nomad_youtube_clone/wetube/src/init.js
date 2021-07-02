import "regenerator-runtime/runtime.js"
import 'dotenv/config'
import './db'
import './models/Video'
import './models/User'
import './models/Comment'
import app from './server'

const PORT = 4000

const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)
