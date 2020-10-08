import React from 'react'

import example from '../../../../assets/example.jpg'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import HorizontalList from '../../../../components/HorizontalList'
import { Container, Ebook } from './styles'

const RecentBooks: React.FC = () => {
  return (
    <Container>
      <HorizontalList >

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

      </HorizontalList>
    </Container>
  )
}

export default RecentBooks
