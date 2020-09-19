import React, { useState } from 'react'

import { Container, AudioBooksSlide, AudioBook } from './styles'

interface AsideProps {
  AudioBooksItems: {
    img: string;
    title: string;
    description: string;
  }[]
}
const Aside: React.FC<AsideProps> = ({ AudioBooksItems, ...props }) => {
  const [AudioBooksBeingPlayed, setAudioBooksBeingPlayed] = useState(0)

  const handleSlide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    if (id === AudioBooksBeingPlayed) return
    const audioBooksSlide = $('.audioBooksSlide')

    setAudioBooksBeingPlayed(id)
    if (audioBooksSlide) {
      audioBooksSlide.scrollTo({
        left: e.currentTarget.offsetLeft - 100
      })
      console.log(
        audioBooksSlide.scrollWidth,
        e.currentTarget.offsetLeft
      )
    }
  }
  return (
    <Container>
      <AudioBooksSlide className="audioBooksSlide" >
        <div>
          {
            AudioBooksItems.map((item, index) => (
              <AudioBook
                key={index}
                actived={index === AudioBooksBeingPlayed}
                onClick={e => handleSlide(e, index)}
              >
                <img src={item.img} alt={`Foto da Capa do livro ${item.title}`} />
                {
                  index === AudioBooksBeingPlayed && (
                    <>
                      <h4>{item.title}</h4>
                      <legend>{item.description}</legend>
                    </>
                  )
                }
              </AudioBook>
            ))
          }
        </div>
      </AudioBooksSlide>
    </Container>
  )
}

export default Aside
