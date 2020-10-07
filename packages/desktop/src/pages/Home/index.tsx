import React, { useContext, useEffect, useState } from 'react'

import { useWindow } from '../../context/window'

import Drag from '@mystroken/drag'
import { ThemeContext } from 'styled-components'

import example from '../../assets/example.jpg'

import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen, HiOutlineUser } from 'react-icons/hi'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { RiBookletLine } from 'react-icons/ri'

import Search from './../../components/Search/index'
import Aside from './components/Aside'
import { Container, Content, Ebook, Statistics, UserDataAboutReading } from './styles'

const AudioBooksItems = [
  {
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa',
    src: 'https://521dimensions.com/songs/Terrain-pglost.mp3'
  },
  {
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa',
    src: 'https://521dimensions.com/songs/Terrain-pglost.mp3'
  },
  {
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa',
    src: 'https://521dimensions.com/songs/Terrain-pglost.mp3'
  },
  {
    img: example,
    title: 'Opaa aaeae',
    description: 'aaaaaaaaaaaaaa aaaaaaaa',
    src: 'https://521dimensions.com/songs/Terrain-pglost.mp3'
  }
]
const Home: React.FC = () => {
  const theme = useContext(ThemeContext).colors
  const { newWindow, newNotification, Toast, Header, Size } = useWindow()
  let currentX = 0
  let currentY = 0

  useEffect(() => {
    Header.hidden(true)
    const container = $('.recentBooks')

    if (container) {
      const options = {
        listener: container,
        multiplier: 1 // default: 1
      }
      const drag = new Drag(options)
      drag.on(event => {
        currentX = event.X
        currentY = event.Y
      })
    }
  }, [])

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const mainElement = event.currentTarget
    // console.log(event.nativeEvent)
    // mainElement.scrollTo({ top: 0 })

    if (event.nativeEvent?.target?.className === 'recentBooks') return

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
        <Search />

        <div className="currentData">Quarta feira, 17 de março de 2020</div>

        <div className="user">
          Carlos Miguel

          <img src="https://avatars2.githubusercontent.com/u/57706806?s=460&u=d99f75dd759767691aecc7463b92fa022a4b01ee&v=4" alt="User avatar"/>
        </div>
      </header>

      <Content>
        <main
          onScroll={onScroll}
        >
          <h4>Meus livros
            <a href="#">more <BsArrowRight /></a>
          </h4>

          <nav className="recentBooks dragscroll">
            <Ebook className="Ebook" >
              <img className="cover" src={example} alt=""/>

              <div>
                <h5 title="Filhos do Éden: Paraíso Perdido">Filhos do Éden: Paraíso Perdido</h5>
                <span>
                  {/* <FiUser /> */}
                  Eduardo (2003) <br/>
                  Novel
                </span>

                <div className="stars">
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                </div>
              </div>
            </Ebook>
            <Ebook className="Ebook" >
              <img className="cover" src={example} alt=""/>

              <div>
                <h5 title="Filhos do Éden: Paraíso Perdido">Filhos do Éden: Paraíso Perdido</h5>
                <span>
                  {/* <FiUser /> */}
                  Eduardo (2003) <br/>
                  Novel
                </span>

                <div className="stars">
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                </div>
              </div>
            </Ebook>
            <Ebook className="Ebook" >
              <img className="cover" src={example} alt=""/>

              <div>
                <h5 title="Filhos do Éden: Paraíso Perdido">Filhos do Éden: Paraíso Perdido</h5>
                <span>
                  {/* <FiUser /> */}
                  Eduardo (2003) <br/>
                  Novel
                </span>

                <div className="stars">
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                </div>
              </div>
            </Ebook>

          </nav>

          <UserDataAboutReading>
            <div className="card">
              <div className="icon" data-color="blue" >
                <HiOutlineBookOpen />
              </div>
              <p>
                <strong>94</strong>
                <br />
                Livros lidos
              </p>
            </div>
            <div className="card">
              <div className="icon" data-color="lightBlur" >
                <HiOutlineBookOpen />
              </div>
              <p>
                <strong>94</strong>
                <br />
                Autores lidos
              </p>
            </div>
            <div className="card">
              <div className="icon" data-color="yellow">
                <HiOutlineUser />
              </div>
              <p>
                <strong>110</strong>
                <br />
                Páginas de livros
              </p>
            </div>
            <div className="card">
              <div className="icon" data-color="green" >
                <HiOutlineBookOpen />
              </div>
              <p>
                <strong>94</strong>
                <br />
                Lendo
              </p>
            </div>
          </UserDataAboutReading>

          <Statistics>
            <div>
              <h4>Autores Popular
                <a href="#">Mais <BsArrowRight /></a>
              </h4>

              <div className="autor">
                <img src="https://avatars2.githubusercontent.com/u/57706806?s=460&u=d99f75dd759767691aecc7463b92fa022a4b01ee&v=4" alt="Autor"/>
                <h5>Eduardo Sphoth</h5>
                <RiBookletLine />
              </div>
              <div className="autor">
                <img src="https://avatars2.githubusercontent.com/u/57706806?s=460&u=d99f75dd759767691aecc7463b92fa022a4b01ee&v=4" alt="Autor"/>
                <h5>Eduardo Sphoth</h5>
                <RiBookletLine />
              </div>
              <div className="autor">
                <img src="https://avatars2.githubusercontent.com/u/57706806?s=460&u=d99f75dd759767691aecc7463b92fa022a4b01ee&v=4" alt="Autor"/>
                <h5>Eduardo Sphoth</h5>
                <RiBookletLine />
              </div>
              <div className="autor">
                <img src="https://avatars2.githubusercontent.com/u/57706806?s=460&u=d99f75dd759767691aecc7463b92fa022a4b01ee&v=4" alt="Autor"/>
                <h5>Eduardo Sphoth</h5>
                <RiBookletLine />
              </div>

            </div>

            <div>
              <h4>Continue Lendo
                <a href="#">Mais <BsArrowRight /></a>
              </h4>

              <div className="bookStatistics">
                <img src={example} alt=""/>

                <div>
                  <h5>A Batalha do apocalipse</h5>
                  <span>aaaaaaaaaasd <i>200/400</i></span>
                  <progress value="50" max="100">50 %</progress>
                </div>
              </div>
              <div className="bookStatistics">
                <img src={example} alt=""/>

                <div>
                  <h5>A Batalha do apocalipse</h5>
                  <span>aaaaaaaaaasd <i>200/400</i></span>
                  <progress value="50" max="100">50 %</progress>
                </div>
              </div>
              <div className="bookStatistics">
                <img src={example} alt=""/>

                <div>
                  <h5>A Batalha do apocalipse</h5>
                  <span>aaaaaaaaaasd <i>200/400</i></span>
                  <progress value="50" max="100">50 %</progress>
                </div>
              </div>
              <div className="bookStatistics">
                <img src={example} alt=""/>

                <div>
                  <h5>A Batalha do apocalipse</h5>
                  <span>aaaaaaaaaasd <i>200/400</i></span>
                  <progress value="50" max="100">50 %</progress>
                </div>
              </div>
            </div>
          </Statistics>
        </main>

        {/* <Aside {...{ AudioBooksItems }} /> */}
      </Content>

    </Container>
  )
}

export default Home
