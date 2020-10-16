import { Request, Response } from 'express'

import db from '../database/connection'
import { getCover, getNumberOfPages } from './../models/book'

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string
};

export default class EbookController {
  async index (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      search = null
    } = req.query

    if (!search) {
      const ebooks = await db('ebooks').select('*')
      return res.json(ebooks)
    }

    const ebooks = await db('ebooks')
      .where('title', 'like', `%${String(search)}%`)
      .select('*')

    /**
    * Processo de virtualização dos campos do banco.
    */
    const serializedMidia = ebooks.map((ebook) => {
      return {
        ...ebook,
        url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${ebook.url}`,
        thumbnail: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/thumbnail/${ebook.thumbnail}`
      }
    })

    return res.json(serializedMidia)
  }

  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      email,
      password
    } = req.query

    const [ebook] = await db('ebooks')
      .select('*')
      .where('email', String(email))
      .distinct()

    if (!ebook) return res.status(400).json({ error: 'Ebook not found' })

    return res.json(ebook)
  }

  async create (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers
    const ebook = req.file as File
    const {
      albums_id: albumId,
      edition,
      description,
      title
    } = req.body

    const thumbnail = await getCover(ebook.filename)

    const verify = await db('ebooks')
      .where('title', String(title))
      .distinct()

    if (verify.length > 0) return res.status(400).json({ error: 'Ebook already exists' })

    const [id] = await db('ebooks').insert({
      title,
      description,
      edition,
      numberOfPages: await getNumberOfPages(ebook.filename),

      albums_id: albumId,
      url: ebook.filename,
      thumbnail
    })

    if (!id) return res.status(400).json({ error: 'Ebook registration failed' })

    return res.status(201).json({ id })
  }

  async update (req: Request, res: Response): Promise<Response<unknown>> {
    const ebookId = req.headers.ebookId
    let {
      title = null,
      description = null
    } = req.body

    const [ebook] = await db('ebooks')
      .select('*')
      .where('id', String(ebookId))
      .distinct()

    if (!ebook) return res.status(400).json({ error: 'Ebook not found' })
    if (!title) title = ebook.title
    if (!description) description = ebook.description

    await db('ebooks')
      .where('id', ebookId)
      .update({
        title,
        description
      })

    return res.status(201).send()
  }
}
