import appConfig from '@config/app';
import crypto from 'crypto';
import ICryptoProvider from '../models/ICryptoProvider';

var algorithm = 'aes-192-cbc';
var password = appConfig.encryption_key;
const key = crypto.scryptSync(password, 'salt', 24);
const iv = crypto.randomBytes(16);

class CryptoProvider implements ICryptoProvider {
  public encrypt(payload: string) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(payload, 'utf8', 'hex') + cipher.final('hex'); // encrypted payload

    return encrypted;
  }

  public decrypt(payload: string) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    var decrypted =
      decipher.update(payload, 'hex', 'utf8') + decipher.final('utf8'); //deciphered payload
    return decrypted;
  }
}

export default CryptoProvider;
