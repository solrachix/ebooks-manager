import { windows as Windows } from '../store/windows'

export interface WindowProps {
  id: number;
  title: string;
  width?: number;
  minWidth?: number;
  minHeight?: number;
  height?: number;
}

export const getWindow = function (WindowId: number): WindowProps {
  const {
    id,
    title,
    width,
    minWidth,
    height,
    minHeight
  } = Windows.get('windows')[WindowId] as WindowProps

  return {
    id,
    title,
    width: width || 1100,
    height: height || 700,
    minWidth,
    minHeight
  }
}

export const setWindow = function (props: WindowProps): void{
  if (!props) {
    return
  }

  const windows = (Windows.get('windows') as WindowProps[]).map(window => {
    return window.id === props.id ? props : window
  })

  Windows.set('windows', windows)
}
