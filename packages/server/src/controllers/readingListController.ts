import { Request, Response } from 'express'

import db from '../database/connection'

import moment from 'moment'

export default class LovedListController {
  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers

    const lovedList = await db('reading_list')
      .join('ebooks', 'reading_list.ebook_id', '=', 'ebooks.id')
      .where('user_id', String(userId))
      .select('*')

    if (!lovedList) return res.status(400).json({ message: 'you haven\'t started reading any books yet' })

    /**
    * Processo de virtualização dos campos do banco.
    */
    const serializedMidia = lovedList.map((ebook) => {
      return {
        ...ebook,
        url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${ebook.url}`,
        thumbnail: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/thumbnail/${ebook.thumbnail}`
      }
    })

    return res.json(serializedMidia)
  }

  async createOrUpdate (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers
    const { ebookId, percentage = '0/0', readingTime, completeBook = false } = req.body

    if (!ebookId) return res.status(400).json({ error: 'Pass the ebook id' })
    const date = moment().format('LLL')
    const Percentage = Math.floor((Number(percentage.split('/')[0]) * 100) / Number(percentage.split('/')[1]))
    console.log(userId, date, Percentage)

    const verify = await db('reading_list')
      .where('ebook_id', String(ebookId))
      .where('user_id', String(userId))
      .distinct()

    if (verify.length > 0) {
      await db('reading_list')
        .where('ebook_id', String(ebookId))
        .where('user_id', String(userId))
        .update(completeBook ? { completeBook } : {
          Percentage,
          lastAccess: date,
          readingTime
        })

      return res.status(201).json({ id: verify[0].id, date })
    }

    const [id] = await db('reading_list').insert({
      user_id: userId,
      ebook_id: ebookId,

      Percentage,
      lastAccess: date,
      readingTime
    })

    if (!id) return res.status(400).json({ error: 'Album registration failed' })

    return res.status(201).json({ id, date })
  }
}
