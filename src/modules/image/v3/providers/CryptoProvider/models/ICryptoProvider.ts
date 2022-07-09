export default interface ICryptoProvider {
  encrypt(payload: string): string;
  decrypt(payload: string): string;
}
