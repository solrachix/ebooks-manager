import styled from 'styled-components'
import { rgba, lighten } from 'polished'

export const Container = styled.div`
    position: absolute;
    top: 0;
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${props => rgba(props.theme.colors.themeColors.background.dark, 0.2)};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        box-sizing: border-box;
    }
`

export const Content = styled.div`
    width: 112px;
    height: 70px;
    *zoom: 1;
    &:before,
    &:after {
        display: table;
        content: "";
    }
    &:after {
        clear: both;
    }
`

export const Finger = styled.div`
    float: left;
    margin: 0 2px 0 0;
    width: 20px;
    height: 100%;

    &.finger-1 {

    /* box-shadow: 0px 0px 10px 10px #fff; */
        -webkit-animation: finger-1-animation 2s infinite ease-out;
        animation: finger-1-animation 2s infinite ease-out;
    }
    &.finger-1 span {
        -webkit-animation: finger-1-animation-span 2s infinite ease-out;
        animation: finger-1-animation-span 2s infinite ease-out;
    }
    &.finger-1 i {
        -webkit-animation: finger-1-animation-i 2s infinite ease-out;
        animation: finger-1-animation-i 2s infinite ease-out;
    }

    &.finger-2 {
        -webkit-animation: finger-2-animation 2s infinite ease-out;
        animation: finger-2-animation 2s infinite ease-out;
    }
    &.finger-2 span {
        -webkit-animation: finger-2-animation-span 2s infinite ease-out;
        animation: finger-2-animation-span 2s infinite ease-out;
    }
    &.finger-2 i {
        -webkit-animation: finger-2-animation-i 2s infinite ease-out;
        animation: finger-2-animation-i 2s infinite ease-out;
    }

    &.finger-3 {
        -webkit-animation: finger-3-animation 2s infinite ease-out;
        animation: finger-3-animation 2s infinite ease-out;
    }
    &.finger-3 span {
        -webkit-animation: finger-3-animation-span 2s infinite ease-out;
        animation: finger-3-animation-span 2s infinite ease-out;
    }
    &.finger-3 i {
        -webkit-animation: finger-3-animation-i 2s infinite ease-out;
        animation: finger-3-animation-i 2s infinite ease-out;
    }
    
    &.finger-4 {
        -webkit-animation: finger-4-animation 2s infinite ease-out;
        animation: finger-4-animation 2s infinite ease-out;
    }
    &.finger-4 span {
        -webkit-animation: finger-4-animation-span 2s infinite ease-out;
        animation: finger-4-animation-span 2s infinite ease-out;
    }
    &.finger-4 i {
        -webkit-animation: finger-4-animation-i 2s infinite ease-out;
        animation: finger-4-animation-i 2s infinite ease-out;
    }
    
    
    @keyframes finger-1-animation {
        0% {
            padding: 12px 0 5px 0;
        }
        20% {
            padding: 12px 0 5px 0;
        }
        29% {
            padding: 4px 0 24px 0;
        }
        35% {
            padding: 4px 0 24px 0;
        }
        41% {
            padding: 12px 0 5px 0;
        }
        100% {
            padding: 12px 0 5px 0;
        }
    }    
    @keyframes finger-1-animation-span {
        0% {
            top: 0;
        }
        20% {
            top: 0;
        }
        29% {
            top: -7px;
        }
        35% {
            top: -7px;
        }
        41% {
            top: 0;
        }
        100% {
            top: 0;
        }
    }    
    @keyframes finger-1-animation-i {
        0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        20% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        29% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        35% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        41% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
    }    
    @keyframes finger-2-animation {
        0% {
            padding: 6px 0 2px 0;
        }
        24% {
            padding: 6px 0 2px 0;
        }
        33% {
            padding: 2px 0 16px 0;
        }
        39% {
            padding: 2px 0 16px 0;
        }
        45% {
            padding: 6px 0 2px 0;
        }
        100% {
            padding: 6px 0 2px 0;
        }
    }
    @keyframes finger-2-animation-span {
        0% {
            top: 0;
        }
        24% {
            top: 0;
        }
        33% {
            top: -7px;
        }
        39% {
            top: -7px;
        }
        45% {
            top: 0;
        }
        100% {
            top: 0;
        }
    }
    @keyframes finger-2-animation-i {
        0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        24% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        33% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        39% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        45% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
    }
    @keyframes finger-3-animation {
        0% {
            padding: 0 0 0 0;
        }
        28% {
            padding: 0 0 0 0;
        }
        37% {
            padding: 0 0 12px 0;
        }
        43% {
            padding: 0 0 12px 0;
        }
        49% {
            padding: 0 0 0 0;
        }
        100% {
            padding: 0 0 0 0;
        }
    }
    @keyframes finger-3-animation-span {
        0% {
            top: 0;
        }
        28% {
            top: 0;
        }
        37% {
            top: -7px;
        }
        43% {
            top: -7px;
        }
        49% {
            top: 0;
        }
        100% {
            top: 0;
        }
    }    
    @keyframes finger-3-animation-i {
        0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        28% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        37% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        43% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        49% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
    }
    @keyframes finger-4-animation {
        0% {
            padding: 8px 0 3px 0;
        }
        32% {
            padding: 8px 0 3px 0;
        }
        41% {
            padding: 4px 0 20px 0;
        }
        47% {
            padding: 4px 0 20px 0;
        }
        53% {
            padding: 8px 0 3px 0;
        }
        100% {
            padding: 8px 0 3px 0;
        }
        }
        @keyframes finger-4-animation-span {
        0% {
            top: 0;
        }
        32% {
            top: 0;
        }
        41% {
            top: -7px;
        }
        47% {
            top: -7px;
        }
        53% {
            top: 0;
        }
        100% {
            top: 0;
        }
    }
    @keyframes finger-4-animation-i {
        0% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        32% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        41% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        47% {
            bottom: 8px;
            height: 12px;
            -webkit-border-radius: 7px 7px 4px 4px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 7px 7px 4px 4px;
            -moz-background-clip: padding;
            border-radius: 7px 7px 4px 4px;
            background-clip: padding-box;
        }
        53% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
        100% {
            bottom: 3px;
            height: 14px;
            -webkit-border-radius: 10px 10px 7px 7px;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 10px 10px 7px 7px;
            -moz-background-clip: padding;
            border-radius: 10px 10px 7px 7px;
            background-clip: padding-box;
        }
    }
`

export const FingerItem = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    border-radius: 6px 6px 8px 8px;
    background-clip: padding-box;
    background: ${props => lighten(0.02, props.theme.colors.themeColors.background.dark)};

    span {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        padding: 5px 5px 0 5px;
    }
    span:before,
    span:after {
        content: '';
        position: relative;
        display: block;
        margin: 0 0 2px 0;
        width: 100%;
        height: 2px;
        background: ${props => props.theme.colors.blue};
    }
    i {
        position: absolute;
        left: 3px;
        bottom: 3px;
        width: 14px;
        height: 14px;
        
        border-radius: 10px 10px 7px 7px;
        background-clip: padding-box;
        background: ${props => props.theme.colors.blue};
    }
`

export const LastFinger = styled.div`
    position: relative;
    float: left;
    width: 24px;
    height: 100%;
    overflow: hidden;

    .last-finger-item {
        position: absolute;
        right: 0;
        top: 32px;
        width: 110%;
        height: 20px;

        border-radius: 0 5px 14px 0;        
        background-clip: padding-box;
        background: ${props => lighten(0.02, props.theme.colors.themeColors.background.dark)};
        -webkit-animation: last-finger-item 2s infinite linear;
        animation: last-finger-item 2s infinite linear;
    }
    .last-finger-item i {
        position: absolute;
        left: 0;
        top: -5px;
        width: 22px;
        height: 5px;

        background: ${props => props.theme.colors.blue};
        border-radius: 0px 100px 0px 0px;
        overflow: hidden;
    }
    .last-finger-item i:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 34px;
        height: 20px;
        
        border-radius: 0 0 15px 15px;
        background-clip: padding-box;
        background: ${props => props.theme.colors.blue};
    }

    @keyframes last-finger-item {
        0% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        34% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        43% {
            top: 20px;
            right: 2px;
            -webkit-border-radius: 0 8px 20px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 8px 20px 0;
            -moz-background-clip: padding;
            border-radius: 0 8px 20px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
        }
        50% {
            top: 20px;
            right: 2px;
            -webkit-border-radius: 0 8px 20px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 8px 20px 0;
            -moz-background-clip: padding;
            border-radius: 0 8px 20px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
        }
        60% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            top: 32px;
            right: 0;
            -webkit-border-radius: 0 5px 14px 0;
            -webkit-background-clip: padding-box;
            -moz-border-radius: 0 5px 14px 0;
            -moz-background-clip: padding;
            border-radius: 0 5px 14px 0;
            background-clip: padding-box;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
    }

`
