import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  position: relative;
  margin-bottom: 24px;

  label {
    color: ${props => props.theme.colors.themeColors.text.light};
    font-size: 1rem;

    span {
      margin-left: 1rem;
      color: ${props => props.theme.colors.themeColors.text.normal};
      font-size: 1rem;
    }
  }

  textarea {
    width: 100%;
    height: 10rem;
    min-height: 8rem;
    resize: vertical;
    margin-top: 0.8rem;
    padding: 0.8rem 1rem;

    background: ${props => props.theme.colors.themeColors.tertiary};
    color: ${props => props.theme.colors.themeColors.text.normal};
    border-radius: 0.8rem;
    border: 1px solid ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};
    box-shadow: 0px 13px 7px -10px ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};

    outline: 0;
    font: 1rem Archivo;
  }
  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${props => props.theme.colors.themeColors.primary.light};
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 8px;
  }
  & + & {
    margin-top: 1.4rem;
  }
  @media (min-width: 700px) {
    & + & {
      margin-top: 0;
    }
  }
`
