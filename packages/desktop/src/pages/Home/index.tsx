import React, { useContext, useEffect } from 'react'
import { useWindow } from '../../context/window'

import example from '../../assets/example.jpg'
import { ThemeContext } from 'styled-components'
import { BsArrowRight } from 'react-icons/bs'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { RiBookletLine } from 'react-icons/ri'
import { Container, Content, Ebook, Statistics } from './styles'
import Search from './../../components/Search/index'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext).colors
  const { newWindow, newNotification, Toast, Header, Size } = useWindow()

  useEffect(() => {
    Header.hidden(true)
  }, [])

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const mainElement = event.currentTarget

    console.log(mainElement.scrollTop)
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
    if (mainElement.scrollTop === 148) {
      mainElement.animate({
        transform: ['translateY(0rem)', 'translateY(-3rem)', 'translateY(0rem)']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      })

      // MainElementAnimation.onfinish = () => {
      //   mainElement.style.transform = 'translateY(-3rem)'
      // }
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

          <nav className="recentBooks" >
            <Ebook>
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
            <Ebook>
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
            <Ebook>
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

        <aside>

        </aside>
      </Content>

    </Container>
  )
}

export default Home
