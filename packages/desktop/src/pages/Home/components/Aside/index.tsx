import React, { useEffect, useState, useContext, useRef } from 'react'

import axios from 'axios'
import audioBeatDetection from '../../../../utils/audioBeatDetection'

import { ThemeContext } from 'styled-components'

import { BsPlay, BsPause, BsVolumeUp } from 'react-icons/bs'
import { AiOutlineBackward, AiFillForward } from 'react-icons/ai'
import { IoIosOptions } from 'react-icons/io'
import { Container, AudioBooksSlide, AudioBook, Player, Controls, AudioData, ProgressBar, InputRange } from './styles'

interface AudioBooksItem {
  img: string;
  title: string;
  description: string;
  src: string;
}

interface AsideProps {
  AudioBooksItems: AudioBooksItem[]
}
const Aside: React.FC<AsideProps> = ({ AudioBooksItems, ...props }) => {
  const theme = useContext(ThemeContext).colors
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [AudioBooksBeingPlayedId, setAudioBooksBeingPlayedId] = useState(0)
  const [AudioBooksBeingPlayedData, setAudioBooksBeingPlayedIdData] = useState<AudioBooksItem | null>(null)
  const [playingAudio, setPlayingAudio] = useState(false)
  const [volumeController, setVolumeController] = useState(false)
  const [volumeRate, setVolumeRate] = useState(100)
  const [audioDuration, setAudioDuration] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  // playbackRate

  useEffect(() => {
    const audio = audioRef.current
    const input = inputRef.current
    if (audio && input && AudioBooksBeingPlayedData) {
      audio.pause()
      audio.currentTime = 0
    }
    const a = (new Audio(AudioBooksItems[AudioBooksBeingPlayedId].src))

    // audioBeatDetection()

    // axios.get(`https://cors-anywhere.herokuapp.com/${AudioBooksItems[AudioBooksBeingPlayedId].src}`)
    //   .then((responce) => {
    //     const arrayBuffer = Buffer.from(responce.data)
    //     const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
    //     // const url = window.URL.createObjectURL(blob)

    //     // console.log(url)
    //   })

    setAudioBooksBeingPlayedIdData(AudioBooksItems[AudioBooksBeingPlayedId])
    setPlayingAudio(false)
    setAudioDuration(0)
    setElapsedTime(0)
    onTimeUpdate()
  }, [AudioBooksBeingPlayedId])

  useEffect(() => {
    const volumeController = $('.volumeController') as HTMLInputElement
    if (volumeController) {
      volumeController.value = String(volumeRate)
      handleButtonVolumeChange(volumeController)
    }
  }, [volumeController])

  const handleSlide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    if (id === AudioBooksBeingPlayedId) return
    const audioBooksSlide = $('.audioBooksSlide')

    setAudioBooksBeingPlayedId(id)
    if (audioBooksSlide) {
      audioBooksSlide.scrollTo({
        left: e.currentTarget.offsetLeft - 100
      })
      console.log(
        audioBooksSlide.scrollWidth,
        e.currentTarget.offsetLeft
      )
    }
  }

  const handleButtonPlayer = () => {
    const audio = audioRef.current

    if (audio) {
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }

      setPlayingAudio(!playingAudio)
    }
  }

  const handleButtonForOrBackWard = (option: 'backward' | 'forward') => {
    const audio = audioRef.current

    if (audio) {
      let second = 10

      if (option === 'backward') second = -second

      audio.currentTime = audio.currentTime + second
    }
  }

  const handleButtonVolumeChange = (element: HTMLInputElement) => {
    const value = element.value
    const audio = audioRef.current
    const percentage = Number(value) / 100

    console.log(percentage)
    if (audio) {
      audio.volume = percentage
      setVolumeRate(Number(value))

      element.style.background = `linear-gradient(
        to right,
        ${theme.themeColors.primary.normal} 0%,
        ${theme.themeColors.primary.normal} ${value}%,
        ${theme.themeColors.background.light} ${value}%,
        ${theme.themeColors.background.light} 100%)`
    }
  }

  const onCanPlay = () => {
    const audio = audioRef.current

    if (audio) {
      setAudioDuration(audio.duration)
    }
  }

  const onEnded = () => {
    setPlayingAudio(false)
  }

  const onTimeUpdate = () => {
    const audio = audioRef.current
    const input = inputRef.current

    if (audio && input) {
      input.value = String(audio.currentTime)
      setInputRangeBackground(input)
      setElapsedTime(audio.currentTime)
    }
  }

  const setInputRangeBackground = (element: HTMLInputElement) => {
    const percentage = Math.floor((Number(element.value) * 100) / audioDuration)

    element.style.background = `linear-gradient(
      to right,
      ${theme.themeColors.primary.normal} 0%,
      ${theme.themeColors.primary.normal} ${percentage}%,
      ${theme.themeColors.background.light} ${percentage}%,
      ${theme.themeColors.background.light} 100%)`
  }

  const ReturnTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - minutes * 60)
    let minuteValue
    let secondValue

    if (minutes < 10) {
      minuteValue = '0' + minutes
    } else {
      minuteValue = minutes
    }

    if (seconds < 10) {
      secondValue = '0' + seconds
    } else {
      secondValue = seconds
    }

    const mediaTime = minuteValue + ':' + secondValue
    return (mediaTime)
  }
  return (
    <Container>
      <AudioBooksSlide className="audioBooksSlide" >
        <div>
          {
            AudioBooksItems.map((item, index) => (
              <AudioBook
                key={index}
                actived={index === AudioBooksBeingPlayedId}
                onClick={e => handleSlide(e, index)}
              >
                <img src={item.img} alt={`Foto da Capa do livro ${item.title}`} />
                {
                  index === AudioBooksBeingPlayedId && (
                    <>
                      <h4>{item.title}</h4>
                      <legend>{item.description}</legend>
                    </>
                  )
                }
              </AudioBook>
            ))
          }
        </div>
      </AudioBooksSlide>

      {AudioBooksBeingPlayedData && (
        <>
          <Player>
            <AudioData>
              <legend>
                <span>
                  {ReturnTime(elapsedTime)}
                </span>

                <span>
                  {ReturnTime(audioDuration)}
                </span>
              </legend>
              <ProgressBar>

                <InputRange
                  ref={inputRef}
                  type="range"
                  // value={1}
                  min={0}
                  max={audioDuration}

                  onChange={(e) => {
                    const element = e.currentTarget
                    const audio = audioRef.current

                    if (audio) {
                      audio.currentTime = Number(element.value)
                    }
                  }}
                />
              </ProgressBar>
            </AudioData>

            <Controls>
              <button className="options" onClick={() => handleButtonForOrBackWard('backward')}>
                <IoIosOptions />
              </button>
              <button className="backward" onClick={() => handleButtonForOrBackWard('backward')}>
                <AiOutlineBackward />
              </button>
              <button
                className="play"
                onClick={handleButtonPlayer}
              >
                {playingAudio ? <BsPause/> : <BsPlay />}
              </button>
              <button className="forward" onClick={() => handleButtonForOrBackWard('forward')}>
                <AiFillForward />
              </button>
              <button className="volume" onClick={() => setVolumeController(!volumeController)}>
                <BsVolumeUp />

                { volumeController &&
                <input
                  type="range"
                  className="volumeController"

                  // value={String(volumeRate / 100)}
                  min={0}
                  max={100}
                  onChange={e => handleButtonVolumeChange(e.currentTarget)}
                />
                }
              </button>
            </Controls>
          </Player>

          <audio
            ref={audioRef}
            // controls
            src={AudioBooksBeingPlayedData.src}

            { ...{ onEnded, onTimeUpdate, onCanPlay }}
          >
            <source src={AudioBooksBeingPlayedData.src} type="audio/mp3" />
          </audio>
        </>
      )
      }
    </Container>
  )
}

export default Aside
