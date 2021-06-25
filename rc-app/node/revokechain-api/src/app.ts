import express from 'express'
// import cors from 'cors'
import { json } from 'body-parser'
import { routes } from './api/Routes'


const app = express()

// app.use(cors())
app.use(json())
app.use(routes)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }