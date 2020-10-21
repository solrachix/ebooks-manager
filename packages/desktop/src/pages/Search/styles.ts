import styled, { css } from 'styled-components'
import { rgba, darken } from 'polished'

import { BiSearch } from 'react-icons/bi'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.94)};

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  header {

    > .input-block {
      z-index: 999;

      input {
        background: transparent;
        border: none;

        padding-right: 50px;

      }

      &:after {
        content: '';
        width: calc(100% - 3.2rem);
        height: 2px;

        background: ${props => props.theme.colors.themeColors.text.normal};
        opacity: .2;

        position: absolute;
        left: 1.6rem;
        right: 1.6rem;
        bottom: 0;
      }

      &:focus-within{

        &::after {
          opacity: 1;
          background: ${props => props.theme.colors.themeColors.primary.light};
        }

        & .input-icon svg {
          opacity: 1;
          color: ${({ theme }) => theme.colors.themeColors.primary.normal};
          filter: drop-shadow(0px 0px 4px ${({ theme }) => theme.colors.themeColors.primary.normal});
        }
      }

      .input-icon {
        width: 1.6rem;
        height: 1.6rem;
        top: 42%;
        right: 4%;

        svg {
          color: ${props => props.theme.colors.themeColors.text.normal};
          opacity: .2;
        }
      }
    }
  }
`

export const SearchIcon = styled(BiSearch)`
  &:hover {
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
  }
`

export const Fieldset = styled.div`${({ theme }) => css`
  width: 100%;
  height: 82%;
  border: 0;
  padding: 0 2.4rem;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    height: 100%;

    overflow: auto;

    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }

  legend {
    width: 100%;
    margin-bottom: 1rem;
    /* padding-bottom: 1.6rem; */

    border-bottom: 1px solid  ${darken(0.1, theme.colors.themeColors.tertiary)};

    font: 500 1rem Archivo;
    color: ${theme.colors.themeColors.text.normal};

    b {
      color: ${theme.colors.themeColors.primary.normal};
    }
  }
`}`

export const Ebook = styled.div`${({ theme }) => css`
  width: 160px;
  height: 240px;
  flex: 1;
  margin-top: 2%;
  margin-bottom: 2%;

  /* border-bottom: 2px solid ${rgba(theme.colors.themeColors.tertiary, 0.8)}; */

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;

  cursor: pointer;

  .cover {
    width: 160px;
    height: 240px;

    border-radius: 4px;
  }
`}`
