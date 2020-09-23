// import { shade } from 'polished'
import { ThemeTypes } from './Types'

export const LightTheme: ThemeTypes = {
  title: 'Light',
  colors: {
    themeColors: {
      primary: {
        lighter: '#6866FB',
        light: '#615df0',
        normal: '#5659EB',
        dark: '#4046d4',
        darker: '#3846D4'
      },
      secondary: '#F25040',
      tertiary: '#F0F0F7',

      background: {
        lighter: '#2c323f',
        light: '#232832',
        normal: '#F0F0F7',
        dark: '#161a20',
        darker: '#12151a'
      },
      text: {
        light: '#D4C2FF',
        normal: '#9C98A6',
        dark: '#6A6180'
      }
    },

    white: '#f7f7f7',
    grey: 'aeaeb0',
    opaque: '#41414D',
    purple: '#6633cc',
    purpleDark: '#5A4B81',
    green: '#67e480',
    orange: '#E89E64',
    pink: '#FF79C6',
    blue: '#2436e8', /** #5659eb */
    lightBlur: '#3AC5FF',
    red: '#E96379',
    yellow: '#e7de79'
  }
}

export const DarkTheme: ThemeTypes = {
  title: 'Dark',
  colors: {
    themeColors: {
      primary: {
        lighter: '#6866FB',
        light: '#5659EB',
        normal: '#4347FE',
        dark: '#494CDB',
        darker: '#3846D4'
      },
      secondary: '#1C2028',
      tertiary: '#2B303A',

      background: {
        lighter: '#2c323f',
        light: '#232832',
        normal: '#1C2028',
        dark: '#161a20',
        darker: '#12151a'
      },
      text: {
        light: '#D4C2FF',
        normal: '#9C98A6',
        dark: '#6A6180'
      }
    },
    white: '#f7f7f7',
    grey: 'aeaeb0',
    opaque: '#41414D',
    purple: '#6633cc',
    purpleDark: '#5A4B81',
    green: '#67e480',
    orange: '#E89E64',
    pink: '#FF79C6',
    blue: '#2436e8', /** #5659eb */
    lightBlur: '#3AC5FF',
    red: '#E96379',
    yellow: '#e7de79'
  }
}
