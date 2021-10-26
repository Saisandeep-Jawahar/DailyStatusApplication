import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import mongoDBCon from './config/database'
import userRouter from './src/routes/user'
import storyRouter from './src/routes/story'
import dotenv from 'dotenv'
import cors from 'cors'
import { statusRouter } from './src/routes'
dotenv.config()

const app = express()

app.use(cors())
mongoDBCon()
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRouter)
app.use('/story', storyRouter)
app.use('/status',statusRouter)

// To see the server connection
app.get('/', (req, res, next) => {
    res.send('I am living!!')
    next()
})
app.listen(process.env.PORT_NO || 4001,() => {
    console.log( 'Server listening to port 4001')
})

export default app