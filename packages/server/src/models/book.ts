/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs'
import path from 'path'
import PDF from 'pdf-poppler'

require('dotenv').config()

const uploadsURL = path.resolve(__dirname, '..', '..', 'uploads')
const thumbnailURL = path.resolve(uploadsURL, 'thumbnail')

export const getCover = async (fileName: string): Promise<string> => {
  const filePath = path.resolve(uploadsURL, fileName)
  const imageName = path.basename(`thumbnail-${fileName}`, path.extname(fileName))

  await PDF.convert(filePath, {
    format: 'jpeg',
    out_dir: thumbnailURL,
    out_prefix: imageName,
    page: 1
  })

  return imageName
}
