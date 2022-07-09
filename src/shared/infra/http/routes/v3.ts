import imageRouter from '@modules/image/v3/infra/http/routes/images.routes';
import { Router } from 'express';
const routes = Router();

routes.use('/images', imageRouter);

export default routes;
