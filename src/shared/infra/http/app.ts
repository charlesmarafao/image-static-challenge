import '@shared/container';
import handleErrors from '@shared/infra/http/middlweares/handleErrors';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import { container } from 'tsyringe';
import swaggerDocs from '../../../swagger.json';
import ILogger from '../logger/interfaces/ILogger';
import routes from './routes';
const app = express();

const logger = container.resolve<ILogger>('logger');
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (logger.http) app.use(logger.http());
app.use(routes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(handleErrors);
app.use(errors());


export default app;
