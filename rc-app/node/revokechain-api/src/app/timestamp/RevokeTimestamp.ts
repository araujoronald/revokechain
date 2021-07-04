import crypto from 'crypto'
import timestamptrusted from 'timestamp-trusted'
import { CertificateEntry } from '../valueObjects/CertificateEntry'

export class RevokeTimestamp {

    urlTimeStampAuthority: string = 'https://freetsa.org/tsr'
    
    async getTimestamp(entry: CertificateEntry): Promise<any> {
        const rawContent = JSON.stringify(entry)
        const hashContent = crypto.createHash('sha256').update(rawContent).digest('hex')
        const pathRequestFile = await timestamptrusted.createRequestFile(hashContent)
        const pathResponseFile = await timestamptrusted.signRequestFile(pathRequestFile, this.urlTimeStampAuthority)
        const timestamp = await timestamptrusted.getTimestampFromResponse(pathResponseFile)
        return timestamp
    }

}