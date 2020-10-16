/* eslint-disable camelcase */

import { Request, Response } from 'express'

import db from '../database/connection'

import moment from 'moment'

interface Ebook {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  percentage: number;
  url: string;
  thumbnail: string;
  edition: number;
  author: string;
  albums_id: number;
  albumName: string;
}

interface ReadingBook {
  title: string;
  description: string;
  thumbnail: string;
  pagesAlreadyRead: string;
  percentage: number;
}

export default class StatisticsController {
  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers

    const lovedList: Ebook[] = await db('reading_list')
      .join('ebooks', 'reading_list.ebook_id', '=', 'ebooks.id')
      .join('albums', 'ebooks.albums_id', '=', 'albums.id')
      .where('user_id', String(userId))
      .select('reading_list.*', 'ebooks.*', 'albums.name AS albumName', 'albums.author')

    if (!lovedList) return res.status(400).json({ message: 'you haven\'t started reading any books yet' })

    const authors: string[] = []
    const readingBooks: ReadingBook[] = []
    const booksRead: string[] = []
    let numberOfPagesAlreadyRead = 0
    /**
    * Processo de virtualização dos campos do banco.
    */
    const serializedMidia = lovedList.map((ebook) => {
      !authors.includes(ebook.author) && authors.push(ebook.author)

      const numberOfPagesRead = Math.round(ebook.numberOfPages * (ebook.percentage / 100))

      ebook.percentage > 0 &&
      ebook.percentage < 100 &&
        readingBooks.push({
          title: ebook.title,
          description: ebook.description,
          thumbnail: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/thumbnail/${ebook.thumbnail}`,
          pagesAlreadyRead: `${numberOfPagesRead}/${ebook.numberOfPages}`,
          percentage: ebook.percentage
        })

      ebook.percentage === 100 && booksRead.push(ebook.title)

      numberOfPagesAlreadyRead += numberOfPagesRead

      return {
        ...ebook,
        url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${ebook.url}`,
        thumbnail: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/thumbnail/${ebook.thumbnail}`
      }
    })

    console.log(serializedMidia)
    return res.json({ authors, booksRead, readingBooks, numberOfPagesAlreadyRead })
  }
}
