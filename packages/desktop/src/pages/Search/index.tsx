import React from 'react'

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
const Search: React.FC = () => {
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
          id="search"
          name="search"
          icon={<SearchIcon />}

          placeholder="Pesquise..."
        />
      </header>

      <Fieldset>
        <legend><b>10</b> livros encontrados</legend>

        <div {...{ onScroll }}>

          {
            BooksItems.map(props => (
              <Ebook
                key={props.id}
              >
                <img
                  className="cover"
                  src={props.img}
                  alt={`Capa do livros ${props.title}`}
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