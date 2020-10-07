import styled, { css } from 'styled-components'
import { rgba, lighten, darken, saturate } from 'polished'

export const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0%;
    padding: 0px 2.6rem;

    background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.94)};

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center; */

  header {
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .currentData{
      width: 100%;
      max-width: 200px;

      line-height: 10px;
      color: ${props => rgba(props.theme.colors.themeColors.text.normal, 0.8)};
      font-family: Archivo;
      font-size: 0.8rem;
    }

    .user {
      width: 150px;

      color: ${props => rgba(props.theme.colors.themeColors.text.normal, 0.8)};
      font-weight: 900;
      font-family: Archivo;
      font-size: 0.9rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 40px;

        border-radius: 50%;
      }
    }
  }

  /* button {
    width: 100px;
    height: 50px;
    padding: 6px;

    background: transparent;
    color: ${(props) => props.theme.colors.themeColors.text.normal};
    border: 1px solid ${(props) => props.theme.colors.themeColors.primary.normal};
    border-radius: 6px;

    cursor: pointer;
  } */
`

export const Content = styled.div`
  width: 100%;
  height: auto;
  margin-top: 4%;

  display: grid;
  /* grid-template-rows: 1fr; */
  grid-template-columns: 2fr 1fr;
  grid-template-columns: minmax(0, 2fr) 1fr;
  grid-template-areas:
    'main main';
  column-gap: 1.4rem;

  main {
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 70px - 2%);
    grid-area: main;
    padding-bottom: 6rem;

    overflow: auto;

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-corner,
    &::-webkit-resizer,
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb
    {
      width: 0px;
      background: transparent;
      box-shadow: none;
    }

    h4 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        width: auto;
        line-height: 10px;
        color: ${props => rgba(props.theme.colors.themeColors.text.normal, 0.8)};
        font-family: Archivo;
        font-size: 0.8rem;

        display: flex;
        align-items: center;
        svg {
          width: 2rem;
        }
      }
    }

    .recentBooks{
      width: 100%;
      max-width: 100%;
      /* height: 100%; */
      margin-top: 4%;

      overflow-x: auto;
      /* overscroll-behavior-x: contain; */

      /* display: flex;
      flex-direction: column; */
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 1.4rem;

      /* transform-origin: right top;
      transform: rotate(-90deg) translate3d(0, -240px, 0);

      & > * {
        transform-origin: left top;
        transform: rotate(90deg) translate3d(0, calc(-240px), 0);
      } */

    }

  }

  aside {
    grid-area: sidebar;
  }

`

export const Ebook = styled.div`
  width: 240px;
  height: 180px;
  padding: 16px;
  margin-top: .7rem;
  margin-bottom: .7rem;
/*
  cursor: move;
  user-select: none; */
  /* &:first-of-type {
    margin-top: 0rem;
  }
  &:last-of-type {
    margin-bottom: 0rem; */
  /* } */

  border-radius: 10px;
  background: ${props => rgba(props.theme.colors.blue, 0.2)};

  display: flex;
  /* flex: 0.5; */
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

export const Statistics = styled.div`
  width: 100%;
  margin-top: 6%;

  display: grid;
  grid-template-columns: 1fr 1.6fr;
  column-gap: 1.4rem;

  @media(max-width: 600px){
    grid-template-columns: 100%;
    row-gap: 1.4rem;
  }

  div {
    h4 {
      width: 100%;
      padding: 20px;

      background: ${props => props.theme.colors.themeColors.background.normal};
      border-radius: 4px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        width: auto;
        line-height: 10px;
        color: ${props => rgba(props.theme.colors.themeColors.text.normal, 0.8)};
        font-family: Archivo;
        font-size: 0.8rem;

        display: flex;
        align-items: center;
        svg {
          width: 1.1rem;
          height: 1.1rem;
          margin-left: 0.5rem;
        }
      }
    }

    .autor{
      padding: 20px;
      margin-top: .2rem;

      background: ${props => props.theme.colors.themeColors.background.normal};
      border-radius: 4px;

      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      column-gap: 0.6rem;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;

        border-radius: 10px;
      }
      svg {
        margin: auto;

        color: ${props => props.theme.colors.themeColors.primary.normal};
      }
    }

    .bookStatistics{
      width: 100%;
      padding: 12px 20px;

      background: ${props => props.theme.colors.themeColors.background.normal};
      /* border-radius: 4px; */

      color: ${props => rgba(props.theme.colors.themeColors.text.normal, 0.8)};
      font-family: Archivo;
      font-size: 0.8rem;

      display: grid;
      grid-template-columns: 1fr 8fr;
      column-gap: 0.6rem;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;

        border-radius: 10px;
      }

      h5 {
        font-size: 0.9rem;
      }

      span {
        width: 100%;

        display: flex;
        justify-content: space-between;
      }

      progress {
        width: 100%;
        height: .4rem;
        margin-top: .5rem;

        background-color: ${props => props.theme.colors.themeColors.background.light};

        &::-webkit-progress-bar {
          background-color: ${props => props.theme.colors.themeColors.background.light};
        }
        &::-webkit-progress-value {
          background-color: ${props => props.theme.colors.themeColors.primary.normal} !important;
          border-radius: 10px;
        }
      }
    }
  }
`

export const UserDataAboutReading = styled.div`
  width: 100%;
  height: auto;
  margin-top: 6%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;

  @media(max-width: 400px){
    grid-template-columns: 100%;
    row-gap: 1rem;
  }

  .card {
    width: 164px;
    height: 54px;
    padding: 14px;

    background: ${props => props.theme.colors.themeColors.background.normal};
    border-radius: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.themeColors.background.dark};

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .icon {
      width: 30px;
      height: 30px;
      margin-right: 1rem;

      background: ${props => rgba(saturate(0.2, props.theme.colors.blue), 0.2)};
      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        width: 1rem;
        height: 1rem;
        color: ${props => props.theme.colors.blue};
      }

      &[data-color="blue"]{
        background: ${props => rgba(lighten(0.1, props.theme.colors.blue), 0.2)};
        svg{
          color: ${props => lighten(0.04, props.theme.colors.blue)};
        }
      }
      &[data-color="lightBlur"]{
        background: ${props => rgba(saturate(0.2, props.theme.colors.lightBlur), 0.2)};
        svg{
          color: ${props => props.theme.colors.lightBlur};
        }
      }
      &[data-color="yellow"]{
        background: ${props => rgba(saturate(0.2, props.theme.colors.yellow), 0.2)};
        svg{
          color: ${props => props.theme.colors.yellow};
        }
      }
      &[data-color="green"]{
        background: ${props => rgba(saturate(0.2, props.theme.colors.green), 0.2)};
        svg{
          color: ${props => props.theme.colors.green};
        }
      }
    }

    p {
      font-size: 0.8rem;
    }
  }
`
