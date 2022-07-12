import { Router } from 'express';
import getLastCommitID from '../utils/getLastCommitID';
import v1Router from './v1';
import v2Router from './v2';
import v3Router from './v3';

const routes = Router();

const lastCommitID = getLastCommitID();

[v1Router, v2Router, v3Router].forEach((router, i) => {
  i++;
  routes.use(`/api/v${i}`, router);

  routes.get(`/api/v${i}/healthcheck`, (r, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      timestamp: Date.now(),
      apiVersion: i,
      commitID: lastCommitID,
    };

    return res.status(200).json({ healthcheck });
  });
});

export default routes;
