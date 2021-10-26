import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

var mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
//var mongoDB = "mongodb://127.0.0.1/DailyStatusApp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,  useFindAndModify: false })

const mongoDBCon = () => {
  var db = mongoose.connection

  db.on('open', () => {
    console.log('Connected successfully')
  })
  db.on('error', console.error.bind(console, 'Mongo connection Error'))
  db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected')
  })
}

export default mongoDBCon
