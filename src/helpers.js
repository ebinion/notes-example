export const addLeadingZero = num => {
  const numString = num.toString()

  if (numString.length === 1) {
    return `0${numString}`
  } else {
    return numString
  }
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
