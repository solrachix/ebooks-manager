import styled from 'styled-components'
import { rgba } from 'polished'

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

export const Content = styled.div`
  width: 100%;
  padding: 1.4rem;

  background: ${props => props.theme.colors.themeColors.background.light};
  border-radius: 10px;

  h4{
    margin-bottom: 1rem;
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
  }
`
