import styled from 'styled-components'

import { rgba } from 'polished'

const $itemSize = '240px'
const $cursorSize = '2rem'

export const Container = styled.nav`
  width: 100%;
  height: 200px;

  .cursor {
    pointer-events: none;
    position: fixed;
    height: ${$cursorSize};
    width: ${$cursorSize};
    top: 0;
    left: 0;
    will-change: transform;

    z-index: 999999999999999999;

    border: 1px solid lightsalmon;
    border-radius: 50%;
    opacity: 0;
    transition: opacity .2s ease-out;

    @media (hover: none) {
      display: none;
    }

    &.is-visible {
      opacity: 1;
    }

    &.is-pressed {
      transform: scale(.5);
      background: lightsalmon;
    }
  }
`

export const Ebook = styled.div`
  width: ${$itemSize};
  height: 180px;
  padding: 16px;
  margin-top: .7rem;
  margin-bottom: .7rem;

  cursor: grab;
  &:active{
    cursor: grabbing;
  }

  &:not(:first-of-type) {
    margin-left: 1.6rem;
  }

  border-radius: 10px;
  background: ${props => rgba(props.theme.colors.blue, 0.2)};

  flex: 0 0 ${$itemSize};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;

  .cover {
    height: 100%;

    border-radius: 10px;
  }

  > div {
    width: 100%;
    padding-left: 6%;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;

    h5{
      font-weight: 1000;
      font-size: .9rem;

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    span {
      line-height: 1.6rem;
      font-size: .6rem;
      font-weight: 600;
      margin-top: 2%;

      opacity: .8;

      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-right: 6px;
      }
    }

    .stars {
      display: flex;
      margin-top: 4%;

      svg {
        margin-right: 2%;
      }
    }
  }
`
