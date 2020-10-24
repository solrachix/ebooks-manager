/* eslint-disable camelcase */

import { Request, Response } from 'express'

import db from '../database/connection'

interface Assessments {
  id: number;
  name: string;
  avatar: string;

  message: string;
  note: number | boolean[];
};

interface Evaluations {
  id: number;
  notes: number | boolean[];
  numberOfEatings: number;
  assessments: Assessments[];
  ebook_id: number;
}

const TurnNotesIntoStars = (number: number) => {
  const notes = []
  for (let i = 1; i <= 5; i++) {
    if (i <= number) {
      notes.push(true)
    } else {
      notes.push(false)
    }
  }

  return notes
}
export default class EvaluationController {
  async show (req: Request, res: Response): Promise<Response<unknown>> {
    // const { userId } = req.headers
    const { ebookId } = req.query
    let evaluation: Evaluations | Evaluations[] | null

    const trx = await db.transaction()

    try {
      if (!ebookId) {
        const response: Evaluations[] = await trx<Evaluations[]>('evaluations')
          .join('ebooks', 'ebooks.id', '=', 'evaluations.ebook_id')
          .select('*')
          .avg('evaluations.note as notes')
          .count('evaluations.note as numberOfEatings')
          .groupBy('evaluations.ebook_id')
          .orderBy('notes', 'desc')

        for await (const res of response.map(async (ebook, index: number) => {
          ebook.assessments = await trx<Assessments[]>('evaluations')
            .join('users', 'users.id', '=', 'evaluations.user_id')
            .where('ebook_id', String(ebook.ebook_id))
            .select('users.name', 'users.avatar', 'users.id', 'message', 'note')

          ebook.notes = TurnNotesIntoStars(ebook.notes as number)

          ebook.assessments.map((assessment: Assessments, indexTwo: number) => {
            const individualNote = TurnNotesIntoStars(assessment.note as number)

            ebook.assessments[indexTwo] = {
              ...assessment,
              note: individualNote
            }
          })

          response[index] = ebook
        })) { evaluation = response }
      } else {
        const response: Evaluations = (await trx<Evaluations[]>('evaluations')
          .where('ebook_id', String(ebookId))
          .select('id')
          .avg('evaluations.note as notes')
          .count('evaluations.note as numberOfEatings'))[0]

        if (!response) return res.status(400).json({ message: 'you haven\'t favored anything yet' })

        response.notes = TurnNotesIntoStars(response.notes as number)

        response.assessments = await trx<Assessments[]>('evaluations')
          .join('users', 'users.id', '=', 'evaluations.user_id')
          .where('ebook_id', String(ebookId))
          .select('users.name', 'users.avatar', 'users.id', 'message', 'note')

        response.assessments.map((assessment: Assessments, index: number) => {
          const individualNote = TurnNotesIntoStars(assessment.note as number)

          response.assessments[index] = {
            ...assessment,
            note: individualNote
          }
        })

        evaluation = response
      }

      if (!evaluation) return res.status(400).json({ message: 'you haven\'t favored anything yet' })

      await trx.commit()

      return res.json(evaluation)
    } catch (error) {
      await trx.rollback()

      return res.status(400).json({ error })
    }
  }

  async createOrUpdate (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers
    const { ebookId, message, note } = req.body

    if (!ebookId || !note) return res.status(400).json({ error: 'Pass the ebook id and the note' })

    const verify = await db('evaluations')
      .where('ebook_id', String(ebookId))
      .andWhere('user_id', String(userId))
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
