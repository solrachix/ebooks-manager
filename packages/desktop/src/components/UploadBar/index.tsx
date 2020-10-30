import React, { useState, useEffect } from 'react'

import { Container } from './styles'

const UploadBar: React.FC = () => {
  const [percent, setPercent] = useState(0)

  setTimeout(() => percent < 100 && setPercent(percent + 5), 150)
  useEffect(() => {
    console.log(percent)
  }, [])

  return (
    <Container className="upload"
      s={percent / 100}
      r={'90deg'}

      x={'0px'}
      y={'-18px'}
      percent={percent}
    >
      <div className="text">
        <strong><span>Uploading</span> 3 files</strong>
        <div>
          <small>%</small>
          <div>
            <small>
              <span data-seconds>0</span> seconds left
            </small>
            <small>Paused</small>
          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <a href="" className="btn play">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.09437962,6 L13,6 C14,5.89116285 14.5,5.39116285 14.5,4.5 C14.5,3.60883715 14,3.10883715 13,3 L12,3 L4.09437962,3 L3,3 C2,3.10728568 1.5,3.60728568 1.5,4.5 C1.5,5.39271432 2,5.89271432 3,6 L4.09437962,6 Z"></path>
              </svg>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.09437962,6 L13,6 C14,5.89116285 14.5,5.39116285 14.5,4.5 C14.5,3.60883715 14,3.10883715 13,3 L12,3 L4.09437962,3 L3,3 C2,3.10728568 1.5,3.60728568 1.5,4.5 C1.5,5.39271432 2,5.89271432 3,6 L4.09437962,6 Z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="btn cancel"></a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <polygon points="7.4,10 6,8.6 3.3,11.3 0,8 0,16 8,16 4.7,12.7 "></polygon>
                <polygon points="11.3,3.3 8.6,6 10,7.4 12.7,4.7 16,8 16,0 8,0 "></polygon>
              </svg>
            </a>
          </li>

        </ul>
      </nav>
      <div className="percent">
        <span></span>
        <div>
          <svg preserveAspectRatio="none" viewBox="0 0 600 12">
            <path d="M0,1 L200,1 C300,1 300,11 400,11 L600,11" stroke="currentColor" fill="none"></path>
          </svg>
        </div>
      </div>

    </Container>
  )
}

export default UploadBar
