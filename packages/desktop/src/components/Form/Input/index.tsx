import React, { InputHTMLAttributes, useRef, useEffect, useState } from 'react'
import { useField } from '@unform/core'

import { Container, Eye, EyeOff, InputGroup } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  flex?: number;
  type?: string;
  name: string;
  label?: string;
  ref?: any;
}

const Input: React.FC<InputProps> = ({ flex, name, label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // const { fieldName, registerField, defaultValue, error } = useField(name)
  const [type, setType] = useState(props.type)
  const isPassword = props.type === 'password'

  useEffect(() => {
    if (inputRef.current) {
      // registerField({
      //   name: fieldName,
      //   path: 'value',
      //   ref: inputRef.current
      // })
    }
  }, [])

  return (
    <Container isPassword={isPassword} className="input-block" style={{ flex }}>

      {label && <label htmlFor={name}>{label}</label> }
      <input
        ref={inputRef}
        // defaultValue={defaultValue}
        {...{ ...props, ...{ type, id: name } }} />
      { isPassword
        ? type === 'password'
          ? <Eye onClick={() => setType('text')}/>
          : <EyeOff onClick={() => setType('password')}/>
        : null
      }
    </Container>
  )
}

export default Input
