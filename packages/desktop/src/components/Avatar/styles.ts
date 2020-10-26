import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
  img {
    width: 40px;

    cursor: pointer;
    border-radius: 50%;
  }
`
export const Popup = styled.div`
  position: absolute;
  /* margin-top: 26%;
  margin-left: -22%; */
  width: 320px;
  height: 260px;
  transform: scale(0.001);

  border-radius: 10px;
  border: 1px solid ${({ theme }) => rgba(theme.colors.themeColors.background.darker, 0.9)};
  background: ${({ theme }) => rgba(theme.colors.themeColors.background.dark, 0.9)};
  backdrop-filter: blur(40px);
  box-shadow: 0px 0px 20px 10px ${({ theme }) => theme.colors.themeColors.background.darker};

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-x: auto;

  z-index: 20;

  &::-webkit-scrollbar {
    width: 0px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 10px;

    &.selected {
      background: ${({ theme }) => rgba(theme.colors.themeColors.primary.darker, 0.9)};
    }
  }
`
