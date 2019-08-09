# KMS Decryption

A simple package that takes a path to a file that's been encrypted with KMS and returns the decrypted contents.

## Usage

```

npm install @pluralsight/kms-decrypt
// Set up your client info per the KmsClientInfo interface

const kmsValues: I.KmsClientInfo = {
  projectId:`name-of-your-gcp-project`,
  keyRingId:`name-of-your-keyring`,
  cryptoKeyId : `name-of-your-key`,
  location: `location`
}

// In an async function
import {Decrypt} from 'kms-decrypt'
const decryption = new Decrypt(kmsValues)
const encryptedFilePath = `/some/path/encryptedFilename.encrypted`
const testToken = await decryption.decryptToString(encryptedFilePath)
```

Decrypt.test has an integration test. You need to encrypt the testSecret.txt file with your credentials and put the testSecret.encrypted file in the src folder. Then create a file named `.clientConfig.ts like this:

```typescript
import * as I from './Interfaces'

export const kmsValues: I.KmsClientInfo = {
  projectId: `your-project-name`,
  keyRingId: `your-ring`,
  cryptoKeyId: `your-key`,
  location: `global`,
}
```

The location can be specific to what you set when you created your key credentials.

Here's the gcloud SDK command that will encrypt the file once you substitute in your key ring and key.  
`gcloud kms encrypt --location global --keyring <your-key-ring> --key <your-key> --plaintext-file testSecret.txt --ciphertext-file testSecret.encrypted`
