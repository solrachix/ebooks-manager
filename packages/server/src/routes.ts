/* eslint-disable import/first */
import express from 'express'
import multer from 'multer'

const routes = express.Router()

import multerConfig from './config/multer'
const upload = multer(multerConfig)

/**
 * Rota /
 */
routes.get('/', (req, res) => {
  return res.json({
    app: 'Thóth',
    authors: [
      'Carlos Miguel'
    ],
    emails: 'carlos.miguel.oliveira.17@gmail.com'
  })
})

/**
 * Rota "user"/
 * default Controllers = index, show, create, update, delete, renewToken
 */
import UserController from './controllers/userController'
const userController = new UserController()
routes.get('/user', userController.index)
routes.post('/user/create', userController.create)
routes.get('/user/authenticate', userController.show)

/**
 * Autenticação do Header Authorization em todas as rotas após essa!!
 */

import auth from './middlewares/middleware'
routes.use(auth)

routes.post('/user/update', userController.update)
routes.post('/user/renewToken', userController.renewToken)

/**
 * Rota "album"/
 * default Controllers = index, show, create, update, delete
 */
import AlbumController from './controllers/albumController'
const albumController = new AlbumController()
routes.get('/album', albumController.index)
routes.post('/album/create', albumController.create)
routes.put('/album/update', albumController.update)

/**
 * Rota "ebook"/
 * default Controllers = index, show, create, update, delete
 */
import EbookController from './controllers/ebookController'
const ebookController = new EbookController()
routes.get('/ebook', ebookController.index)
routes.post(
  '/ebook/create',
  upload.single('ebook'),
  ebookController.create
)

/**
 * Rota "like"/
 * default Controllers = index, show, create, update, delete
 */
import LovedListController from './controllers/lovedListController'
const lovedListController = new LovedListController()
routes.get('/like', lovedListController.show)
routes.post('/like/create', lovedListController.create)
routes.delete('/like/delete', lovedListController.delete)

/**
 * Rota "reading list"/
 * default Controllers = show, createOrUpdate, delete
 */
import ReadingListController from './controllers/readingListController'
const readingListController = new ReadingListController()
routes.get('/readingList', readingListController.show)
routes.post('/readingList', readingListController.createOrUpdate)

/**
 * Rota "statistics"/
 * default Controllers = show
 */
import StatisticsController from './controllers/statisticsController'
const statisticsController = new StatisticsController()
routes.get('/statistics', statisticsController.show)

export default routes
