import React from 'react'
import PropTypes from 'prop-types'

import { Container, Select, CreatableSelect, Menu } from './styles'

export interface OptionsType {value: string|number; label: string}

interface SelectProps {
  flex?: number;
  required?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  name: string;
  label: string;
  options: OptionsType[];
  defaultValue?: OptionsType;
  onChange?(props: OptionsType): void;
  onCreateOption?: (inputValue: any) => void
}

const SelectComponent: React.FC<SelectProps> = ({ isClearable = false, flex, name, label, ...props }) => {
  return (
    <Container className="Select-block" style={{ flex }}>
      <label htmlFor={name}>{label}</label>

      {
        isClearable
          ? <CreatableSelect
            classNamePrefix="select"
            menuPortalTarget={document.body}
            // onChange={(newValue, actionMeta) => console.log(newValue, actionMeta)}
            onCreateOption={(inputValue) => console.log(inputValue)}

            {...props}
          />
          : <Select
            classNamePrefix="select"
            menuPortalTarget={document.body}
            // defaultValue={colourOptions[0]}
            // isRtl={isRtl}

            // cacheOptions
            // defaultOptions
            {...props}
          />
      }
    </Container>
  )
}

SelectComponent.propTypes = {
  isClearable: PropTypes.bool,
  required: PropTypes.bool,
  flex: PropTypes.number,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}

SelectComponent.defaultProps = {
  isClearable: false
}

export default SelectComponent
