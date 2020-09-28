/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs'
import path from 'path'
import PDF from 'pdf-poppler'
import Tesseract from 'tesseract.js'

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

  return `${imageName}-001.jpg`
}

export const extractTextFromImage = async (thumbnailName: string): Promise<string> => {
  Tesseract.recognize(
    'https://tesseract.projectnaptha.com/img/eng_bw.png',
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text)
  })

  return 'a'
}
