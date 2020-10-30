import styled from 'styled-components'

interface Props {
  percent: number;
  r: string;
  s: number;
  x: string;
  y: string;
}
export const Container = styled.div<Props>`
  :root {
    --primary: #5628EE;
    --success: #0EAC70;
    --grey-light: #99A3BA;
    --grey: #6C7486;
    --grey-dark: #3F4656;
    --light: #CDD9ED;
    --lighter: #E4ECFA;
    --lightest: #EEF4FF;
    --pale: #F5F9FF;
    --shadow: rgba(18, 22, 33, .05);
  }
  position: absolute;
  top: -80%;

  counter-increment: percent ${props => props.percent};
  background: #fff;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 4px 16px -1px var(--shadow);
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  position: relative;
  overflow: hidden;
  padding: 32px 20px;
  font-family: Roboto, Arial;
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  .percent {
    background: var(--pale);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    -webkit-transform-origin: 0 50%;
            transform-origin: 0 50%;
    overflow: hidden;
    -webkit-transition: background .6s ease, -webkit-transform .16s ease;
    transition: background .6s ease, -webkit-transform .16s ease;
    transition: background .6s ease, transform .16s ease;
    transition: background .6s ease, transform .16s ease, -webkit-transform .16s ease;
    -webkit-transform: scaleX(calc(${props => props.percent} / 100));
            transform: scaleX(calc(${props => props.percent} / 100));
  }
  .percent span {
    display: block;
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 19px;
    height: 2px;
    opacity: 0;
    -webkit-transform: translateY(0.5px);
            transform: translateY(0.5px);
    -webkit-transition: -webkit-transform .8s ease;
    transition: -webkit-transform .8s ease;
    transition: transform .8s ease;
    transition: transform .8s ease, -webkit-transform .8s ease;
  }
   .percent span:before,  .percent span:after {
    --r: 0;
    --s: .5;
    content: '';
    position: absolute;
    top: 0;
    height: 2px;
    border-radius: 1px;
    background: var(--primary);
    -webkit-transition: background .8s ease, height .3s ease, -webkit-transform .8s ease;
    transition: background .8s ease, height .3s ease, -webkit-transform .8s ease;
    transition: background .8s ease, transform .8s ease, height .3s ease;
    transition: background .8s ease, transform .8s ease, height .3s ease, -webkit-transform .8s ease;
    -webkit-transform: rotate(${props => props.r}) scaleY(${props => props.s});
            transform: rotate(${props => props.r}) scaleY(${props => props.s});
  }
   .percent span:before {
    right: 0;
    width: 64%;
    -webkit-transform-origin: 0 50%;
            transform-origin: 0 50%;
  }
   .percent span:after {
    left: 0;
    width: 38%;
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
  }
   .percent div {
    --x: 0;
    -webkit-transform: translateX(${props => props.x});
            transform: translateX(${props => props.x});
    -webkit-transition: -webkit-transform 1s ease;
    transition: -webkit-transform 1s ease;
    transition: transform 1s ease;
    transition: transform 1s ease, -webkit-transform 1s ease;
    position: absolute;
    left: 0;
    bottom: 8px;
    width: 300%;
  }
   .percent svg {
    display: block;
    height: 12px;
    width: 100%;
    stroke-width: 1.2px;
    color: var(--primary);
    -webkit-transition: color .5s ease;
    transition: color .5s ease;
  }
  &.paused:not(.finished) .percent div {
    --x: -66.66%;
  }
  &.paused:not(.finished) .percent div svg {
    color: var(--light);
    -webkit-animation: down .8s linear forwards;
            animation: down .8s linear forwards;
  }
  &.paused:not(.finished) .text > div div small:first-child {
    opacity: 0;
  }
  &.paused:not(.finished) .text > div div small:last-child {
    opacity: 1;
    -webkit-transition-delay: .4s;
            transition-delay: .4s;
  }
  &.finished .percent {
    background: #fff;
  }
  &.finished .percent span {
    opacity: 1;
    -webkit-transform: translate(-20px, -19px);
            transform: translate(-20px, -19px);
  }
  &.finished .percent span:before, &.finished .percent span:after {
    --s: 1;
    background: var(--grey-light);
    -webkit-transition: background .6s ease, -webkit-transform .6s ease .45s;
    transition: background .6s ease, -webkit-transform .6s ease .45s;
    transition: background .6s ease, transform .6s ease .45s;
    transition: background .6s ease, transform .6s ease .45s, -webkit-transform .6s ease .45s;
    -webkit-animation: check .4s linear forwards .6s;
            animation: check .4s linear forwards .6s;
  }
  &.finished .percent span:before {
    --r: -50deg;
  }
  &.finished .percent span:after {
    --r: 38deg;
  }
  &.finished .percent svg {
    opacity: 0;
  }
  &.finished .text {
    --y: 0;
  }
  &.finished .text > div {
    opacity: 0;
  }
  &.finished nav {
    opacity: 0;
    pointer-events: none;
  }
   .text {
    --y: -18px;
    position: relative;
    z-index: 1;
    -webkit-transform: translateY(${props => props.y});
            transform: translateY(${props => props.y});
    -webkit-transition: -webkit-transform .6s ease;
    transition: -webkit-transform .6s ease;
    transition: transform .6s ease;
    transition: transform .6s ease, -webkit-transform .6s ease;
  }
   .text strong {
    font-weight: 400;
    font-size: 14px;
    display: block;
    color: var(--grey-dark);
  }
   .text > div {
    position: absolute;
    left: 0;
    top: 100%;
    -webkit-transform: translateY(6px);
            transform: translateY(6px);
    line-height: 20px;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
            align-items: center;
    -webkit-transition: opacity .4s ease;
    transition: opacity .4s ease;
  }
   .text > div small {
    white-space: nowrap;
    vertical-align: top;
    display: block;
    font-size: 12px;
    color: var(--grey-light);
  }
   .text > div > small {
    width: 30px;
    text-align: center;
  }
   .text > div > small:before {
    content: counter(percent);
  }
   .text > div div {
    vertical-align: top;
    display: inline-block;
    position: relative;
    margin-left: 4px;
  }
   .text > div div:before {
    content: '';
    width: 2px;
    height: 2px;
    display: block;
    border-radius: 50%;
    background: var(--grey-light);
    display: inline-block;
    vertical-align: top;
    margin-top: 9px;
  }
   .text > div div small {
    position: absolute;
    top: 0;
    left: 8px;
    -webkit-transition: opacity .3s ease;
    transition: opacity .3s ease;
  }
   .text > div div small:first-child {
    -webkit-transition-delay: .4s;
            transition-delay: .4s;
  }
   .text > div div small:last-child {
    opacity: 0;
  }
   nav {
    z-index: 1;
    position: relative;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
            align-items: center;
    margin-left: auto;
    -webkit-transition: opacity .4s ease;
    transition: opacity .4s ease;
  }
   nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: -webkit-box;
    display: flex;
  }
   nav ul:not(:last-child) {
    margin-right: 16px;
  }
   nav ul:first-child {
    --y: 8px;
    opacity: 0;
    -webkit-transform: translateY(${props => props.y});
            transform: translateY(${props => props.y});
    -webkit-transition: opacity .3s ease, -webkit-transform .4s ease;
    transition: opacity .3s ease, -webkit-transform .4s ease;
    transition: opacity .3s ease, transform .4s ease;
    transition: opacity .3s ease, transform .4s ease, -webkit-transform .4s ease;
  }
   nav ul li:not(:last-child) {
    margin-right: 12px;
  }
   nav ul li a {
    --r: 0deg;
    --s: 1.01;
    display: block;
    -webkit-transform: rotate(${props => props.r}) scale(${props => props.s}) translateZ(0);
            transform: rotate(${props => props.r}) scale(${props => props.s}) translateZ(0);
    -webkit-transition: background .4s ease, -webkit-transform .6s ease;
    transition: background .4s ease, -webkit-transform .6s ease;
    transition: transform .6s ease, background .4s ease;
    transition: transform .6s ease, background .4s ease, -webkit-transform .6s ease;
  }
   nav ul li a svg {
    display: block;
    width: 14px;
    height: 14px;
    color: var(--grey-light);
  }
   nav ul li a:active {
    --s: .84;
    -webkit-transition: background .4s ease, -webkit-transform .3s ease;
    transition: background .4s ease, -webkit-transform .3s ease;
    transition: transform .3s ease, background .4s ease;
    transition: transform .3s ease, background .4s ease, -webkit-transform .3s ease;
  }
   nav ul li a.dots {
    --r: 90deg;
  }
   nav ul li a.btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: relative;
    background: var(--lightest);
  }
   nav ul li a.btn svg {
    position: absolute;
    left: 6px;
    top: 6px;
    width: 12px;
    height: 12px;
  }
   nav ul li a.btn:hover {
    background: var(--lighter);
  }
   nav ul li a.btn.play {
    --r: 90deg;
  }
   nav ul li a.btn.play svg:last-child {
    -webkit-transform: scale(-1) translateZ(0);
            transform: scale(-1) translateZ(0);
  }
   nav ul li a.btn.play.active {
    --r: 0;
  }
   nav ul li a.btn.cancel:before,  nav ul li a.btn.cancel:after {
    --r: -45deg;
    content: '';
    display: block;
    width: 2px;
    border-radius: 1px;
    height: 14px;
    background: var(--grey-light);
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -7px 0 0 -1px;
    -webkit-transform: rotate(${props => props.r}) scale(0.9) translateZ(0);
            transform: rotate(${props => props.r}) scale(0.9) translateZ(0);
  }
   nav ul li a.btn.cancel:after {
    --r: 45deg;
  }
  &.isMobile nav ul:first-child, :hover nav ul:first-child {
    --y: 0;
    opacity: 1;
  }

  @-webkit-keyframes down {
    40% {
      -webkit-transform: translateY(2px);
              transform: translateY(2px);
    }
  }

  @keyframes down {
    40% {
      -webkit-transform: translateY(2px);
              transform: translateY(2px);
    }
  }
  @-webkit-keyframes check {
    100% {
      background: var(--success);
    }
  }
  @keyframes check {
    100% {
      background: var(--success);
    }
  }
  &.finished + .restart {
    opacity: 1;
    visibility: visible;
  }

  .restart {
    position: absolute;
    bottom: 20%;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
    color: var(--grey-light);
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: opacity .4s ease;
    transition: opacity .4s ease;
  }
  .restart svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: top;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: inherit;
  }
  *:before, *:after {
    box-sizing: inherit;
  }

  body {
    min-height: 100vh;
    font-family: Roboto, Arial;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
            justify-content: center;
    -webkit-box-align: center;
            align-items: center;
    background: var(--light);
    padding: 20px;
  }
  body .dribbble {
    position: fixed;
    display: block;
    right: 20px;
    bottom: 20px;
  }
  body .dribbble img {
    display: block;
    height: 28px;
  }

`
