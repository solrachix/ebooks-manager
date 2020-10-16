/* eslint-disable import/extensions */
import React, { useEffect, useRef } from 'react'

import Drag from './Drag'

import { Container } from './styles'

const ease = 0.09
let target = 0
let current = 0
let rAF: null | number = null

let vWidth = 0
let mWidth = 0

let cursorWidth = 0
let cursorHeight = 0

const cursorPos = {
  currentX: 0,
  currentY: 0,
  targetX: 0,
  targetY: 0
}

const cursorScale = {
  current: 1,
  target: 1
}

const HorizontalList: React.FC = ({ children }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = $('.cursor')
    const slider = sliderRef.current

    if (slider && cursor) {
      const sliderWidth = slider.scrollWidth
      slider.style.position = 'relative'
      slider.style.width = `${sliderWidth}px`

      const options = {
        listener: slider,
        multiplier: 2
      }
      const drag = new Drag(options)
      drag.on(calc)

      slider.addEventListener('mouseenter', () => {
        cursor.classList.add('is-visible')
      })

      slider.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-visible')
        // Cancel the animation frame
        cursorScale.target = 1
        cursor.classList.remove('is-pressed')
      })

      slider.addEventListener('mousemove', (e) => {
        cursorPos.targetX = e.pageX - (cursorWidth / 2)
        cursorPos.targetY = e.pageY - (cursorHeight / 2)
      })

      slider.addEventListener('mousedown', () => {
        cursorScale.target = 0.35
        cursor.classList.add('is-pressed')
      })

      slider.addEventListener('mouseup', () => {
        cursorScale.target = 1
        cursor.classList.remove('is-pressed')
      })

      requestAnimationFrame(moveCursor)
      window.addEventListener('resize', onResize)
      onResize()
    }
  }, [])

  function calc (event: { X: number; Y:number; }) {
    target += event.X
    clampTarget()
    if (rAF === null) requestAnimationFrame(moveSlider)
  }

  function moveSlider () {
    const container = sliderItemsRef.current

    if (container) {
      const offset = (target - current)
      current += offset * ease

      // Move the slider content container.
      container.style.transform = `translate3d(${current.round()}px,0,0)`

      // Stop the loop if there is no move to do.
      rAF = (Number(offset.toFixed(2)) === 0.00) ? null : requestAnimationFrame(moveSlider)
    }
  };

  const clampTarget = () => {
    const max = mWidth - vWidth

    target = target.clamp(-1 * max, 0)
  }

  const onResize = () => {
    const container = sliderItemsRef.current
    const cursor = $('.cursor')

    if (container && cursor) {
      // Cursor
      cursorWidth = cursor.getBoundingClientRect().width
      cursorHeight = cursor.getBoundingClientRect().height
      // Items
      vWidth = window.innerWidth
      mWidth = container.getBoundingClientRect().width
      console.log(container.children)

      clampTarget()
      rAF = requestAnimationFrame(moveSlider)
    }
  }

  function moveCursor () {
    const cursor = $('.cursor')

    if (cursor) {
      // Compute the current position.
      cursorPos.currentX += (cursorPos.targetX - cursorPos.currentX) * 0.09
      cursorPos.currentY += (cursorPos.targetY - cursorPos.currentY) * 0.09
      // Compute the current scale.
      cursorScale.current += (cursorScale.target - cursorScale.current) * 0.06
      // Move the cursor.
      cursor.style.transform = `translate3d(${cursorPos.currentX.round() - 14}px, ${cursorPos.currentY.round() - 14}px, 0px) scale(${cursorScale.current.round()})`
      requestAnimationFrame(moveCursor)
    }
  }

  return (
    <Container ref={sliderRef} className="slider">

      {/* <div ref={sliderItemsRef} className="slider__items">
        <div className="slider__item"></div>
        <div className="slider__item"></div>
        <div className="slider__item"></div>
        <div className="slider__item"></div>
        <div className="slider__item"></div>
        <div className="slider__item"></div>
        <div className="slider__item"></div>
        <div className="slider__item"></div>
      </div> */}

      <div ref={sliderItemsRef} className="slider__items" >
        { children }
      </div>

      <div className="cursor"></div>
    </Container>
  )
}

export default HorizontalList
