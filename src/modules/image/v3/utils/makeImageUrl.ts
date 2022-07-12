import appConfig from '@config/app';
import AppError from '@shared/errors/AppError';
const apiStaticPath = '/api/v3/images/static/';

const makeImageUrl = (path: string): string => {
  if(!path) throw new AppError('A path is required to make a url')
  return `${appConfig.host}${apiStaticPath}${path}`;
};

export default makeImageUrl;
