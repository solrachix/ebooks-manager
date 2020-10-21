/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { IoIosHeartEmpty, IoIosHeart, IoMdClose } from 'react-icons/io'
import OutlineOwl from '../../assets/outlineOwl.svg'
import FilledOwl from '../../assets/filledOwl.svg'
import { Container, Ebook, Content } from './styles'
import Button from './../Button/index'
const likes = [1, 1, 1, 1, 0]

interface EbookProps {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  url: string;
  thumbnail: string;
  edition: number;
  albums_id: number;
  albumName:string;
  author_id: number;
  authorName: string;
  authorAvatar: string;
}

interface EbookDataProps {
  open: {
    openEbookData: boolean;
    setOpenEbookData: React.Dispatch<React.SetStateAction<boolean>>;
  };
  ebook?: EbookProps | undefined;
}

const EbookData: React.FC<EbookDataProps> = ({ open, ebook }) => {
  // const [actived, setActived] = useState(active)
  const history = useHistory()

  useEffect(() => {
    const container = $('.EbookData')

    if (container) {
      if (open.openEbookData) {
        container.animate({
          right: [
            '-200%',
            '0%'
          ]
        }, {
          duration: 1400, // number in ms [this would be equiv of your speed].
          easing: 'ease-in',
          iterations: 1 // infinity or a number.
          // fill: ''
        })
        container.style.right = '0%'
      } else {
        container.animate({
          right: [
            '0%',
            '-200%'
          ]
        }, {
          duration: 1400, // number in ms [this would be equiv of your speed].
          easing: 'ease-in',
          iterations: 1 // infinity or a number.
          // fill: ''
        })
        container.style.right = '-200%'
      }
    }
  }, [open.openEbookData])

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

  const handleReadInit = () => {
    history.push({
      pathname: '/read',
      ebook
    })
  }
  return (
    <Container className="EbookData" {...{ onScroll }}>
      <IoMdClose className="Close" onClick={() => open.setOpenEbookData(false)} />

      { ebook && <Ebook>
        <img className="cover" src={ebook.thumbnail} alt=""/>

        <div>
          <h3>{ebook.title} </h3>
          <div>
            {/* <FiUser /> */}
            <p>
                Autor: <i>{ebook.authorName}</i>
            </p>
            <p>
                ano de lançamento: <i>2003</i>
            </p>
            <span>
              {
                likes.map((number, index) => number === 1 ? <IoIosHeart key={index} /> : <IoIosHeartEmpty key={index} />)
              }
            </span>
          </div>

          <Button
            type="button"
            onClick={handleReadInit}
          >Iniciar Leitura</Button>
        </div>
      </Ebook>}

      <Content>
        <h4>Descrição</h4>
        <legend>
          { ebook &&
          ebook.description
          // 'Paraíso Perdido é o terceiro livro da série Filhos do Éden. Neste último volume da trilogia, acompanhamos a caçada a Metatron, o mais antigo e poderoso entre os anjos, que recentemente escapou do cárcere no Segundo Céu e agora pretende retomar o controle do mundo, desafiando tanto as legiões do arcanjo Miguel quanto as tropas revolucionárias de Gabriel.Metatron foi o líder dos sentinelas, um coro enviado à terra por Deus no princípio dos tempos, com a função de proteger e instruir a humanidade. Quando os arcanjos decidiram acabar com os seres humanos, afundando o planeta na era do gelo, Metatron e seus asseclas se revoltaram, tornando-se inimigos do céu e sendo posteriormente acossados.Paraíso Perdido é dividido em três partes, cada qual com uma atmosfera própria e personagens diferentes. O primeiro trecho se passa em Asgard, a dimensão dos deuses nórdicos, onde Denyel, o anjo exilado, acorda ao final do volume anterior da trilogia após ser sugado pelo rio Oceanus. Kaira, a Centelha Divina, uma das arcontes de Gabriel, vai ao seu encontro com o objetivo de resgatá-lo e trazê-lo de volta ao plano físico, através da legendária Ponte Bifrost.A segunda parte tem lugar antes do dilúvio. Conforme mostrado no volume anterior, Ablon, o Vingador, então um dos generais de Miguel, é ordenado a capturar Metatron e trazê-lo vivo aos Sete Céus. O segundo terço do livro destaca esse período, revelando um Ablon diferente daquele que conhecemos nas páginas de A Batalha do Apocalipse, ainda fiel a seus chefes e às forças do paraíso.Essas duas jornadas convergem na parte três, que finalmente explicará como Ablon, há trinta e cinco mil anos, conseguiu enclausurar Metatron, e como Kaira, Urakin e Denyel, no presente, farão para enfrentar o poderoso anjo, um celeste muitíssimo mais forte que eles, invencível em vários aspectos.Paraíso Perdido é uma aventura extraordinária, que encerra a saga monumental iniciada em Herdeiros de Atlântida e expandida em Anjos da Morte, culminando com os eventos que darão origem à grande Batalha do Apocalipse, retratada no romance homônimo de Eduardo Spohr.'
            .split('.').map(p => p.trim() && p !== '' && (
              <p>{p}.</p>
            ))}
        </legend>
      </Content>
    </Container>
  )
}

export default EbookData
