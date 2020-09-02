import styled from 'styled-components'

import { rgba } from 'polished'
import { Resizable } from 're-resizable'

interface ContainerProps {
    loading: boolean
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => rgba(theme.colors.themeColors.background.dark, 0.9)};
    border: none;

    #webview{
        flex: 1;

        width: 50%;
        height: 100%;

        background: transparent;
        filter: ${({ loading }) => loading ? 'blur(5px)' : null};
        border: none;

        flex-grow: 1;
    }
    #DevTools {
        flex: 1;
        width: 100%;
        height: 100%;
        background: transparent;
        filter: ${({ loading }) => loading ? 'blur(5px)' : null};
        border: none;
    }

`

interface ContainerDevtoolsProps {
    open: boolean;
}
export const ContainerDevtools = styled(Resizable).attrs({
  enable: { top: false, right: false, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false },
  defaultSize: {
    width: '50%',
    height: '100%'
  },
  maxWidth: '80%',
  minWidth: 240
})<ContainerDevtoolsProps>` 
    background: transparent;
    border-left: 1px solid ${props => props.theme.colors.themeColors.background.lighter};

    display: ${props => props.open ? 'block' : 'none'}
  `
