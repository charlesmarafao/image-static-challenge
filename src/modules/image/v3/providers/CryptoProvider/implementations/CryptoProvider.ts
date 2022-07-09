import appConfig from '@config/app';
import crypto from 'crypto';
import ICryptoProvider from '../models/ICryptoProvider';
const ENCRYPTION_KEY = appConfig.encryption_key; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'hex';
// const KEY = process.env.ENCRYPTION_KEY!;
var algorithm = 'aes-192-cbc'; //algorithm to use
var password = 'Hello darkness';
const key = crypto.scryptSync(password, 'salt', 24); //create key
const iv = crypto.randomBytes(16); // generate different ciphertext everytime

class CryptoProvider implements ICryptoProvider {
  public encrypt(text: string) {
    console.log(key, iv);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text

    return encrypted;
  }

  public decrypt(text: string) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    var decrypted =
      decipher.update(text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
    console.log('here', decrypted);
    return decrypted;
  }
}

export default CryptoProvider;
