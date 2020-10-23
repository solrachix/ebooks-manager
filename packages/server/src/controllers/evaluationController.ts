import { Request, Response } from 'express'

import db from '../database/connection'

export default class EvaluationController {
  async show (req: Request, res: Response): Promise<Response<unknown>> {
    // const { userId } = req.headers
    // const { ebookId } = req.query

    const evaluation = await db('evaluations')
      .join('ebooks', 'ebooks.id', '=', 'evaluations.ebook_id')
      // .where('ebook_id', String(ebookId))
      .select('*')
      .avg('evaluations.note as notes')
.count('evaluations.note as numberOfEatings')
      .groupBy('evaluations.ebook_id')
      .orderBy('notes', 'desc')

    if (!evaluation) return res.status(400).json({ message: 'you haven\'t favored anything yet' })

    return res.json(evaluation)
  }

  async createOrUpdate (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers
    const { ebookId, message, note } = req.body

    if (!ebookId || !note) return res.status(400).json({ error: 'Pass the ebook id and the note' })

    const verify = await db('evaluations')
      .where('ebook_id', String(ebookId))
      .where('user_id', String(userId))
      .distinct()

    if (verify.length > 0) {
      await db('evaluations')
        .where('ebook_id', String(ebookId))
        .where('user_id', String(userId))
        .update({
          message,
          note
        })

      return res.status(201).json({ id: verify[0].id })
    }

    const [id] = await db('evaluations').insert({
      user_id: userId,
      ebook_id: ebookId,

      message,
      note
    })

    if (!id) return res.status(400).json({ error: 'evaluation registration failed' })

    return res.status(201).json({ id })
  }
}
