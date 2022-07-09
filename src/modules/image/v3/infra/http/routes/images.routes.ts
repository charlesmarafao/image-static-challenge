import ImageService from '@modules/image/v3/services/ImageService';
import express from 'express';
import { basename } from 'path';
import ImageController from '../controllers/ImageController';

const imageController = new ImageController();
const imageService = new ImageService();

const imageRouter = express.Router();
imageRouter.use('/static/:encrypted', imageController.file);

imageRouter.route('/links').get(imageController.index);

export default imageRouter;
