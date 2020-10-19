/* eslint-disable camelcase */

import React, { useRef, useEffect, useState, FocusEvent } from 'react'

import { useHistory } from 'react-router-dom'

import { FiUser } from 'react-icons/fi'
import { Container, SearchIcon, Box, FilterOptions, Ebook } from './styles'
import Input from './../Form/Input/index'
import api from '@thoth/axios-config'

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
  const history = useHistory()
  const BoxRef = useRef<HTMLDivElement>(null)
  const [focus, setFocus] = useState(false)
  const [ebooks, setEbooks] = useState<EbookProps[] | null>(null)
  const [filterOptions, setFilterOptions] = useState<string[]>([
    'All',
    'Movie',
    'Anime'
  ])
  const [filterOptionsActived, setFilterOptionsActived] = useState(0)

  useEffect(() => {
    const Box = BoxRef.current
    const InputBackgroundOnFocus = $('.inputBackgroundOnFocus')

    if (!Box) return
    if (!InputBackgroundOnFocus) return

    if (focus) {
      const BoxAnimation = Box.animate({
        opacity: [0, 1],
        transform: ['translateY(-60rem)', 'translateY(0rem)']
      }, {
        duration: 2000,
        easing: 'ease-in',
        iterations: 1
      })

      const InputBackgroundOnFocusAnimation = InputBackgroundOnFocus.animate({
        opacity: [0, 1],
        transform: ['scale(0)', 'scale(1)']
      }, {
        duration: 1000,
        easing: 'ease-in',
        iterations: 1
      })

      Box.style.opacity = '1'
      Box.style.transform = 'translateX(0rem)'
      InputBackgroundOnFocus.style.opacity = '1'
      InputBackgroundOnFocus.style.transform = 'scale(1)'
    }
  }, [focus])

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocus(true)
  }

  const onBlur = () => {
    const Box = BoxRef.current
    const InputBackgroundOnFocus = $('.inputBackgroundOnFocus')

    if (!Box) return
    if (!InputBackgroundOnFocus) return

    const BoxAnimation = Box.animate({
      opacity: [1, 0],
      transform: ['translateY(0rem)', 'translateY(-60rem)']
    }, {
      duration: 2000,
      easing: 'ease-in-out',
      iterations: 1
    })

    const InputBackgroundOnFocusAnimation = InputBackgroundOnFocus.animate({
      opacity: [1, 0],
      transform: ['scale(1)', 'scale(0)']
    }, {
      duration: 1000,
      easing: 'ease-in-out',
      iterations: 1
    })

    Box.style.opacity = '0'
    Box.style.transform = 'translateX(-60rem)'
    InputBackgroundOnFocus.style.opacity = '0'
    InputBackgroundOnFocus.style.transform = 'scale(0)'

    setFocus(false)
  }

  const onKeyUp = () => {
    const input = $('#search') as HTMLInputElement

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

  const handleViewMore = () => {
    const input = $('#search') as HTMLInputElement

    if (input) {
      history.push('/search', { search: input.value })
    }
  }
  return (
    <Container>
      <div
        className="inputBackgroundOnFocus"
        onClick={onBlur}
      />

      <Input
        id="search"
        name="search"
        icon={<SearchIcon />}

        placeholder="Pesquise..."
        {...{ onFocus, onKeyUp }}
      />

      <Box ref={BoxRef}>
        <header>
          {
            filterOptions.map((option: string, index) => (
              <FilterOptions
                key={option}
                actived={(filterOptionsActived === index)}

                onClick={() => setFilterOptionsActived(index)}
              >{option}</FilterOptions>
            ))
          }

        </header>
        { ebooks &&
          ebooks.map((ebook, index) =>

            <Ebook key={index}>
              <img className="cover" src={ebook.thumbnail} alt=""/>

              <div>
                <h4>{ebook.title}</h4>
                <span>
                  <FiUser />
              Eduardo (2003)
                </span>

                <legend>
                  {ebook.title}
                </legend>
              </div>
            </Ebook>
          )
        }
        {/* <Ebook>
          <img className="cover" src={example} alt=""/>

          <div>
            <h4>Filhos do Éden: Paraíso Perdido</h4>
            <span>
              <FiUser />
              Eduardo (2003)
            </span>

            <legend>
              Paraíso Perdido é o terceiro livro da série Filhos do Éden. Neste último volume da trilogia, acompanhamos a caçada a Metatron, o mais antigo e poderoso entre os anjos, que recentemente escapou do cárcere no Segundo Céu e agora pretende retomar o controle do mundo, desafiando tanto as legiões do arcanjo Miguel quanto as tropas revolucionárias de Gabriel.Metatron foi o líder dos sentinelas, um coro enviado à terra por Deus no princípio dos tempos, com a função de proteger e instruir a humanidade. Quando os arcanjos decidiram acabar com os seres humanos, afundando o planeta na era do gelo, Metatron e seus asseclas se revoltaram, tornando-se inimigos do céu e sendo posteriormente acossados.Paraíso Perdido é dividido em três partes, cada qual com uma atmosfera própria e personagens diferentes. O primeiro trecho se passa em Asgard, a dimensão dos deuses nórdicos, onde Denyel, o anjo exilado, acorda ao final do volume anterior da trilogia após ser sugado pelo rio Oceanus. Kaira, a Centelha Divina, uma das arcontes de Gabriel, vai ao seu encontro com o objetivo de resgatá-lo e trazê-lo de volta ao plano físico, através da legendária Ponte Bifrost.A segunda parte tem lugar antes do dilúvio. Conforme mostrado no volume anterior, Ablon, o Vingador, então um dos generais de Miguel, é ordenado a capturar Metatron e trazê-lo vivo aos Sete Céus. O segundo terço do livro destaca esse período, revelando um Ablon diferente daquele que conhecemos nas páginas de A Batalha do Apocalipse, ainda fiel a seus chefes e às forças do paraíso.Essas duas jornadas convergem na parte três, que finalmente explicará como Ablon, há trinta e cinco mil anos, conseguiu enclausurar Metatron, e como Kaira, Urakin e Denyel, no presente, farão para enfrentar o poderoso anjo, um celeste muitíssimo mais forte que eles, invencível em vários aspectos.Paraíso Perdido é uma aventura extraordinária, que encerra a saga monumental iniciada em Herdeiros de Atlântida e expandida em Anjos da Morte, culminando com os eventos que darão origem à grande Batalha do Apocalipse, retratada no romance homônimo de Eduardo Spohr.
            </legend>
          </div>
        </Ebook> */}

        <p onClick={handleViewMore}>Ver mais</p>
      </Box>
    </Container>
  )
}

export default Search
