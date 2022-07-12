import express from 'express';
import ImageController from '../controllers/ImageController';

const imageController = new ImageController();

const imageRouter = express.Router();
imageRouter.use('/static/:encrypted', imageController.file);

imageRouter.route('/links').get(imageController.index);

export default imageRouter;
