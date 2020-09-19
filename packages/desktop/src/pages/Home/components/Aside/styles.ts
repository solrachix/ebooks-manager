import styled, { css } from 'styled-components'

export const Container = styled.aside`
  position: absolute;
  float: right;
  right: 0%;
  width: 300px;
  height: 80%;
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
  height: 140px;
  scroll-behavior: smooth;

  > div {
    margin: 7px 0;
    margin-left: 16px;
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
  width: 60px;
  height: 102px;
  flex: 1;
  opacity: 0.4;
  ${props => props.actived && css`
    width: 60px;
    height: 120px;
    flex: 2;
    /* transform: scale(1.2); */

    opacity: 1;
  `}
  margin-right: 1.8rem;

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

export const Player = styled.div`
  width: 100%;
  height: 200px;
  padding: 16px 0;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(3, 0.8fr);
  grid-template-areas:
    'effect'
    'audioData'
    'controls';
  /* row-gap: .4rem; */
`

export const Controls = styled.div`
  width: 100%;
  height: 100%;
  grid-area: controls;

  display: grid;
  /* grid-template-rows: 100%; */
  grid-template-columns: repeat(5, 0.8fr);
  grid-template-areas:
    'options backward play forward volume';
  row-gap: .4rem;

  button {
    width: 1.4rem;
    height: 1.4rem;
    margin: auto;

    background: transparent;
    &.options {
      grid-area: options;
    }
    &.backward{
      grid-area: backward;
    }
    &.play{
      width: 1.8rem;
      height: 1.8rem;

      grid-area: play;
      background: ${props => props.theme.colors.themeColors.primary.normal};
    }
    &.forward{
      grid-area: forward;
    }
    &.volume{
      grid-area: volume;
    }
    color: ${props => props.theme.colors.white};
    border: none;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 90%;
      height: 90%;
    }
  }
`

export const AudioData = styled.div`
  width: 100%;
  height: 100%;
  grid-area: audioData;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  legend {
    width: 100%;

    display: flex;
    justify-content: space-between;
  }
`

export const ProgressBar = styled.div`
  width: 100%;
`

export const InputRange = styled.input`${({ theme }) => css`
  width: 100%;
  height: 4px;

  background: linear-gradient(${`
    to right,
    ${theme.colors.themeColors.primary.normal} 0%,
    ${theme.colors.themeColors.primary.normal} 0%,
    ${theme.colors.themeColors.background.light} 0%,
    ${theme.colors.themeColors.background.light} 100%`
  });
  /* border: solid 1px #82CFD0; */
  border-radius: 8px;

  transition: background 450ms ease-in;

  appearance: none;
  cursor: pointer;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 16px;
    height: 10px;
    background: ${theme.colors.themeColors.primary.normal};
    border: 2px solid ${theme.colors.themeColors.background.normal};
    border-radius: 5px;
  }
`}`
