import imageRouter from '@modules/image/v2/infra/http/routes/images.routes';
import { Router } from 'express';
const routes = Router();

routes.use('/images', imageRouter);

export default routes;
