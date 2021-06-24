import express from 'express'
// import cors from 'cors'
import { json } from 'body-parser'
// import { helloRoute } from './api/HelloRoute'


const app = express()

// app.use(cors())
app.use(json())
// app.use(helloRoute)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }