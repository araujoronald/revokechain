import { app } from './app'
require('dotenv').config({ path: '.env' })

const start = async () => {

  console.log('Starting revokechain-api...')
  if (!process.env.NODE_PORT)
    throw new Error('Ops! Environment variable NODE_PORT must be defined.')

  const port = process.env.NODE_PORT
  app.listen(port, () => {
    console.log(`Yeah! listening on port ${port} ...`)
  })
}

start()
