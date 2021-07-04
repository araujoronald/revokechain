import { Request, Response, Router } from 'express'
import { queryCert } from '../app/index'
import { addCert } from '../app/index'
import { RevokeTimestamp } from '../app/timestamp/RevokeTimestamp'
import { CertificateEntry } from '../app/valueObjects/CertificateEntry'

const router = Router()
const revokeTs = new RevokeTimestamp()

router.get('/api/revokechain/hello', (req: Request, res: Response) => {
  res.status(200).send([{ "message": "Hello, from revokechain-api!!!" }])
})

router.get('/api/revokechain/status/:ca/certificates/:serial', async (req: Request, res: Response) => {
  try {
    const key = `${req.params.ca}:${req.params.serial}`
    const result = await queryCert.execute(key)
    res.status(200).send([{ "revoked": result }])
    
  } catch (error) {
    res.status(500).send('error: ' + error.message)
  }
})

router.post('/api/revokechain/certificates', async (req: Request, res: Response) => {
  let entry: CertificateEntry
 
  try {
    entry = req.body
  } catch (error) {
    res.status(422).send('error: ' + error.message)
  }

  try {
    // recuperar o carimbo do tempo e devolver
    const timestamp = revokeTs.getTimestamp(entry)
    addCert.execute(entry)
    res.status(200).send([{ "timestamp": timestamp }])

  } catch (error) {
    res.status(500).send('error: ' + error.message)
  }
})

export { router as routes }