import styled from 'styled-components'
import { darken, rgba } from 'polished'

import { FiEye, FiEyeOff } from 'react-icons/fi'

interface Props {
  isPassword: boolean
}
export const Container = styled.div<Props>`
  width: 100%;
  margin-bottom: 24px;
  label {
    color: ${props => props.theme.colors.themeColors.text.light};
    font-size: 1rem;
  }
  position: relative;

  input {
    width: 100%;
    height: 3rem;
    margin-top: 0.8rem;
    padding: 0 1.6rem;

    background: ${props => props.theme.colors.themeColors.tertiary};
    color: ${props => props.theme.colors.themeColors.text.normal};
    border-radius: 0.8rem;
    border: 1px solid ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};
    box-shadow: 0px 13px 7px -10px ${props => rgba(darken(0.1, props.theme.colors.themeColors.tertiary), 0.4)};

    outline: 0;
    font: 1rem Archivo;
  }

  .input-icon{
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 60%;
    right: 6%;

    cursor: pointer;
    color: ${({ theme }) => theme.colors.themeColors.text.light};

    &:hover {
      color: ${({ theme }) => theme.colors.themeColors.primary.normal};
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${props => props.theme.colors.themeColors.primary.light};
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
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

export const Eye = styled(FiEye)`
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 60%;
  right: 6%;

  cursor: pointer;
  color: ${({ theme }) => theme.colors.themeColors.text.light};

  &:hover {
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
  }
`
export const EyeOff = styled(FiEyeOff)`
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 60%;
  right: 6%;

  cursor: pointer;
  color: ${({ theme }) => theme.colors.themeColors.text.light};

  &:hover {
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
  }
`

export const InputGroup = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  column-gap: 1.6rem;

  align-items: center;

  @media (max-width: 750px) {
   flex-direction: column
  }
`
