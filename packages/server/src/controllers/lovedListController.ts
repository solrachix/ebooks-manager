import { Request, Response } from 'express'

import db from '../database/connection'

const Delete = async (req: Request, res: Response): Promise<Response<unknown>> => {
  const { userId } = req.headers
  const { ebookId } = req.body

  await db('loved_list').del().where('ebook_id', ebookId).where('user_id', userId)

  return res.status(201).send()
}

export default class LovedListController {
  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers

    const [lovedList] = await db('loved_list')
      .join('ebooks', 'loved_list.ebook_id', '=', 'ebooks.id')
      .where('user_id', String(userId))
      .select('*')

    if (!lovedList) return res.status(400).json({ message: 'you haven\'t favored anything yet' })

    return res.json(lovedList)
  }

  async create (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers
    const { ebookId } = req.body

    if (!ebookId) return res.status(400).json({ error: 'Pass the ebook id' })

    const verify = await db('loved_list')
      .where('ebook_id', String(ebookId))
      .where('user_id', String(userId))
      .distinct()

    if (verify.length > 0) return Delete(req, res)

    const [id] = await db('loved_list').insert({
      user_id: userId,
      ebook_id: ebookId
    })

    if (!id) return res.status(400).json({ error: 'Album registration failed' })

    return res.status(201).json({ id })
  }

  delete = Delete
}
