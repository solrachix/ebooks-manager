import React, { ButtonHTMLAttributes } from 'react'

import { Container, Loading } from './styles'
import { FiLoader } from 'react-icons/fi'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: 'primary' | 'grey' | 'opaque' | 'purple' | 'green' | 'orange' | 'pink' | 'red' | 'yellow';
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  type = 'button',
  loading = false,
  ...rest
}) => {
  return (
    <Container disabled={loading} color={color} type={type} {...rest}>
      {loading
        ? (
          <Loading>
            <FiLoader />
          </Loading>
        )
        : children
      }
    </Container>
  )
}

export default Button
