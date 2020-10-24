import styled, { css } from 'styled-components'
import { rgba, saturate, darken } from 'polished'

export const Container = styled.div`
  position: absolute;
  top: 0%;
  right: -200%;
  width: calc(100% - 80px);
  height: 100vh;
  padding: 1.4rem 2rem 0rem 2rem;

  background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.80)};
  backdrop-filter: blur(10px);

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  overflow: scroll;

  .Close {
    position: relative;
    float: right;
    right: 0%;

    width: 2rem;
    height: 2rem;

    cursor: pointer;

    &:hover{
      color: ${props => props.theme.colors.themeColors.primary.normal};
    }
  }

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  z-index: 999;
`

export const Ebook = styled.div`
  width: 100%;
  height: 200px;
  margin-top: .7rem;
  margin-bottom: .7rem;
  padding-bottom: 10px;

  border-bottom: 2px solid ${props => rgba(props.theme.colors.themeColors.tertiary, 0.8)};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;

  &:last-child{
    border: none;
  }

  .cover {
    height: 100%;
    border-radius: 10px;
  }

  > div {
    width: 100%;
    height: 100%;
    padding-left: 4%;

    /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start; */

    overflow: hidden;
    /* display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; */

    display: grid;
    grid-template-rows: 18% 50% 32%;
    grid-template-columns: repeat(5, 100px);
    grid-template-areas:
      'title title title title title'
      'author author author author author'
      'button button . . .';
    /* column-gap: 1.4rem; */
    align-items: center;

    h3 {
      grid-area: title;
    }
    div {
      grid-area: author;
      font-size: .7rem;
      font-weight: 600;
      /* margin-top: 2rem; */

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      i {
        font: 600 0.8rem Archivo;
        color: ${props => props.theme.colors.themeColors.primary.normal};
      }
      span {
        width: 100%;
        margin-top: 1rem;
        display: flex;

        svg {
          width: 1.2rem;
          height: 1.2rem;
          margin-left: 6px;

          &:first-of-type{
            margin-left: 0px;
          }

          fill: ${props => props.theme.colors.themeColors.primary.normal};
        }
      }
    }

    button {
      grid-area: button;
    }


  }
`

interface ContentProps {
  mainColor: string | null;
  thumbnail: string | undefined
}
export const Content = styled.div<ContentProps>`
  width: 100%;
  margin-bottom: 10%;

  display: grid;
  grid-template-columns: 6fr 4fr;
  grid-template-rows: auto;
  column-gap: 0.6rem;
  /* justify-content: center;
  align-items: center; */

  section {
    width: 100%;
    height: fit-content;
    padding: 1.4rem;

    background: linear-gradient(90deg,
      ${props => rgba(props.theme.colors.themeColors.background.dark, 0.2)},
      ${props => rgba(props.theme.colors.themeColors.background.dark, 0.4)},
      ${props => rgba(props.theme.colors.themeColors.background.dark, 0.1)},
      ${props => rgba(props.theme.colors.themeColors.background.dark, 0.3)}
    );
    backdrop-filter: blur(10px);

    &:nth-child(2){
      ${({ mainColor, thumbnail }) => mainColor && thumbnail
     ? css`
      &:before {
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        z-index: -1;

        background:
          /* linear-gradient(90deg,
            ${rgba(saturate(0.5, mainColor), 0.1)},
            ${rgba(saturate(0.9, mainColor), 0.1)}
          ); */
          url(${thumbnail}) center center no-repeat;
        background-size: cover;
        border-radius: 10px;
        filter: blur(20px);
        opacity: 0.4;
      }

      &:after {
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        z-index: -2;
        background: linear-gradient(180deg,
          ${rgba(saturate(0.5, mainColor), 0.4)},
          ${rgba(saturate(0.6, mainColor), 0.4)},
          ${rgba(saturate(0.7, mainColor), 0.4)},
          ${rgba(saturate(0.9, mainColor), 0.6)}
        );
        /* background-size: 200%; */
        border-radius: 40px;
        filter: blur(30px);
      }
    `
     : css`
      background: ${props => props.theme.colors.themeColors.background.light};
    `
    }
    }


    border-radius: 10px;

    strong {
      font-size: .8rem;
      color: ${props => props.theme.colors.themeColors.primary.normal};
    }
    h4{
      margin-bottom: 1rem;
    }
    svg {
      margin: auto;

      color: ${({ mainColor }) => mainColor || '#fff'};
    }

    legend {
      font-size: .8rem;
      p {
        text-indent: 1.5em;
        margin-bottom: 0
      }
      p + p {
        margin-top: .4rem
      }

      .user{
        width: 100%;
        /* padding: 20px; */
        margin-top: 2rem;

        /* background: ${props => props.theme.colors.themeColors.background.normal}; */
        border-radius: 4px;

        display: grid;
        grid-template-rows: 1fr auto;
        row-gap: 0.6rem;

        p{
          border: 4px dotted ${props => props.theme.colors.themeColors.primary.darker};
          word-break: break-word;
        }

        header {
          width: 100%;

          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
          'avatar title'
          'avatar stars';
          column-gap: 0.6rem;

          justify-content: center;
          align-items: center;

          img {
            grid-area: avatar;

            width: 100%;
            min-height: 100%;

            border-radius: 50px;
          }
          h3 {
            grid-area: title;
          }
          span {
            grid-area: stars;
          }
        }
      }
    }
  }

`
