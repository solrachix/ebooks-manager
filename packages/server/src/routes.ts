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
 * default Controllers = index, show, create, update, delete
 */
import UserController from './controllers/userController'
const userController = new UserController()
routes.get('/user', userController.index)
routes.post('/user/create', userController.create)
routes.get('/user/authenticate', userController.show)

/**
 * Autenticação do Header Authorization em todas as rotas após essa!!
 */
import auth from './middlewares/auth'
routes.use(auth)

routes.post('/user/update', userController.update)

export default routes
