import { Request, Response } from 'express'

import db from '../database/connection'

export default class AlbumController {
  async index (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      search = null as string | null
    } = req.query

    const trx = await db.transaction()

    try {
      let albums

      if (search) {
        albums = await trx('albums')
          .where('name', 'like', `%${search}%`)
          .select('*')
      } else {
        albums = await trx('albums')
          .select('*')
      }

      for (const key in albums) {
        if (Object.prototype.hasOwnProperty.call(albums, key)) {
          const album = albums[key]

          const ebooks = await trx('ebooks')
            .select('*')
            .where('albums_id', '=', album.id)

          album.ebooks = ebooks
        }
      }
      await trx.commit()

      return res.json(albums)
    } catch (error) {
      await trx.rollback()

      return res.status(400).json({
        error
      })
    }

    // const albums = await db('ebooks')
    //   .join('albums', 'ebooks.albums_id', '=', 'albums.id')
    //   // .where('albums.name', 'like', `%${search}%`)
    //   // .orWhere('albums.author', 'like', `%${search}%`)
    //   // .orWhere('ebooks.title', 'like', `%${search}%`)
    //   .whereRaw('`albums`.`name` like \'%??%\' OR `albums`.`author` like \'%??%\' OR `ebooks`.`title` like \'%??%\'', [String(search), String(search), String(search)])
    //   .select('ebooks.*', 'albums.*')
  }

  async show (req: Request, res: Response): Promise<Response<unknown>> {
    const {
      name,
      author
    } = req.query

    const [album] = await db('albums')
      .select('*')
      .where('name', String(name))
      .distinct()

    if (!album) return res.status(400).json({ error: 'Album not found' })

    return res.json(album)
  }

  async create (request: Request, response: Response): Promise<Response<unknown>> {
    // const { userId } = request.headers
    const {
      name,
      author
    } = request.body

    const verify = await db('albums')
      .where('name', String(name))
      .distinct()

    if (verify.length > 0) return response.status(400).json({ error: 'Album already exists' })

    const [id] = await db('albums').insert({
      name,
      author
    })

    if (!id) return response.status(400).json({ error: 'Album registration failed' })

    return response.status(201).json({ id })
  }

  async update (request: Request, response: Response): Promise<Response<unknown>> {
    const albumId = request.headers.albumId
    let {
      name = null,
      author = null
    } = request.body

    const [album] = await db('albums')
      .select('*')
      .where('id', String(albumId))
      .distinct()

    if (!album) return response.status(400).json({ error: 'Album not found' })
    if (!name) name = album.name
    if (!author) author = album.author

    await db('albums')
      .where('id', albumId)
      .update({
        name,
        author
      })

    return response.status(201).send()
  }
}
