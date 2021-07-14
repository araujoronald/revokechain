import { Gateway, Wallets } from "fabric-network"
import fs from "fs"
import { CertificateEntry } from "../valueObjects/CertificateEntry"

export class QueryCertificate {
  channelName: string
  chaincodeName: string
  walletPath: string
  connectionPath: string
  userId: string

  constructor() {}

  async execute(key: string): Promise<CertificateEntry> {
    this.channelName = process.env.CHANNEL_NAME
    this.chaincodeName = process.env.CHAINCODE_NAME
    this.walletPath = process.env.WALLET_PATH
    this.connectionPath = process.env.CONNECTION_PATH
    this.userId = process.env.USER_ID

    // load the network configuration
    const ccp = JSON.parse(fs.readFileSync(this.connectionPath, "utf8"))

    // Create a new file system based wallet for managing identities.
    const wallet = await Wallets.newFileSystemWallet(this.walletPath)
    const list = await wallet.list()

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(this.userId)
    if (!identity) {
      console.log("Admin identity can not be found in the wallet")
      return
    }

    const gateway = new Gateway()
    await gateway.connect(ccp, {
      wallet,
      identity: this.userId,
      discovery: { enabled: true, asLocalhost: false },
    })

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(this.channelName)

    // Get the contract from the network.
    const contract = network.getContract(this.chaincodeName)

    // Submit the specified transaction
    const resultStr = (
      await contract.submitTransaction("ReadCertificateEntry", key)
    ).toString()
    console.log("resultStr", resultStr)

    // Disconnect from the gateway.
    gateway.disconnect()

    if (!resultStr) {
      throw new Error("Entrada não encontrada")
    }

    const entry: CertificateEntry = JSON.parse(resultStr)
    return entry
  }
}
