import React from 'react'
import PropTypes from 'prop-types'

import { Text } from './styles'

interface Props {
  text: string;
  align?: string;
  size?: number;
  color?: string;
  bold?: string | number
}
const TextComponent: React.FC<Props> = ({ text, ...props }) => {
  return <Text {...props }>{ text }</Text>
}

TextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  align: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  bold: PropTypes.oneOf([
    'normal', 'bold',
    100, 200, 300, 400, 500, 600, 700, 800, 900
  ])
}

TextComponent.defaultProps = {
  size: 1,
  color: '#fff',
  bold: 'normal',
  align: 'left'
}

export default TextComponent
