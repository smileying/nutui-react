import * as React from 'react'
import Icon from '../icon/index'
import Notification, { NotificationProps } from './Notification'
// const { JiaZai } = Icon
let messageInstance: any = null
interface IToastOptions {
  duration: number
}
const SHORT = 3
const options: IToastOptions = {
  duration: SHORT,
}

function getInstance(props: NotificationProps, callback: (notification: any) => void) {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }

  Notification.newInstance(props, (notification: any) => {
    return callback && callback(notification)
  })
}

function notice(
  msg: string | React.ReactNode,
  icon: any,
  duration = options.duration,
  onClose: (() => void) | undefined | null
) {
  function close() {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
    if (onClose) {
      onClose()
    }
  }

  getInstance(
    {
      msg,
      icon,
      duration,
      onClose: close,
    },
    (notification: any) => {
      messageInstance = notification
    }
  )
}

export default {
  SHORT,
  LONG: 8,
  text(msg: string | React.ReactNode, duration?: number, onClose?: () => void) {
    return notice(msg, null, duration, onClose)
  },
  success(msg: string | React.ReactNode, duration?: number, icon?: string, onClose?: () => void) {
    return notice(msg, icon ? icon : 'success', duration, onClose)
  },
  fail(msg: string | React.ReactNode, duration?: number, icon?: string, onClose?: () => void) {
    return notice(msg, icon ? icon : 'failure', duration, onClose)
  },
  loading(msg: string | React.ReactNode, duration?: number, icon?: string, onClose?: () => void) {
    return notice(msg, icon ? icon : 'loading', duration, onClose)
  },
  warn(msg: string | React.ReactNode, duration?: number, icon?: string, onClose?: () => void) {
    return notice(msg, icon ? icon : 'tips', duration, onClose)
  },
  customIcon(
    msg: string | React.ReactNode,
    duration?: number,
    icon?: string,
    onClose?: () => void
  ) {
    return notice(msg, icon ? icon : null, duration, onClose)
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  },
  config(option: Partial<IToastOptions> = {}) {
    const { duration = SHORT } = option
    options.duration = duration
  },
}
