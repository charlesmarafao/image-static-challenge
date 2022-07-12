import ICryptoProvider from '../models/ICryptoProvider';

class FakeCryptoProvider implements ICryptoProvider {
  public encrypt(text: string) {
    return text;
  }

  public decrypt(text: string) {
    return text;
  }
}

export default FakeCryptoProvider;
