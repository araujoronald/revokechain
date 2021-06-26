import { Request, Response, Router } from 'express'
import { QueryCertificate } from '../app/useCases/QueryCertificate'

const router = Router()

router.get('/api/revokechain/hello', (req: Request, res: Response) => {
  res.status(200).send([{ "message": "Hello, from revokechain-api!!!" }])
})

router.get('/api/revokechain/status/:ca/certificates/:serial', async (req: Request, res: Response) => {
  const key = `${req.params.ca}:${req.params.serial}`
  const query = new QueryCertificate()
  const result = await query.execute(key)
  res.status(200).send([{ "revoked": result }])
})

router.post('/api/revokechain/certificates', (req: Request, res: Response) => {
  //return criarGrupoRequisitanteController.execute(req, res)
})

export { router as routes }