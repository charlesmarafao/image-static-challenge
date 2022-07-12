export interface ExecuteOptions {
  TTL?: number;
}

export default interface ICacheProvider {
  save(key: string, value: Object, options: ExecuteOptions): void;
  recover<T>(key: string): T | null;
  invalidate(key: string): boolean;
}
