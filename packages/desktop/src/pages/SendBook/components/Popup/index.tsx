import React, { useState, useEffect, useCallback } from 'react'
import { useWindow } from './../../../../context/window'

import { IoIosClose } from 'react-icons/io'
import api from '@thoth/axios-config'

import Input from './../../../../components/Form/Input'
import InputGroup from './../../../../components/Form/InputGroup'
import Select from './../../../../components/Select'
import { Container, Modal } from './styles'

interface Author {
  id: number;
  name: string;
  avatar: string;
}

interface Props {
  albumName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewAlbum(prop: unknown): void;
}
const Popup: React.FC<Props> = ({ open, setOpen, addNewAlbum, ...props }) => {
  const { Toast } = useWindow()
  const [authors, setAuthors] = useState<Author[] | null>(null)
  const [albumName, setAlbumName] = useState(props.albumName)
  const [albumAuthor, setAlbumAuthor] = useState<Author | null>(null)

  const [authorName, setAuthorName] = useState<string | null>(null)
  const [authorAvatar, setAuthorAvatar] = useState<File | null>(null)

  useEffect(() => {
    if (open) {
      setAlbumName(props.albumName)
      api.get<Author[]>('/author/list').then(response => {
        setAuthors(response.data)
      }).catch(e => alert(e))
    }
  }, [open])

  const handleNewAlbum = () => {
    if (albumName && albumAuthor) {
      api.post('/album/create', {
        name: albumName,
        authorId: albumAuthor.id
      }).then(response => {
        addNewAlbum({
          id: response.data.id,
          name: albumName,
          authorId: albumAuthor.id
        })

        Toast.addToast({
          title: 'Sucesso!',
          description: 'Album criado com sucesso!',
          type: 'success'
        })

        setOpen(false)
      }).catch(err => {
        console.log(err)

        Toast.addToast({
          title: 'Erro!',
          description: 'Tente novamente mais tarde...',
          type: 'error'
        })
      })
    } else {
      Toast.addToast({
        title: 'Erro!',
        description: 'Preencha todos os campos para criar o album!',
        type: 'error'
      })
    }
  }

  const handleNewAuthor = () => {
    const data = new FormData()

    if (authorName && authorAvatar) {
      data.append('name', authorName)
      data.append('avatar', authorAvatar)

      api.post<Author>('/author/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        const newAuthor: Author = response.data

        setAuthorName(null)
        setAuthorAvatar(null)
        setAuthor(newAuthor)
        setAuthors(authors
          ? [
            ...authors,
            ...[newAuthor]
          ]
          : [newAuthor]
        )

        Toast.addToast({
          title: 'Sucesso!',
          description: 'Author criado com sucesso!',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)

        Toast.addToast({
          title: 'Erro!',
          description: 'Tente novamente mais tarde...',
          type: 'error'
        })
      })
      // setAuthors([
      //   ...authors,
      //   []
      // ])
      console.log(name)
    } else {
      Toast.addToast({
        title: 'Erro!',
        description: 'Preencha todos os campos para criar o author!',
        type: 'error'
      })
    }
  }

  return (
    <Container
      // trigger={open => (
      //   <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
      // )}
      position="bottom center"
      closeOnDocumentClick={false}
      closeOnEscape

      modal
      open={open}
    >
      <Modal>
        <IoIosClose className="close" onClick={() => setOpen(false)} />
        <InputGroup>
          <Input
            flex={4}
            label="Nome"
            name="albumName"

            value={albumName}
            onChange={(e) => {
              setAlbumName(e.target.value)
            }}

            required
          />

          <Select
            label="Author"
            name="author"
            flex={6}

            options={authors ? authors.map(author => {
              return {
                value: author.id, label: author.name
              }
            }) : [{ value: 0, label: 'carregando...' }]}
            onChange={(e) => {
              const selectedAuthor = authors?.find(author => author.id === e.value)
              console.log(selectedAuthor)

              selectedAuthor && setAlbumAuthor(selectedAuthor)
            }}
            onCreateOption={name => setAuthorName(name)}

            isLoading={!authors}
            isDisabled={!authors}
            isClearable
            required

            isSearchable={true}
          />

          <button type="button" onClick={handleNewAlbum}>Criar</button>
        </InputGroup>

        {
          authorName &&
          <>
            <hr role="separator" aria-orientation="horizontal" />
            <br />
            <i>Criar autor</i>
            <br />
            <InputGroup>
              <Input
                flex={5}
                label="Nome do autor"
                name="authorName"

                value={authorName}
                onChange={(e) => {
                  setAuthorName(e.target.value)
                }}

                required
              />

              <Input
                flex={3}
                label="Avatar"
                name="authorAvatar"
                type="file"

                onChange={(e) => {
                  // const reader = new FileReader()
                  const file = e.target.files

                  if (file) {
                    // reader.readAsDataURL(file)
                    setAuthorAvatar(file[0])
                  }
                }}

                required
              />

              <button type="button" onClick={handleNewAuthor}>Criar</button>
            </InputGroup>
          </>
        }
      </Modal>
    </Container>
  )
}

export default Popup
