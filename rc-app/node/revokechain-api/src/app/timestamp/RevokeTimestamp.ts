import crypto from 'crypto'
import { createRequestFile, signRequestFile, getTimestampFromResponse } from 'timestamp-trusted'
import { CertificateEntry } from '../valueObjects/CertificateEntry'

export class RevokeTimestamp {

    urlTimeStampAuthority: string = 'https://freetsa.org/tsr'
    
    async getTimestamp(entry: CertificateEntry): Promise<any> {
        const rawContent = JSON.stringify(entry)
        console.log(rawContent);

        const hashContent = crypto.createHash('sha256').update(rawContent).digest('hex')
        const pathRequestFile = await createRequestFile(hashContent)
        const pathResponseFile = await signRequestFile(pathRequestFile, this.urlTimeStampAuthority)
        const timestamp = await getTimestampFromResponse(pathResponseFile)
        return timestamp
    }

}