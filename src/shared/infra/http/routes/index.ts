import express, { Router } from 'express';
import path from 'path';
import v1Router from './v1';
import v2Router from './v2';
import v3Router from './v3';

const routes = Router();

routes.use('/api/v1', v1Router);
routes.use('/api/v2', v2Router);
routes.use('/api/v3', v3Router);

export default routes;
