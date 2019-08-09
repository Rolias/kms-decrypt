/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as chai from 'chai'
import * as path  from 'path'
// import * as I from './Interfaces'
import * as os from 'os'
import {kmsValues} from './.clientConfig'

chai.should()
import {Decrypt} from './Decrypt'
// const kmsValues: I.KmsClientInfo = {
//   projectId:`planning-staging-245215`,
//   keyRingId:`ip-processor-ring`,
//   cryptoKeyId : `ip-key`,
//   location: `global`
// }

const PATH_FROM_HOME = `dev/node/ENV_VARS/`
const GOOGLE_CREDENTIALS_FILE = `planning-staging-gcp.json`
const ENCRYPTED_TEST_FILE = `testSecret.encrypted`

describe(`INTEGRATION TEST: Decrypt Module should `, () => {
  before(() => {
    const gcloudPath = path.join(os.homedir(), PATH_FROM_HOME, GOOGLE_CREDENTIALS_FILE)
    // eslint-disable-next-line id-length
    process.env.GOOGLE_APPLICATION_CREDENTIALS = gcloudPath
  })

  it(`decrypt test file`, async () => {
    const decryption = new Decrypt(kmsValues)
    const encryptedFilePath = path.resolve(__dirname, `./${ENCRYPTED_TEST_FILE}`)
    const testToken = await decryption.decryptToString(encryptedFilePath)
    testToken.should.equal(`This is my secret in plaintext.`)
  })
})