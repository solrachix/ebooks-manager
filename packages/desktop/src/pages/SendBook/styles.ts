import styled, { css } from 'styled-components'
import { rgba, darken } from 'polished'

export const Container = styled.div`${({ theme: { colors } }) => css`
  width: 100%;
  height: 100%;

  background: ${rgba(colors.themeColors.background.dark, 0.9)};

  font-size: 10px;

  main {
    width: 100%;
    height: 100%;
    padding: 2.4rem 0;

    overflow-y: auto;

    fieldset {
      border: 0;
      padding: 0 2.4rem;

      overflow: hidden;
    }

    fieldset + fieldset {
      margin-top: 6.4rem;
    }

    fieldset legend {
      font: 700 2rem Archivo;
      color: ${props => props.theme.colors.themeColors.text.normal};
      margin-bottom: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid  ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};
    }
    fieldset legend button {
      background: none;
      border: 0;
      color: ${props => props.theme.colors.themeColors.primary.normal};

      font: 700 1.6rem Archivo;
      cursor: pointer;
      transition: color 0.2s;
    }


    fieldset legend button:hover {
      color: ${props => darken(0.1, props.theme.colors.themeColors.primary.dark)};
    }

    fieldset .textarea-block {
      margin-top: 2.4rem;
    }

    fieldset .input-block + .textarea-block,
    fieldset .select-block + .input-block {
      margin-bottom: 2.4rem;
    }

    fieldset button {
      /* width: 200px;
      height: 3rem;

      color ${props => props.theme.colors.themeColors.text.light};
      background ${props => props.theme.colors.themeColors.primary.normal};
      border: none;
      border-radius: 5px;
      outline: none; */

      width: 10em;
      height: 2.8em;
      padding: 0;
      float: right;

      background: transparent;
      color: ${props => props.theme.colors.themeColors.primary.normal};
      border: 1px solid ${props => props.theme.colors.themeColors.primary.normal};
      border-radius: 8px;

      transition: color 0.3s 0.1s ease-out;

      text-align: center;
      line-height: 250%;
      outline: none;
      overflow: hidden;
      cursor: pointer;

      &:before {
        box-sizing: border-box;
        /* box-shadow: inset 0 0 0 10em ${props => props.theme.colors.themeColors.primary.normal}; */

        content: attr(data-text);
        display: block;

        margin-top: -8.6rem;
        margin-left: -5rem;

        width: 20em;
        height: 20em;

        border-radius: 50%;
        line-height: 20em;
        text-align: center;

        transition: box-shadow 0.5s ease-out;
        z-index: -1;
      }
      &:hover {
        color: ${props => props.theme.colors.themeColors.text.light};
      }
      &:hover::before {
        box-shadow: inset 0 0 0 10em ${props => props.theme.colors.themeColors.primary.normal};
      }

    }
  }

`}`
