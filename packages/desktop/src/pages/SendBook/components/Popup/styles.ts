import styled from 'styled-components'
import { rgba, darken } from 'polished'

import { Popup as popup } from 'reactjs-popup'

export const Container = styled(popup).attrs(({ theme: { colors } }) => {
  return {
    overlayStyle: {
      zIndex: 105,
      width: '100%',
      height: '100%',

      background: rgba(colors.themeColors.background.darker, 0.8),
      backdropFilter: 'blur(50px)'
    },
    contentStyle: {
      width: '60%'
    }
  }
})``

export const Modal = styled.div`
  .close{
    position: absolute;
    top: -230%;
    right: -28%;

    width: 4rem;
    height: 4rem;

    cursor: pointer;
  }


  button {
    /* width: 100%; */
    height: 2.9rem;
    padding: 0.6rem 1.6rem;
    margin: auto;
    margin-bottom: 1.6rem;
    margin-left: 16px;

    background: ${props => props.theme.colors.themeColors.primary.normal};
    color: ${props => props.theme.colors.themeColors.text.light};
    border-radius: 0.6rem;
    border: none;
    outline: none;

    display: flex;
    justify-content: center;
    align-items: center;

    font: 1rem Archivo;
  }
`
