import { AddCertificate } from "./useCases/AddCertificate";
import { QueryCertificate } from "./useCases/QueryCertificate";

const queryCert = new QueryCertificate()
const addCert = new AddCertificate()

export {
    queryCert,
    addCert
}

