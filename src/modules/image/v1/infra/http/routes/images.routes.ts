import ImageService from '@modules/image/v1/services/ImageService';
import express from 'express';
import { basename } from 'path';
import ImageController from '../controllers/ImageController';

const imageController = new ImageController();
const imageService = new ImageService();

const imageRouter = express.Router();
imageRouter.use('/', express.static(basename(imageService.baseDir)));

imageRouter.route('/links').get(imageController.index);

export default imageRouter;
