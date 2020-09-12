import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0%;
    padding: 0;

    background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.94)};

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    button {
        width: 100px;
        height: 50px;
        padding: 6px;

        background: transparent;
        color: ${(props) => props.theme.colors.themeColors.text.normal};
        border: 1px solid ${(props) => props.theme.colors.themeColors.primary.normal};
        border-radius: 6px;

        cursor: pointer;
    }
`
