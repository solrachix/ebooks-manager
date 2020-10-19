/* eslint-disable camelcase */

import React, { useEffect, useState } from 'react'

import example from '../../../../assets/example.jpg'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import HorizontalList from '../../../../components/HorizontalList'
import { Container, Ebook } from './styles'
import api from '@thoth/axios-config'

interface Ebook {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  url: string;
  thumbnail: string;
  edition: number;
  author: string;
  albums_id: number;
  albumName: string;
}

const RecentBooks: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[] | null>(null)

  useEffect(() => {
    api.get('/readingList', {
      params: {
        search: ''
      }
    }).then(Response => {
      setEbooks(Response.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  return (
    <Container>
      <HorizontalList >

        { ebooks &&
        ebooks.map((ebook: Ebook) => (
          <Ebook key={ebook.id} className="Ebook" >
            <img className="cover" src={ebook.thumbnail} alt={ebook.title} />

            <div>
              <h5 title={ebook.title}>{ebook.title}</h5>
              <span>
                {/* <FiUser /> */}
                {ebook.author} (2003) <br/>
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
        ))
        }
        {/* <Ebook className="Ebook" >
          <img className="cover" src={example} alt=""/>

          <div>
            <h5 title="Filhos do Éden: Paraíso Perdido">Filhos do Éden: Paraíso Perdido</h5>
            <span>
              <FiUser />
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
       */}
      </HorizontalList>
    </Container>
  )
}

export default RecentBooks
