import { app } from './app'
import { natsWrapper } from './nats-wrapper'
require('dotenv').config({ path: '.env' })

const start = async () => {

  console.log('Starting revokechain-api...')

  if (!process.env.NODE_PORT)
    throw new Error('Ops! Environment variable NODE_PORT must be defined.')

  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('Ops! Environment variable NATS_CLUSTER_ID must be defined.')
  
  if (!process.env.NATS_CLIENT_ID)
    throw new Error('Ops! Environment variable NATS_CLIENT_ID must be defined.')

  if (!process.env.NATS_URL)
    throw new Error('Ops! Environment variable NATS_URL must be defined.')
  
  // try {
  //   await natsWrapper.connect(
  //     process.env.NATS_CLUSTER_ID,
  //     process.env.NATS_CLIENT_ID,
  //     process.env.NATS_URL
  //   )

  //   natsWrapper.client.on('close', () => {
  //     console.log('NATS connection closed.')
  //     process.exit()
  //   })

  //   // new FluxoAssinadoListener(natsWrapper.client).listen()
  //   // new FluxoRejeitadoListener(natsWrapper.client).listen()
  //   // new FluxoFinalizadoListener(natsWrapper.client).listen()
  //   // new FluxoEncerradoListener(natsWrapper.client).listen()
  //   // new FluxoCanceladoListener(natsWrapper.client).listen()
  //   // new FluxoIniciadoListener(natsWrapper.client).listen()

  //   process.on('SIGINT', () => natsWrapper.client.close())
  //   process.on('SIGTERM', () => natsWrapper.client.close())

  // } catch (error) {
  //   console.error(error)
  // }

  const port = process.env.NODE_PORT
  app.listen(port, () => {
    console.log(`Yeah! listening on port ${port} ...`)
  })
}

start()
