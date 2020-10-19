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
  author_id: number;
  authorName: string;
  authorAvatar: string;
}

interface ReadingBook {
  title: string;
  description: string;
  thumbnail: string;
  pagesAlreadyRead: string;
  percentage: number;
}

interface Author {
  id: number;
  name: string;
  avatar: string;
}
export default class StatisticsController {
  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const { userId } = req.headers

    // const author = await db('ebooks')
    //   .join('albums', 'ebooks.albums_id', '=', 'albums.id')
    //   .join('authors', 'albums.author_id', '=', 'authors.id')
    //   .where('authors.id', String(authorID))
    //   .select('*')
    //   .distinct()

    const lovedList: Ebook[] = await db('reading_list')
      .join('ebooks', 'reading_list.ebook_id', '=', 'ebooks.id')
      .join('albums', 'ebooks.albums_id', '=', 'albums.id')
      .join('authors', 'albums.author_id', '=', 'authors.id')
      .where('user_id', String(userId))
      .select('reading_list.*', 'ebooks.*',
        'albums.name AS albumName', 'albums.author_id',
        'authors.name AS authorName', 'authors.avatar AS authorAvatar'
      )

    if (!lovedList) return res.status(400).json({ message: 'you haven\'t started reading any books yet' })

    const authors: Author[] = []
    const readingBooks: ReadingBook[] = []
    const booksRead: string[] = []
    let numberOfPagesAlreadyRead = 0
    /**
    * Processo de virtualização dos campos do banco.
    */
    const serializedMidia = lovedList.map((ebook) => {
      const newAuthor = () => authors.push({
        id: ebook.author_id,
        name: ebook.authorName,
        avatar: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${ebook.authorAvatar}`
      })

      authors.length <= 0
        ? newAuthor()
        : authors.map(author => ebook.authorName !== author.name && newAuthor())

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

    // console.log(serializedMidia)
    return res.json({ authors, booksRead, readingBooks, numberOfPagesAlreadyRead })
  }
}
