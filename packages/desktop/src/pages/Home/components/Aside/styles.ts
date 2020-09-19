import styled, { css } from 'styled-components'

export const Container = styled.aside`
  position: absolute;
  float: right;
  right: 0%;
  width: 300px;
  height: 100%;
  padding: 40px;


  background: ${props => props.theme.colors.themeColors.background.normal};
  border-radius: 10px 0px;

  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-corner,
  *::-webkit-resizer,
  *::-webkit-scrollbar-button,
  *::-webkit-scrollbar,
  *::-webkit-scrollbar-thumb
  {
    width: 0px;
    background: transparent;
  }
`

export const AudioBooksSlide = styled.div`
  overflow: scroll;
  width: 100%;
  height: 180px;
  scroll-behavior: smooth;

  > div {
    margin: 7px 0;
    padding-bottom: 10px;

    -webkit-transition: 450ms -webkit-transform;
    transition: 450ms -webkit-transform;
    transition: 450ms transform;
    transition: 450ms transform, 450ms -webkit-transform;

    font-size: 0;
    white-space: nowrap;

    display: flex;
    align-items: center;
  }
`

interface AudioBookProps {
  actived: boolean;
}
export const AudioBook = styled.div<AudioBookProps>`
  position: relative;
  width: 100px;
  height: 142px;
  flex: 1;
  opacity: 0.4;
  ${props => props.actived && css`
    width: 100px;
    height: 160px;
    flex: 2;
    /* transform: scale(1.2); */

    opacity: 1;
  `}
  margin-right: 2rem;

  font-size: 1rem;

  cursor: pointer;
  /* background: red; */

  -webkit-transition: 450ms all;
  transition: 450ms all;
  transform-origin: center left;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 76%;
    padding: 4px;

    border: 1px solid ${props => props.theme.colors.themeColors.primary.normal};
    border-radius: 10px;
  }

  h4 {
    font-weight: 1000;
    font-size: .9rem;
    margin-top: 2%;
    margin-bottom: 2%;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  legend {
    width: 100%;
    /* line-height: 1.6rem; */
    font-size: .6rem;
    font-weight: 600;
    text-align: center;

    opacity: .6;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
