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
const decryption = new Decrypt(kmsValues)
const encryptedFilePath = `/some/path/encryptedFilename.encrypted`
const testToken = await decryption.decryptToString(encryptedFilePath)
```

app.test has an integration test. You need to encrypt the testSecret.txt file with your credentials and put the testSecret.encrypted file in the src folder. Then fill in your client credentials. Here's the gcloud SDK command that will encrypt the file once you substitute in your key ring and key.
`gcloud kms encrypt --location global --keyring <your-key-ring> --key <your-key> --plaintext-file testSecret.txt --ciphertext-file testSecret.encrypted`
