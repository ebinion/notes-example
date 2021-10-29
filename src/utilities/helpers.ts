import { AuthError } from 'firebase/auth'
import ShortUniqueId from 'short-unique-id'

import { NoteLike } from '../store'
import { routes } from '../App'

export const addLeadingZero = (num: number): string => {
  const numString = num.toString()

  if (numString.length === 1) {
    return `0${numString}`
  } else {
    return numString
  }
}

export const convertDateToString = (date = new Date()) => {
  return date.toISOString()
}

export const convertStringToDate = (string: string): Date => {
  return new Date(string)
}

export const shortID = new ShortUniqueId({ length: 16 })

export const getAuthErrorMessage = (authError: AuthError): string => {
  const errorMap = {
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
      code: 'auth/requires-recent-login',
      message: JSON.stringify(
        `The credential expired. Please <a href="${routes.signIn}">sign in</a> again.`
      ),
    },
    EMAIL_CHANGE_NEEDS_VERIFICATION: {
      code: 'auth/email-change-needs-verification',
      message: 'Check your email to verify your change of address.',
    },
    EMAIL_EXISTS: {
      code: 'auth/email-already-in-use',
      message: JSON.stringify(
        `The email you provided is in use. Please <a href="${routes.signIn}">sign in.</a>`
      ),
    },
    INVALID_EMAIL: {
      code: 'auth/invalid-email',
      message: 'The email you provided is invalid. Please check the format.',
    },
    INVALID_PASSWORD: {
      code: 'auth/wrong-password',
      message:
        'Sorry, the password you provided didn’t match our records. Please try again.',
    },
    UNVERIFIED_EMAIL: {
      code: 'auth/unverified-email',
      message: 'Your email address is unverified. Please check your email.',
    },
    USER_SIGNED_OUT: {
      code: 'auth/user-signed-out',
      message: 'You’ve been signed out.',
    },
    USER_NOT_FOUND: {
      code: 'auth/user-not-found',
      message: JSON.stringify(
        `Sorry, that email address doesn’t match our records. Please <a href="${routes.createAccount}">create an account.</a>`
      ),
    },
    WEAK_PASSWORD: {
      code: 'auth/weak-password',
      message:
        'The password was weak. Please try adding more characters, numbers, and symbols.',
    },
  }

  const currentError = Object.values(errorMap).find(
    (error) => error.code === authError.code
  )
  const defaultMessage =
    'Sorry, there was an error. Please reload the page and try again.'

  return currentError ? currentError.message : defaultMessage
}

export const convertHoursToMilliseconds = (hours: number): number => {
  return hours * 3600000
}

export const convertMillisecondsToMinutes = (ms: number): number => {
  return Math.floor(ms / 60000)
}

export const convertMillisecondsToHours = (ms: number): number => {
  return Math.floor(ms / 3600000)
}

export const convertSecondsToHours = (seconds: number): number => {
  return Math.floor(seconds / 3600)
}

export const convertSecondsToMinutes = (seconds: number): number => {
  return Math.floor(seconds / 60)
}

export const convertSecondsToMilliseconds = (seconds: number): number => {
  return seconds * 1000
}

export const getDateString = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const getNextInterval = (
  elapsedTime: number,
  intervalsArray: {
    elapsedTime: number
    updateInterval: number
  }[]
): number | false => {
  if (intervalsArray[0].elapsedTime > elapsedTime) {
    return intervalsArray[0].updateInterval
  } else if (intervalsArray.length === 1) {
    return false
  } else {
    return getNextInterval(elapsedTime, [...intervalsArray].slice(1))
  }
}

export const getTimeAgo = (
  elapsedTime: number,
  timeAgos: {
    elapsedTime: number
    string: string | Function
  }[],
  defaultString = ''
): string => {
  if (elapsedTime < timeAgos[0].elapsedTime) {
    return typeof timeAgos[0].string === 'function'
      ? timeAgos[0].string(elapsedTime)
      : timeAgos[0].string
  } else if (timeAgos.length === 1) {
    return defaultString
  } else {
    return getTimeAgo(elapsedTime, [...timeAgos].splice(1), defaultString)
  }
}

export const getTimeString = (date: Date): string => {
  const getHours = () => {
    const hours = date.getHours()

    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours - 12
    } else {
      return hours
    }
  }
  const meridiem = date.getHours() < 11 ? 'am' : 'pm'
  const minutes = addLeadingZero(date.getMinutes())

  return `${getHours()}:${minutes}${meridiem}`
}

export const getZuluDate = (date: Date): string => {
  const year = date.getUTCFullYear()
  const month = addLeadingZero(date.getUTCMonth() + 1)
  const dateUTC = addLeadingZero(date.getUTCDate())

  const hours = addLeadingZero(date.getUTCHours())
  const minutes = addLeadingZero(date.getUTCMinutes())
  const seconds = addLeadingZero(date.getUTCSeconds())

  return `${year}-${month}-${dateUTC}T${hours}:${minutes}:${seconds}Z`
}

export const getDateTimeString = (date: Date): string =>
  `${getDateString(date)} at ${getTimeString(date)}`

export const sortNotes = (notes: NoteLike[]) => {
  return [...notes].sort((a, b) => {
    return compareDateRecency(a.lastModifiedDate, b.lastModifiedDate)
  })
}

/**
 *
 * @param a Any string accepted by Date contructor
 * @param b Any string accepted by Date contructor
 * @returns 1 when `a` is more recent, -1 when `b` is more recent, 0 when both are equal
 */
export const compareDateRecency = (a: string, b: string) => {
  const sinceA = new Date(a).toISOString()
  const sinceB = new Date(b).toISOString()

  if (sinceA > sinceB) {
    return -1
  } else if (sinceA < sinceB) {
    return 1
  } else {
    return 0
  }
}
