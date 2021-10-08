export const addLeadingZero = num => {
  const numString = num.toString()

  if (numString.length === 1) {
    return `0${numString}`
  } else {
    return numString
  }
}

export const getAuthErrorMessage = errorCode => {
  const errorMap = {
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
      code: 'auth/requires-recent-login',
      message: 'The credential expired. Please login again.',
    },
    EMAIL_CHANGE_NEEDS_VERIFICATION: {
      code: 'auth/email-change-needs-verification',
      message: 'Check your email to verify your change of address.',
    },
    EMAIL_EXISTS: {
      code: 'auth/email-already-in-use',
      message: 'The email you provided is in use, please sign in instead.',
    },
    INVALID_EMAIL: {
      code: 'auth/invalid-email',
      message: 'The email you provided is invalid. Please check the format.',
    },
    INVALID_PASSWORD: {
      code: 'auth/wrong-password',
      message: 'The password you provided was wrong. Please try again.',
    },
    UNVERIFIED_EMAIL: {
      code: 'auth/unverified-email',
      message: 'Your email address is unverified. Please check your email.',
    },
    USER_SIGNED_OUT: {
      code: 'auth/user-signed-out',
      message: 'You’ve been signed out.',
    },
    WEAK_PASSWORD: {
      code: 'auth/weak-password',
      message:
        'The password was weak. Please try adding more characters, numbers, and symbols.',
    },
  }

  return (
    Object.values(errorMap).find(error => error.code === errorCode).message ||
    'Sorry, there was an error. Please reload the page and try again.'
  )
}

export const convertHoursToMilliseconds = hours => {
  return hours * 3600000
}

export const convertMillisecondsToMinutes = ms => {
  return Math.floor(ms / 60000)
}

export const convertMillisecondsToHours = ms => {
  return Math.floor(ms / 3600000)
}

export const convertSecondsToHours = seconds => {
  return Math.floor(seconds / 3600)
}

export const convertSecondsToMinutes = seconds => {
  return Math.floor(seconds / 60)
}

export const convertSecondsToMilliseconds = seconds => {
  return seconds * 1000
}

export const getDateString = dateObj => {
  return `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`
}

export const getNextInterval = (elapsedTime, intervalsArray) => {
  if (intervalsArray[0].elapsedTime > elapsedTime) {
    return intervalsArray[0].updateInterval
  } else if (intervalsArray.length === 1) {
    return false
  } else {
    return getNextInterval(elapsedTime, [...intervalsArray].slice(1))
  }
}

export const getTimeAgo = (elapsedTime, timeAgos, defaultString = '') => {
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

export const getTimeString = dateObj => {
  const getHours = () => {
    const hours = dateObj.getHours()

    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours - 12
    } else {
      return hours
    }
  }
  const meridiem = dateObj.getHours() < 11 ? 'am' : 'pm'
  const minutes = addLeadingZero(dateObj.getMinutes())

  return `${getHours()}:${minutes}${meridiem}`
}

export const getZuluDate = dateObj => {
  const year = dateObj.getUTCFullYear()
  const month = addLeadingZero(dateObj.getUTCMonth() + 1)
  const date = addLeadingZero(dateObj.getUTCDate())

  const hours = addLeadingZero(dateObj.getUTCHours())
  const minutes = addLeadingZero(dateObj.getUTCMinutes())
  const seconds = addLeadingZero(dateObj.getUTCSeconds())

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`
}

export const getDateTimeString = dateObj =>
  `${getDateString(dateObj)} at ${getTimeString(dateObj)}`
