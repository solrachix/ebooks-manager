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
    let ebooks

    if (!search) {
      ebooks = await db('ebooks')
        .join('albums', 'ebooks.albums_id', '=', 'albums.id')
        .join('authors', 'albums.author_id', '=', 'authors.id')
        .join('evaluations', 'evaluations.ebook_id', '=', 'ebooks.id')
        .select('ebooks.*',
          'albums.name AS albumName', 'albums.author_id',
          'authors.name AS authorName', 'authors.avatar AS authorAvatar'
        )
        .avg('evaluations.note as notes')
        .count('evaluations.note as numberOfEatings')
        .groupBy('evaluations.ebook_id')
    } else {
      ebooks = await db('ebooks')
        .join('albums', 'ebooks.albums_id', '=', 'albums.id')
        .join('authors', 'albums.author_id', '=', 'authors.id')
        .join('evaluations', 'evaluations.ebook_id', '=', 'ebooks.id')
        .where(function () {
          const [$, id] = String(search).split('@id ')

          if (id) {
            return this
              .where('ebooks.id', '=', String(id))
          } else {
            return this
              .orWhere('ebooks.title', 'like', `%${String(search)}%`)
              .orWhere('ebooks.description', 'like', `%${String(search)}%`)
          }
        })
        .select('ebooks.*',
          'albums.name AS albumName', 'albums.author_id',
          'authors.name AS authorName', 'authors.avatar AS authorAvatar'
        )
        .avg('evaluations.note as notes')
        .count('evaluations.note as numberOfEatings')
        .groupBy('evaluations.ebook_id')
    }

    /**
    * Processo de virtualização dos campos do banco.
    */
    const serializedMidia = []
    for (const key in ebooks) {
      if (Object.prototype.hasOwnProperty.call(ebooks, key)) {
        const ebook = ebooks[key]
        const notes = []
        for (let i = 1; i <= 5; i++) {
          if (i <= ebook.notes) {
            notes.push(true)
          } else {
            notes.push(false)
          }
        }

        const readingList = (await db('reading_list')
          .where('ebook_id', '=', String(ebook.id))
          .count('ebook_id as numberOfReaders')
          .select('*'))[0]

        // const lovedList = await db('loved_list')
        //   .join('ebooks', 'loved_list.ebook_id', '=', String(ebook.id))
        //   .count('* as numberOfLove')
        //   .select('*').then(() => )

        serializedMidia.push({
          ...ebook,
          numberOfReaders: Number(readingList.numberOfReaders).rankNumber(),
          notes,
          url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${ebook.url}`,
          thumbnail: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/thumbnail/${ebook.thumbnail}`
        })
      }
    }

    return res.json(serializedMidia)
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

    const trx = await db.transaction()

    try {
      const [id] = await trx('ebooks').insert({
        title,
        description,
        edition,
        numberOfPages: await getNumberOfPages(ebook.filename),

        albums_id: albumId,
        url: ebook.filename,
        thumbnail
      })

      // if (!id) return res.status(400).json({ error: 'Ebook registration failed' })

      const [idEvaluation] = await trx('evaluations').insert({
        user_id: userId,
        ebook_id: id,

        message: '',
        note: 5
      })

      await trx.commit()

      return res.status(201).json({ id })
    } catch (e) {
      await trx.rollback()

      return res.status(400).json({
        e,
        message: 'Ebook registration failed'
      })
    }
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
