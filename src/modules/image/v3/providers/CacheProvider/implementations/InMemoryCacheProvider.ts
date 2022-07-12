import AppError from '@shared/errors/AppError';
import ICacheProvider, { ExecuteOptions } from '../models/ICacheProvider';
export default class InMemoryCacheProvider implements ICacheProvider {
  cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  public save(key: string, value: Object, options: ExecuteOptions = {}): void {
    if (typeof key !== 'string')
      throw new AppError(`Key should be a string, got ${typeof key}`);

    if (options.TTL) {
      this.deleteWithDelay(key, options.TTL);
    }

    this.cache.set(key, value);
  }

  public recover<T>(key: string): T | null {
    const data = this.cache.get(key);

    if (!data) {
      return null;
    }

    return data;
  }

  public invalidate(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  private deleteWithDelay(key: string, delay: number) {
    setTimeout(() => this.invalidate(key), delay * 1000);
  }
}
