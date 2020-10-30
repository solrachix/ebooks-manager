import React, { InputHTMLAttributes, useRef, useEffect, useState, ReactNode } from 'react'
import { useField } from '@unform/core'

import { Container, Eye, EyeOff, InputGroup } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  flex?: number;
  type?: string;
  name: string;
  label?: string;
  ref?: unknown;
  icon?: ReactNode;
}

const Input: React.FC<InputProps> = ({ flex, name, label, icon, ...props }) => {
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
    <Container
      isPassword={isPassword}
      className={`input-block ${type === 'file' ? 'file' : ''}`}
      style={{ flex }}>

      {label && <label className={type === 'file' ? 'file' : ''} htmlFor={name}>{label}</label> }

      <input
        ref={inputRef}
        // defaultValue={defaultValue}
        {...{
          ...props,
          ...{
            type,
            id: name,
            style: { display: type === 'file' ? 'none' : 'block' }
          }
        }}
      />
      { icon
        ? (
          <div className="input-icon">
            { icon }
          </div>
        )
        : isPassword
          ? type === 'password'
            ? <Eye onClick={() => setType('text')}/>
            : <EyeOff onClick={() => setType('password')}/>
          : null
      }
    </Container>
  )
}

export default Input
