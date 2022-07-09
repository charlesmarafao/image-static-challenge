import AppError from '@shared/errors/AppError';
import ILogger from '@shared/infra/logger/interfaces/ILogger';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
interface image {
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  available: boolean;
}

interface IRequest {
  image: image[];
  hotel_id: any;
}

@injectable()
export default class ImageService {
  constructor() {}

  public get baseDir(): string {
    return 'files';
  }
}
