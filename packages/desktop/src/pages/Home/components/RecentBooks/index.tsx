/* eslint-disable camelcase */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import HorizontalList from '../../../../components/HorizontalList'
import { Container, Ebook } from './styles'
import api from '@thoth/axios-config'

interface Ebook {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  percentage: number;
  url: string;
  thumbnail: string;
  edition: number;
  albums_id: number;
  albumName: string;
  author_id: number;
  authorName: string;
  authorAvatar: string;
}

const RecentBooks: React.FC = () => {
  const history = useHistory()
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

  const handleEbookClick = (ebook: Ebook) => {
    history.push({
      pathname: '/read',
      ebook
    })
  }
  return (
    <Container>
      <HorizontalList >

        { ebooks &&
        ebooks.map((ebook: Ebook) => (
          <Ebook
            key={ebook.id}
            className="Ebook"
            onClick={() => handleEbookClick(ebook)}
          >
            <img className="cover" src={ebook.thumbnail} alt={ebook.title} />

            <div>
              <h5 title={ebook.title}>{ebook.title}</h5>
              <span>
                {/* <FiUser /> */}
                {ebook.authorName} (2003) <br/>
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
