import { Router } from 'express';
import OfferController from '../../controllers/OfferController';

const offerController = new OfferController();

const offerRouter = Router();

offerRouter.route('/').get(offerController.index);
offerRouter.route('/').post(offerController.create);

export default offerRouter;
