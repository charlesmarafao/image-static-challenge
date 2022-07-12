var getLastCommitId = require('last-commit');
import { Router } from 'express';
import v1Router from './v1';
import v2Router from './v2';
import v3Router from './v3';

const routes = Router();

var lastCommitId: string;
void (async function () {
  lastCommitId = await getLastCommitId();
})();

[v1Router, v2Router, v3Router].forEach((router, i) => {
  i++;
  routes.use(`/api/v${i}`, router);
  routes.get(`/api/v${i}/healthcheck`, (r, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      timestamp: Date.now(),
      apiVersion: i,
      lastCommitId,
    };

    return res.status(200).json({ healthcheck });
  });
});

export default routes;
