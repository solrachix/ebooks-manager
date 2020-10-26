import { Request, Response } from 'express'

import db from '../database/connection'

import { compareHash, generateHash, generateToken } from '../models/user'

export default class UserController {
  async index (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      search = null
    } = req.query

    if (!search) {
      const users = await db('users').select('*')
      return res.json(users)
    }

    const users = await db('users')
      .where('name', 'like', `%${String(search)}%`)
      .select('*')

    return res.json(users)
  }

  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      email,
      password
    } = req.query

    const [user] = await db('users')
      .select('*')
      .where('email', String(email))
      .distinct()

    if (!user) return res.status(400).json({ error: 'User not found' })

    const response = await compareHash(user.password, String(password))
    if (!response) return res.status(400).json({ error: 'Invalid password' })

    return res.json({
      user,
      token: generateToken(Number(user.id))
    })
  }

  async create (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      name,
      email,
      password
    } = req.body

    const verify = await db('users')
      .where('email', String(email))
      .distinct()

    if (verify.length > 0) return res.status(400).json({ error: 'User already exists' })

    const [id] = await db('users').insert({
      email,
      name,
      password: await generateHash(password),

      avatar: 'default.png'
    })

    if (!id) return res.status(400).json({ error: 'User registration failed' })

    return res.status(201).json({ id })
  }

  async update (req: Request, res: Response): Promise<Response<unknown>> {
    const userId = req.headers.userId
    let {
      name = null,
      email = null,
      password = null,
      avatar = null
    } = req.body

    const [user] = await db('users')
      .select('*')
      .where('id', String(userId))
      .distinct()

    if (!user) return res.status(400).json({ error: 'User not found' })
    if (!password) password = user.password
    if (!email) email = user.email
    if (!name) name = user.name
    if (!avatar) avatar = user.avatar

    await db('users')
      .where('id', userId)
      .update({
        name,
        email,
        password,
        avatar
      })

    return res.status(201).send()
  }

  async renewToken (req: Request, res: Response): Promise<Response<unknown>> {
    const userId = req.headers.userId

    return res.json({
      token: generateToken(Number(userId))
    })
  }
}
