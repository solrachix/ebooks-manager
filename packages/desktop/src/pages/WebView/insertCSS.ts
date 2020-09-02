import { css, ThemeConsumer } from 'styled-components'
import { ThemeTypes } from '../../styles/themes/Types'

export default function name (theme: ThemeTypes):string {
  console.log(ThemeConsumer)
  return css`
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner,
  ::-webkit-resizer,
  ::-webkit-scrollbar-button
  {                    
      width: 100%;
      height: 100%;
      background: ${theme.colors.themeColors.background.dark};
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: transparent;
      overflow: visible;
  }
  ::-webkit-scrollbar-thumb {
      background: ${theme.colors.blue};
      border-radius: 50px;
  }
`.join('')
}
