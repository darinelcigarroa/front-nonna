// src/utils/notifications.js
import { Notify } from 'quasar'

// Notificación de éxito
export const notifySuccess = (message, options = {}) => {
  Notify.create({
    type: 'positive',
    message: message ?? 'Operacion realizada con exito',
    icon: 'check_circle',
    position: 'bottom',
    timeout: 3000,
    ...options,
  })
}

// Notificación de error
export const notifyError = (message, options = {}) => {
  Notify.create({
    type: 'negative',
    message,
    icon: 'error',
    position: 'bottom',
    timeout: 3000,
    ...options,
  })
}

// Notificación informativa
export const notifyInfo = (message, options = {}) => {
  Notify.create({
    type: 'info',
    message,
    icon: 'info',
    position: 'bottom',
    timeout: 3000,
    ...options,
  })
}

export default {
  notifySuccess,
  notifyError,
  notifyInfo,
}
