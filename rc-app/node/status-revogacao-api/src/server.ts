import { app } from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  console.log('Iniciando Serviço gerenciador-api...')

  if (!process.env.NODE_PORT) {
    throw new Error('Variável de ambiente NODE_PORT precisa ser definida.')
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error(
      'Variável de ambiente NATS_CLUSTER_ID precisa ser definida.'
    )
  }

  if (!process.env.NATS_CLIENT_ID_GERENCIADOR) {
    throw new Error(
      'Variável de ambiente NATS_CLIENT_ID_GERENCIADOR precisa ser definida.'
    )
  }

  if (!process.env.NATS_URL) {
    throw new Error('Variável de ambiente NATS_URL precisa ser definida.')
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID_GERENCIADOR,
      process.env.NATS_URL
    )

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed.')
      process.exit()
    })

    // new FluxoAssinadoListener(natsWrapper.client).listen()
    // new FluxoRejeitadoListener(natsWrapper.client).listen()
    // new FluxoFinalizadoListener(natsWrapper.client).listen()
    // new FluxoEncerradoListener(natsWrapper.client).listen()
    // new FluxoCanceladoListener(natsWrapper.client).listen()
    // new FluxoIniciadoListener(natsWrapper.client).listen()

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())
  } catch (error) {
    console.error(error)
  }

  const port = process.env.NODE_PORT
  app.listen(port, () => {
    console.log(`Ouvindo na porta ${port} ...`)
  })
}

start()
