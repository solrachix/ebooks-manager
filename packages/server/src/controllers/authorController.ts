import { Request, Response } from 'express'

import db from '../database/connection'

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string
};

export default class AuthorController {
  async index (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      search = null
    } = req.query

    if (!search) {
      const authors = await db('authors').select('*')
      return res.json(authors)
    }

    const authors = await db('authors')
      .where('name', 'like', `%${String(search)}%`)
      .select('*')

    return res.json(authors)
  }

  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      authorID
    } = req.query

    const [author] = await db('authors')
      .select('*')
      .where('id', String(authorID))
      .distinct()

    if (!author) return res.status(400).json({ error: 'Author not found' })

    return res.json(author)
  }

  async create (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      name
    } = req.body
    const avatar = req.file as File

    const verify = await db('authors')
      .where('name', String(name))
      .distinct()

    if (verify.length > 0) return res.status(400).json({ error: 'Author already exists' })

    const [id] = await db('authors').insert({
      name,
      avatar: avatar.filename
    })

    if (!id) return res.status(400).json({ error: 'Author registration failed' })

    return res.status(201).json({ id })
  }

  async update (req: Request, res: Response): Promise<Response<unknown>> {
    const authorId = req.headers.authorId
    let {
      name = null
    } = req.body
    const avatar = req.file as File

    const [author] = await db('authors')
      .select('*')
      .where('id', String(authorId))
      .distinct()

    if (!author) return res.status(400).json({ error: 'Author not found' })
    if (!name) name = author.name

    await db('authors')
      .where('id', authorId)
      .update({
        name,
        avatar: avatar.filename
      })

    return res.status(201).send()
  }
}
