import appConfig from '@config/app';
import crypto from 'crypto';
import ICryptoProvider from '../models/ICryptoProvider';

var algorithm = 'aes-192-cbc';
var password = appConfig.encryption_key;
const key = crypto.scryptSync(password, 'salt', 24);
const iv = crypto.randomBytes(16);
class CryptoProvider implements ICryptoProvider {
  public encrypt(text: string) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text

    return encrypted;
  }

  public decrypt(text: string) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    var decrypted =
      decipher.update(text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
    return decrypted;
  }
}

export default CryptoProvider;
