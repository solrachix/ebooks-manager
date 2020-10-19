import styled, { css } from 'styled-components'

import { BiSearch } from 'react-icons/bi'
import { darken, rgba } from 'polished'

export const Container = styled.div`
  width: 300px;
  height: 56px;

  /* border-bottom: 1px solid ${props => props.theme.colors.themeColors.primary.normal} */

  .inputBackgroundOnFocus{
    position: absolute;
    top: 0%;
    left: 0%;
    transform: scale(0);
    width: 100vw;
    height: 100vh;

    background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.8)};
    backdrop-filter: blur(10px);
    filter: blur(10px);
    opacity: 0;

    z-index: 998;
  }

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
`
export const SearchIcon = styled(BiSearch)`
  &:hover {
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
  }
`

export const Box = styled.div`
  opacity: 0;
  transform: translateY(-60rem);
  position: absolute;
  left: 4%;
  width: 300px;
  height: auto;
  min-height: 300px;
  padding: 20px;
  padding-bottom: 10px;

  background: ${props => rgba(props.theme.colors.themeColors.background.light, 0.4)};
  border-radius: 10px;
  box-shadow: 0px 2px 20px ${props => darken(0.16, props.theme.colors.themeColors.tertiary)};
  backdrop-filter: blur(6px);

  z-index: 999;

  header {
    width: 100%;
    height: 20px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  p {
    width: 100%;
    text-align: center;

    font-weight: 700;
    color: ${props => props.theme.colors.themeColors.primary.normal};

    cursor: pointer;
  }
`

interface FilterOptionsProps {
  actived?: boolean;
}
export const FilterOptions = styled.span<FilterOptionsProps>`
  margin-right: 20px;
  padding-bottom: 10px;

  /* border-radius: 10px; */
  cursor: pointer;

  font-weight: 500;
  font-size: 0.8rem;

  transition: .6s;
  ${({ actived, theme }) => actived
    ? css`
      color: ${theme.colors.themeColors.primary.normal};

      border-bottom: 2.6px solid ${theme.colors.themeColors.primary.normal};
      /* filter: drop-shadow(2px 2px 2px ${({ theme }) => theme.colors.themeColors.primary.normal}); */
    `
    : css`
      color: ${rgba(theme.colors.themeColors.text.normal, 0.8)};
    `
  };



`

export const Ebook = styled.div`
  width: 100%;
  height: 130px;
  margin-top: .7rem;
  margin-bottom: .7rem;
  padding-bottom: 10px;

  border-bottom: 2px solid ${props => rgba(props.theme.colors.themeColors.tertiary, 0.8)};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;

  &:last-of-type{
    border: none;
    margin-bottom: .3rem;
    padding-bottom: 10px;
  }

  .cover {
    height: 100%;
  }

  > div {
    width: 100%;
    padding-left: 6%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;


    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    span {
      font-size: .7rem;
      font-weight: 600;


      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-right: 6px;
      }
    }

    legend {
      font-size: .7rem;
    }
  }
`
