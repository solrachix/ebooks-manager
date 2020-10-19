/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react'
import api from '@thoth/axios-config'

import example from '../../assets/example.jpg'
import Input from '../../components/Form/Input/index'
import EbookData from '../../components/EbookData'
import { Container, SearchIcon, Fieldset, Ebook } from './styles'

const BooksItems = [
  {
    id: 0,
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa'
  },
  {
    id: 1,
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa'
  },
  {
    id: 2,
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa'
  },
  {
    id: 3,
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa'
  }
]

interface EbookProps {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  url: string;
  thumbnail: string;
  edition: number;
  albums_id: number;
}

const Search: React.FC = () => {
  const [ebooks, setEbooks] = useState<EbookProps[] | null>(null)

  useEffect(() => {
    api.get('/ebook').then(response => {
      setEbooks(response.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  const onKeyUp = () => {
    const input = $('#searchPage') as HTMLInputElement

    if (input) {
      api.get('/ebook', {
        params: {
          search: input.value
        }
      }).then(response => {
        setEbooks(response.data)
      }).catch(e => {
        console.log(e)
      })
    }
  }

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const mainElement = event.currentTarget

    // mainElement.scrollTo({ top: 0 })
    if (mainElement.scrollTop === 0) {
      mainElement.animate({
        transform: ['translateY(0rem)', 'translateY(3rem)', 'translateY(0rem)']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      })

      // MainElementAnimation.onfinish = () => {
      //    mainElement.style.transform = 'translateY(-3rem)'
      // }
    }
    if (mainElement.offsetHeight + mainElement.scrollTop >= mainElement.scrollHeight) {
      mainElement.animate({
        transform: ['translateY(0rem)', 'translateY(-3rem)', 'translateY(0rem)']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      })
    }
  }

  return (
    <Container>
      <header>
        <Input
          name="searchPage"
          icon={<SearchIcon />}

          placeholder="Pesquise..."

          {...{ onKeyUp }}
        />
      </header>

      <Fieldset>
        <legend><b>{ebooks ? ebooks.length : 0}</b> livros encontrados</legend>

        <div {...{ onScroll }}>

          { ebooks &&
            ebooks.map(ebook => (
              <Ebook
                key={ebook.id}
              >
                <img
                  className="cover"
                  src={ebook.thumbnail}
                  alt={`Capa do livros ${ebook.title}`}
                />
              </Ebook>
            ))
          }
        </div>

      </Fieldset>

      <EbookData />
    </Container>
  )
}

export default Search
