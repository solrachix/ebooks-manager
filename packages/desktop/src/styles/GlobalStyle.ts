import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    background: transparent;
    -webkit-backdrop-filter:blur(10px);
    overflow: hidden;

    min-height: 100%;
    height: 100%;
    max-height: 100%;

    display: flex;
  }

  body {
    color: ${props => props.theme.colors.themeColors.text.normal};
    /* background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.6)}; */
  }

  body, input, button {
    font: 400 16px Roboto, sans-serif;
  }

  strong, h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  .react-resizable {
    position: relative;
  }

  .react-resizable-handle {
    display: flex;
    justify-content: center;
    user-select: none;
    cursor: ew-resize;
    position: absolute;
    font-size: 24px;

    &::before {
      width: 1px;
      height: 24px;
      background: ${props => props.theme.colors.themeColors.background.lighter};
      content: '';
    }
  }

  .react-resizable-handle-e {
    right: 0;
    padding-right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    width: 360px;
    background: ${props => props.theme.colors.themeColors.background.dark};
    border: 1px solid ${props => props.theme.colors.themeColors.background.lighter};
    padding: 16px;
    border-radius: 4px;

    &:focus {
      outline: 0;
    }
  }

  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-corner,
  *::-webkit-resizer,
  *::-webkit-scrollbar-button
  {
      width: 100%;
      height: 100%;
      background: ${props => props.theme.colors.themeColors.background.dark};
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: transparent;
      overflow: visible;
  }
  *::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.blue};
      border-radius: 50px;
  }
`
