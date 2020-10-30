import styled from 'styled-components'
import { darken } from 'polished'

import select from 'react-select'
import creatableSelect from 'react-select/creatable'

export const Container = styled.div`
  position: relative;
  margin-bottom: 24px;

  label {
    font-size: 1rem;
    color: ${props => props.theme.colors.themeColors.text.light};
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

export const Select = styled(select)`
  .select__control{
    width: 100%;
    height: 3rem;
    margin-top: 0.8rem;
    padding: 0 1.6rem;

    background: ${props => props.theme.colors.themeColors.tertiary};
    border-radius: 0.8rem;
    border: 1px solid ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};
    box-shadow: 0px 13px 7px -10px ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};

    outline: 0;
    font: 1rem Archivo;
  }

  .select__value-container, .select__single-value {
    color: ${props => props.theme.colors.themeColors.text.normal};
  }
`

export const CreatableSelect = styled(creatableSelect)`
  .select__control{
    width: 100%;
    height: 3rem;
    margin-top: 0.8rem;
    padding: 0 1.6rem;

    background: ${props => props.theme.colors.themeColors.tertiary};
    border-radius: 0.8rem;
    border: 1px solid ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};
    box-shadow: 0px 13px 7px -10px ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};

    outline: 0;
    font: 1rem Archivo;
  }

  .select__value-container, .select__single-value{
    color: ${props => props.theme.colors.themeColors.text.normal};
  }
`
