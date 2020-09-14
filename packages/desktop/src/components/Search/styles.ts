import styled, { css } from 'styled-components'

import { BiSearch } from 'react-icons/bi'
import { darken, rgba } from 'polished'

export const Container = styled.div`
  width: 300px;
  height: 60px;

  /* border-bottom: 1px solid ${props => props.theme.colors.themeColors.primary.normal} */

  > .input-block {

    input {
      background: transparent;
      border: none;

      padding-right: 50px;
    }

    .input-icon {
      width: 1.6rem;
      height: 1.6rem;
      top: 42%;
      right: 4%;
    }
  }
`
export const SearchIcon = styled(BiSearch)`
  color: ${({ theme }) => theme.colors.themeColors.primary.normal};

  filter: drop-shadow(0px 0px 4px ${({ theme }) => theme.colors.themeColors.primary.normal});

  &:hover {
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
  }
`

export const Box = styled.div`
  position: absolute;
  left: 4%;
  width: 300px;
  height: auto;
  min-height: 300px;
  padding: 20px;

  background: ${props => rgba(props.theme.colors.themeColors.tertiary, 0.4)};
  border-radius: 10px;
  box-shadow: 0px 2px 20px ${props => darken(0.16, props.theme.colors.themeColors.tertiary)};
  backdrop-filter: blur(6px);

  z-index: 99999;

  header {
    width: 100%;
    height: 20px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
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
