/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react'
import { useWindow } from './../../context/window'

import api from '@thoth/axios-config'

import Popup from './components/Popup'
import Input from './../../components/Form/Input'
import InputGroup from './../../components/Form/InputGroup'
import Textarea from './../../components/Textarea'
import Select from './../../components/Select'
import DropZone from './../../components/DropZone/index'
import UploadBar from './../../components/UploadBar/index'
import { Container } from './styles'

interface Ebook {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  url: string;
  thumbnail: string;
  edition: number;
  albums_id: number;
  notes: number;
}

interface Albums {
    id: number;
    name: string;
    author_id: number;
    ebooks: Ebook[] | null;
}

interface ProgressEvent {
  loaded: number;
  total: number;
}

const SendBook: React.FC = () => {
  const { Toast } = useWindow()
  const [albums, setAlbums] = useState<Albums[] | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newAlbum, setNewAlbum] = useState('')

  const [ebook, setEbook] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [album, setAlbum] = useState<Albums | null>(null)
  const [edition, setEdition] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    api.get<Albums[]>('/album').then(response => {
      setAlbums(response.data)
    }).catch(e => alert(e))
  }, [])

  const addNewAlbum = (Album: Albums) => {
    setAlbums(albums
      ? [
        ...albums,
        ...[Album]
      ] : [Album]
    )
  }

  const createAlbum = (name: string) => {
    // console.log(name)

    setNewAlbum(name)
    setOpenModal(true)
  }

  const handlePublishEbook = () => {
    const data = new FormData()

    if (ebook && title && album && edition && description) {
      data.append('albums_id', String(album.id))
      data.append('ebook', ebook)
      data.append('title', title)
      data.append('edition', edition)
      data.append('description', description)

      api.post('/ebook/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      }).then(response => {
        Toast.addToast({
          title: 'Sucesso!',
          description: 'Ebook publicado com sucesso!',
          type: 'success'
        })
      }).catch(err => {
        const { error } = err.response.data

        Toast.addToast({
          title: 'Erro!',
          description: error || 'Tente novamente mais tarde...',
          type: 'error'
        })
      })
    } else {
      Toast.addToast({
        title: 'Erro!',
        description: 'Preencha todos os campos!',
        type: 'error'
      })
    }
  }

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const percentage = (progressEvent.loaded / progressEvent.total) * 100
    console.log(percentage)
  }

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const mainElement = event.currentTarget
    // console.log(event.nativeEvent)
    // mainElement.scrollTo({ top: 0 })

    if (event.nativeEvent?.target!.tagName !== 'MAIN') return

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
    <Container >
      <Popup
        albumName={newAlbum}
        open={openModal}
        setOpen={setOpenModal}

        addNewAlbum={addNewAlbum}
      />

      <main {...{ onScroll }}>
        <fieldset>
          <legend>Postar livro</legend>

          <DropZone
            text="Ebook"
            accept=".pdf"
            onFileUploaded={(file) => setEbook(file)}
          />

          <InputGroup>
            <Input
              flex={4}
              label="Titulo da obra"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              required
            />

          </InputGroup>

          <InputGroup>
            <Select
              label="Album"
              name="album"
              flex={7}
              options={albums ? albums.map(album => {
                return {
                  value: album.id, label: album.name
                }
              }) : [{ value: 0, label: 'carregando...' }]}
              onChange={(e) => {
                const selectedAlbum = albums?.find(album => album.id === e.value)
                console.log(selectedAlbum)

                selectedAlbum && setAlbum(selectedAlbum)
              }}
              onCreateOption={createAlbum}

              isLoading={!albums}
              isDisabled={!albums}
              isClearable
              required

              isSearchable={true}
            />

            <Input
              flex={3}
              label="Nº da edição"
              name="edition"
              type="number"
              value={edition}
              onChange={(e) => {
                setEdition(e.target.value)
              }}
              required
            />

          </InputGroup>

          <Textarea
            name='description'
            label='Descrição'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            required
            maxLength={300}
          />

          <button type="button" data-text="Publicar" onClick={handlePublishEbook} />
        </fieldset>

      </main>

      {/* <UploadBar /> */}
    </Container>
  )
}

export default SendBook
