import styled, { css, DefaultTheme } from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.94)};

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  .webViewer {
    width: 100%;
    height: 100vh;
  }
`

export const WebViewerCSSVariables = ({ colors }: DefaultTheme): string => css`
  .search-panel-container{
    background: ${rgba(colors.themeColors.background.light, 0.9)}!important;
    backdrop-filter: blur(10px)!important;
  }

  --blue-1: ${colors.themeColors.primary.darker};
  --blue-2: ${colors.themeColors.primary.dark};
  --blue-3: ${colors.themeColors.primary.light};
  --blue-4: ${colors.themeColors.primary.lighter};
  --blue-5: #1A4971;
  --blue-6: ${colors.themeColors.primary.normal};

  --gray-0: ${colors.themeColors.background.darker};
  --gray-1: ${colors.themeColors.background.dark};
  --gray-2: ${colors.themeColors.background.normal};
  --gray-3: ${colors.themeColors.background.light};
  --gray-4: ${colors.themeColors.background.lighter};
  --gray-5: ${colors.themeColors.text.dark};
  --gray-6: ${colors.themeColors.text.normal};
  --gray-7: ${colors.themeColors.text.light};
  --gray-8: #DEE2E6;
  --gray-9: #E7EBEE;
  --gray-10: #F1F3F5;
  --gray-11: #F8F9FA;
  --gray-12: #FFFFFF;


  --panel-background: var(--gray-2);
  --faded-component-background: var(--gray-1);
  --signature-draw-background: var(--gray-3);
  --toggle-zoom-overlay-background: var(--gray-4);
  --component-background: var(--gray-2);
  --mobile-tool-style-popup: var(--gray-3);
  --preset-background: var(--gray-3);
  --mobile-divider: var(--gray-7);
  --mobile-presets-background: var(--gray-3);
  --ribbons-background: var(--gray-2);
  --box-shadow: var(--gray-5);
  --document-box-shadow: var(--gray-5);
  --focus-border: var(--blue-6);
  --scroll-chevron-color: var(--gray-5);
  --icon-color: var(--gray-7);
  --faded-text: var(--gray-6);
  --text-color: var(--gray-11);
  --placeholder-text: var(--gray-5);
  --ribbon-active-color: var(--blue-6);
  --no-presets-text: var(--gray-6);
  --disabled-text: var(--gray-4);
  --disabled-icon: var(--gray-4);
  --slider-filled: var(--blue-6);
  --slider-background: var(--gray-4);
  --badge-fill: var(--gray-4);
  --badge-text-color: var(--gray-12);
  --primary-button: var(--blue-6);
  --primary-button-text: var(--gray-11);
  --secondary-button-text: var(--blue-6);
  --divider: var(--gray-4);
  --side-panel-border: var(--panel-background);
  --border: var(--gray-4);
  --selected-icon-color: var(--gray-8);
  --view-header-icon-active-fill: var(--gray-12);
  --document-background-color: transparent;
  --view-header-button-hover: var(--blue-3);
  --view-header-button-active: var(--blue-4);
  --popup-button-hover: var(--blue-3);
  --popup-button-active: var(--blue-4);
  --primary-button-hover: var(--blue-5);
  --secondary-button-hover: var(--blue-5);
  --color-palette-border: var(--gray-7);
  --modal-negative-space: rgba(0, 0, 0, 0.3);
  --spinner-negative-space: rgba(0, 0, 0, 0.3);
  --white-color-palette-border: transparent;
  --list-separator-color: var(--gray-7);
  --scrollbar-color: var(--blue-6);
  --note-box-shadow: transparent;
  --tools-header-background: var(--gray-1);
  --view-header-background: ${rgba(colors.themeColors.background.light, 1)};
  --tools-overlay-background: var(--gray-2);
  --tools-button-hover: var(--blue-1);
  --tools-button-active: var(--blue-2);
  --tools-overlay-button-hover: var(--blue-3);
  --tools-overlay-button-active: var(--blue-4);
  --outline-color: var(--blue-6);
  --outline-hover: var(--blue-3);
`.toString().replaceAll(',', '')

export const SideBar = styled.aside`${({ theme: { colors: { themeColors, white } } }) => css`
  position: absolute;
  right: 0%;
  width: 60%;
  /* height: 50vh; */
  padding: 20px;
  top: 50%;
  transform: translateY(-50%);

  color: ${white};
  background: ${rgba(themeColors.background.darker, 0.6)};
  backdrop-filter: blur(4px);
  border-radius: 8px;

  .puller{
    position: absolute;
    width: 30px;
    height: 40px;
    margin-left: -50px;
    top: 50%;
    transform: translateY(-50%);

    background: ${rgba(themeColors.background.darker, 0.6)};
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }



`}`

interface EbookProps {
  active: boolean;
}

export const Ebook = styled.div<EbookProps>`${({ active, theme: { colors: { themeColors, white } } }) => css`
  min-width: 180px;
  min-height: 16rem;

  cursor: grab;
  &:active{
    cursor: grabbing;
  }

  &:not(:first-of-type) {
    margin-left: 1.6rem;
  }

  ${active && css`
    img { opacity: 0.6; }
  `}

  border-radius: 4px;
  /* background: red; */

  display: flex;
  flex: 0 0 180px;
  justify-content: center;
  img {
    width: 100%;
    min-height: 100%;
  }
`}`
