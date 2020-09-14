import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import { Link as link } from 'react-router-dom'

export const Container = styled.header`
  position: relative;
  display: flex;
  width: 90px;
  height: 100%;
  top: 0;
  left: 1px;

  /* padding-left: 10px;
  padding-right: 10px; */

  box-sizing: border-box;
  background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.94)};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* box-shadow: 0px 0px 10px ${props => props.theme.colors.themeColors.primary.darker}; */

  > div {
    display: flex;
    width: 90%;
    height: 92%;
    padding: 1.4rem 0;

    background-color: ${props => props.theme.colors.themeColors.primary.dark};
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    *::-moz-selection,
    *::selection,
    input::-moz-selection,
    input::selection {
      color: ${props => props.theme.colors.white};
      background: ${props => props.theme.colors.blue};
    }

    -webkit-app-region: drag;
    -webkit-user-select: none;

    font-family: Nunito;
    line-height: 30px;

    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between; /** center */
    align-items: center;
  }

  justify-content: flex-start;
  align-items: center;
  z-index: 99999;
`

export const Titleshown = styled.div`
  width: 100%;
  height: 50%;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  zoom: 1;
  overflow: hidden;

  .square {
    position: absolute;
    margin-top: -63px;
    left: -50%;
    /* top: 38.6%; */
    /* margin-top: -4.5rem; */
    width: 50%;
    height: 2.4rem;

    background: ${props => props.theme.colors.white};
    border-radius: 5px;

    z-index: 15;
  }
`

interface LinkProps {
  actived?: boolean
}

export const LINK_TAB_SIZE = 50

export const Link = styled(link)<LinkProps>`
  -webkit-app-region: no-drag;
  -webkit-user-select: text;
  width: ${LINK_TAB_SIZE}px;
  height: ${LINK_TAB_SIZE}px;

  ${({ actived = false, theme }) => actived ? css`
    /* background: ${theme.colors.white};
    border-radius: 5px; */

    svg {
      color: ${theme.colors.themeColors.primary.normal};
    }
  `
  : css`
    svg {
      color: ${theme.colors.white};
    }
  `}

  text-align: center;
  font-size: 1.2em;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 20;
`

export const Logo = styled.div`
  width: 2.6rem;
  height: 2.6rem;

  cursor: pointer;
  /* border-radius: 50%; */
  -webkit-app-region: no-drag;

  .logoIcon {
    width: 100%;
    height: 100%;
  }

  .close {
    display: none;
    opacity: 0;
    width: 100%;
    height: 100%;

    color: ${props => props.theme.colors.white}
  }
`

export const WindowActions = styled.div`
  display: flex;
  position: absolute;
  top: 2rem;
  left: 0;
  transform: translateX(-6rem);
  width: 36px;
  height: 100px;

  opacity: 0;
  background: ${props => props.theme.colors.white};
  border-radius: 10px;

  -webkit-app-region: no-drag;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  z-index: -1;
`

interface MacActionButtonProps {
  color: 'close' | 'minimize' | 'maximize';
}

export const MacActionButton = styled.button<MacActionButtonProps>`${(props) => {
  const colors = {
    close: props.theme.colors.red,
    minimize: props.theme.colors.yellow,
    maximize: props.theme.colors.green
  }

  return css`
    background: ${colors[props.color]};
    border: 0;
    width: 12px;
    height: 12px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    & + button {
      margin-left: 8px;
    }

    svg {
      width: 8px;
      height: 8px;
      opacity: 0.9;
      display: none;
    }

    &:hover svg {
      display: block;
    }

    &:active {
      opacity: 0.6;
    }

    &:focus {
      outline: 0;
    }
  `
}}`

interface DefaultActionButtonProps {
  pointerEvents: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'visibleFill' | 'painted',

}
export const DefaultActionButton = styled.button<DefaultActionButtonProps>`
  display: flex;
  /* float: left; */
  height: 100%;
  width: 33%;

  background: transparent;
  border: 0;

  color: ${({ pointerEvents = 'auto', theme }) => pointerEvents === 'none' ? theme.colors.white : theme.colors.themeColors.primary.normal};

  font-weight: 900;
  font-size: .6em;
  font-family: Nunito;
  text-align: center;

  cursor: default;
  pointer-events: ${({ pointerEvents = 'auto' }) => pointerEvents};

  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* & + button {
    margin-left: 8px;
  } */

  &:hover svg {
    color: ${props => props.theme.colors.themeColors.primary.lighter};
  }

  &:active {
    opacity: 0.6;
  }

  &:focus {
    outline: 0;
  }
`

export const MenuButton = styled.div`
  /* position: absolute; */
  display: flex;
  width: 1.4rem;
  height: 1.4rem;

  text-align: center;
  color: ${props => props.theme.colors.white};
  font-weight: 900;
  font-size: 1em;
  font-family: Nunito;

  cursor: pointer;
  z-index: 1;

  justify-content: center;
  align-items: center;

  -webkit-app-region: no-drag;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`
