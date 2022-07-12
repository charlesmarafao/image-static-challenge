import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  public cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public recover<T>(key: string): T | null {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public invalidate(key: string): boolean {
    return delete this.cache[key];
  }
}
