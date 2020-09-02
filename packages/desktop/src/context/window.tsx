import * as Electron from 'electron'
import { uuid } from 'uuidv4'

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { MenuItem, createItem, createMenu } from '../components/Menu'
import Notification, { NotificationOptions } from '../components/Notification'
import Window, { WindowOptions } from '../components/Window/index'

import ToastContainer from '../components/ToastContainer'
import { ToastMessage } from '../components/Toast'

interface ToastShow {
  (message: Omit<ToastMessage, 'id'>): string;
}

interface ToastHide {
  (id: string): void;
}

interface Toast {
  addToast: ToastShow;
  removeToast: ToastHide;
}

interface Menu {
  setItemMenu(options: MenuItem[]): void;
  removeItemsMenu(options: string[]): void;
}

interface window {
  id: number;
  webContents: Electron.webContents;
}

interface WindowContextData {
  newWindow(options: WindowOptions): window;
  newNotification(options: NotificationOptions): void;
  Toast: Toast;
  Menu: Menu;
}

const WindowContext = createContext<WindowContextData>({} as WindowContextData)

export const WindowProvider: React.FC = ({ children }) => {
  const [windows, setWindows] = useState<window[] | []>([])
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const [MenuItems, setMenuItems] = useState<MenuItem[]>([])

  const newWindow = (options: WindowOptions) => {
    const webContents = Window(options)
    const id = webContents.id
    const window = {
      id,
      webContents
    }

    setWindows([...windows, window])
    return window
  }

  const newNotification = (options: NotificationOptions) => {
    Notification(options)
  }

  const Toast: Toast = {
    addToast: useCallback<ToastShow>(message => {
      const id = uuid()

      setMessages(state => [...state, { ...message, id }])

      return id
    }, []),
    removeToast: useCallback(id => {
      setMessages(state => state.filter(message => message.id !== id))
    }, [])
  }

  const Menu: Menu = {
    setItemMenu: useCallback((option: MenuItem[]) => {
      const menuItems = [
        ...MenuItems.filter(item => {
          return option.filter(item2 => item.label !== item2.label)
        }),
        ...option
      ]

      createMenu(menuItems)
      setMenuItems(menuItems)
    }, []),
    removeItemsMenu: useCallback((params: string[]) => {
      const menuItems = [
        ...MenuItems.filter(item => {
          return params.filter(label => item.label !== label)
        })
      ]

      createMenu(menuItems)
      setMenuItems(menuItems)
    }, [])
  }
  return (
    <WindowContext.Provider
      value={{ newWindow, newNotification, Toast, Menu }}>
      <ToastContainer toasts={messages} />
      {children}
    </WindowContext.Provider>
  )
}

// Hook próprio
export type WindowContext = WindowContextData
export function useWindow (): WindowContextData {
  const context = useContext(WindowContext)

  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider')
  }

  return context
}
