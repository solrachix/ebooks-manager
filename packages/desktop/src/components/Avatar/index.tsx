import fs from 'fs'
import path from 'path'

import React, { useState, useEffect, useRef } from 'react'

import { Container, Popup } from './styles'
import api from '@thoth/axios-config'

interface Props {
  avatarId: string;
  withoutPopup?: boolean;
}

interface Avatar {
  id: string,
  base64: string
}
const Avatar: React.FC<Props> = ({ avatarId, withoutPopup, ...props }) => {
  const PopupRef = useRef<HTMLDivElement>(null)
  const [avatars, setAvatars] = useState<Avatar[] | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>()
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    if (avatars) {
      avatars.map(avatar => avatar.id === avatarId && setSelectedAvatar(avatar))
    }
  }, [avatars])

  useEffect(() => {
    listDirectoryFiles(path.resolve('src', 'assets', 'avatars'))
  }, [])

  async function listDirectoryFiles (dir: string) {
    const files: Avatar[] = []

    const fileList = fs.readdirSync(dir as fs.PathLike)
    for await (const file of fileList.map((i) => {
      const File = fs.readFileSync(`${dir}\\${i}`, 'base64')
      // console.log(stat)
      files.push({
        id: i,
        base64: File
      })
    })) {

    }

    setAvatars(files.shuffle())
    return files
  }

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar)

    api.put('/user/update', {
      avatar: avatar.id
    })
  }

  const handleOpenPopup = () => {
    const popup = PopupRef.current

    if (popup) {
      if (!openPopup) {
        popup.animate({
          transform: ['scale(0.001)', 'scale(1.1)', 'scale(1)'],
          marginTop: ['0%', '26%'],
          marginLeft: ['0%', '-22%']
        }, {
          duration: 600,
          easing: 'ease-out',
          iterations: 1
        })
        popup.style.transform = 'scale(1)'
        popup.style.marginTop = '26%'
        popup.style.marginLeft = '-22%'
      } else {
        popup.animate({
          transform: ['scale(1)', 'scale(1.1)', 'scale(0.001)'],
          marginTop: ['26%', '0%'],
          marginLeft: ['-22%', '0%']
        }, {
          duration: 600,
          easing: 'ease-out',
          iterations: 1
        })
        popup.style.transform = 'scale(0.001)'
        popup.style.marginTop = '0%'
        popup.style.marginLeft = '0%'
      }
    }

    setOpenPopup(!openPopup)
  }

  return (
    <Container {...props}>
      { selectedAvatar
        ? <img
          src={`data:image/png;base64, ${selectedAvatar.base64}`}
          alt="User avatar"

          onClick={() => !withoutPopup && handleOpenPopup()}
        />
        : 'loading...'
      }

      <Popup ref={PopupRef}>
        { avatars?.map(avatar =>
          <img
            key={avatar.id}
            className={`avatar ${avatar.id === selectedAvatar?.id && 'selected'}`}
            src={`data:image/png;base64, ${avatar.base64}`}

            onClick={() => handleAvatarClick(avatar)}
          />
        )}
      </Popup>
    </Container>
  )
}

export default Avatar
