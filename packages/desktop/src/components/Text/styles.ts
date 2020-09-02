import styled from 'styled-components'

interface Props {
  align?: string;
  size?: number;
  color?: string;
  bold?: string | number
}

export const Text = styled.p<Props>`
  width: auto;
  max-width: 100%;
  font-family: Roboto, sans-serif;
  text-align: ${({ align }) => align};
  font-size: ${({ size }) => size}em;
  font-weight: ${({ bold }) => bold};
  color: ${({ color }) => color};
  margin: 0;
  word-break: break-word;
`
