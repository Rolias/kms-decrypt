import * as kms from '@google-cloud/kms'
import * as fs from 'fs'
import * as I from './Interfaces'

export {KmsClientInfo} from './Interfaces'
export class Decrypt {
  private kmsClientData: I.KmsClientInfo
  private kmsClient: kms.KeyManagementServiceClient

  public constructor(data: I.KmsClientInfo) {
    this.kmsClientData = data
    this.kmsClient = new kms.KeyManagementServiceClient()
  }

  public async decryptToString(encryptedFilePath: string): Promise<string> {
    const encryptedBuffer = fs.readFileSync(encryptedFilePath)
    // NOTE @google-cloud/kms from 1.3.1 to 1.5.3 made a breaking change (semver violation)
    // The kmsClient.decrypt()  function below now wants ciphertext to be a buffer not a string
    // const ciphertext = encryptedBuffer.toString(`base64`)
    const ciphertext = encryptedBuffer
    const name = this.kmsClient.cryptoKeyPath(
      this.kmsClientData.projectId,
      this.kmsClientData.location,
      this.kmsClientData.keyRingId,
      this.kmsClientData.cryptoKeyId
    )
    const [decryptedData] = await this.kmsClient.decrypt({name, ciphertext})
    const buffer = decryptedData.plaintext
    const result = buffer.toString()
    return result
  }
}
