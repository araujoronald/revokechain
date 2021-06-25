import { Gateway, Wallets } from "fabric-network";
import * as path from "path"
import fs from 'fs';

export class QueryCertificate {
  channelName: string
  chaincodeName: string
  msp: string
  walletPath: string
  connectionPath: string
  userId: string

  constructor() {
    this.channelName = process.env.CHANNEL_NAME
    this.chaincodeName = process.env.CHAINCODE_NAME
    this.msp = process.env.MSP_NAME
    this.walletPath = process.env.WALLET_PATH
    this.connectionPath = process.env.CONNECTION_PATH
    this.userId = process.env.USER_ID
  }

  async execute(key: string): Promise<boolean> {

      // load the network configuration
      //const ccpPath = path.resolve(__dirname, '.', 'connection.json');
      // const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
      const ccp = JSON.parse(fs.readFileSync(this.connectionPath, 'utf8'));

      // Create a new file system based wallet for managing identities.
      const wallet = await Wallets.newFileSystemWallet(this.walletPath);
      console.log(`Wallet path: ${this.walletPath}`);

      // Check to see if we've already enrolled the admin user.
      const identity = await wallet.get(this.userId);
      if (!identity) {
          console.log('Admin identity can not be found in the wallet');
          return;
      }

      const gateway = new Gateway();
      await gateway.connect(ccp, { wallet, identity: this.userId, discovery: { enabled: true, asLocalhost: false } });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork(this.channelName);

      // Get the contract from the network.
      const contract = network.getContract(this.chaincodeName);

      // Submit the specified transaction.
      const randomId = Math.floor(Math.random()*500000);
      const result = await (await contract.submitTransaction('invoke', 'CertificateEntryExists', key)).toString();
      console.log('Transaction has been submitted');

      // Disconnect from the gateway.
      gateway.disconnect();
      
      return result == 'true'
  }
}
