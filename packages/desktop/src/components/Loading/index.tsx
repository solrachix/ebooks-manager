import React from 'react'

import { Container, Content, Finger, FingerItem, LastFinger } from './styles'

const Loading: React.FC = () => {
  return (
    <Container>
      <Content>
        <Finger className="finger-1">
          <FingerItem>
            <span></span><i></i>
          </FingerItem>
        </Finger>
        <Finger className="finger-2">
          <FingerItem>
            <span></span><i></i>
          </FingerItem>
        </Finger>
        <Finger className="finger-3">
          <FingerItem>
            <span></span><i></i>
          </FingerItem>
        </Finger>
        <Finger className="finger-4">
          <FingerItem>
            <span></span><i></i>
          </FingerItem>
        </Finger>
        <LastFinger>
          <div className="last-finger-item"><i></i></div>
        </LastFinger>
      </Content>
    </Container>
  )
}

export default Loading
