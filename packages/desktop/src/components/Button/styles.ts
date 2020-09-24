import styled, { keyframes } from 'styled-components'

interface ContainerProps {
  color: 'primary' | 'grey' | 'opaque' | 'purple' | 'green' | 'orange' | 'pink' | 'red' | 'yellow';
}

export const Container = styled.button<ContainerProps>`
  height: 42px;
  padding-left: 1rem;
  padding-right: 1rem;

  background: ${props => props.color === 'primary' ? props.theme.colors.themeColors.primary.normal : props.theme.colors[props.color]};
  border: 0;
  border-radius: 4px;
  color: #FFF;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Poppins;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: .4px;

  cursor: pointer;
  transition: opacity 0.2s;

  svg {
    margin-right: 8px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5 !important;
  }

  &:hover {
    opacity: 0.8;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${rotate} 2s linear infinite;

  svg {
    margin: 0;
    height: 16px;
    width: 16px;
  }
`
