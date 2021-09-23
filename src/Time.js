import { useEffect, useRef, useState } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import {
  convertHoursToMilliseconds,
  convertMillisecondsToMinutes,
  convertMillisecondsToHours,
  convertSecondsToMilliseconds,
  getDateTimeString,
  getNextInterval,
  getTimeAgo,
  getZuluDate,
} from './helpers'

const useTimeAgo = date => {
  const defaultTimeString = getDateTimeString(date)

  const updateIntervals = useRef([
    {
      elapsedTime: convertSecondsToMilliseconds(5),
      string: 'now',
      updateInterval: convertSecondsToMilliseconds(5),
    },
    {
      elapsedTime: convertSecondsToMilliseconds(45),
      string: 'secs ago',
      updateInterval: convertSecondsToMilliseconds(40),
    },
    {
      elapsedTime: convertSecondsToMilliseconds(120),
      string: 'about a min ago',
      updateInterval: convertSecondsToMilliseconds(75),
    },
    {
      elapsedTime: convertHoursToMilliseconds(1),
      string: num => `${convertMillisecondsToMinutes(num)} mins ago`,
      updateInterval: convertSecondsToMilliseconds(60),
    },
    {
      elapsedTime: convertHoursToMilliseconds(24),
      string: num => `${convertMillisecondsToHours(num)} hours ago`,
      updateInterval: convertHoursToMilliseconds(1),
    },
  ])

  const [timeString, setTimeString] = useState(
    getTimeAgo(
      Date.now() - Date.parse(date),
      updateIntervals.current,
      defaultTimeString
    )
  )

  useEffect(() => {
    const nextInterval = getNextInterval(
      Date.now() - Date.parse(date),
      updateIntervals.current
    )

    if (nextInterval) {
      const timeoutID = setTimeout(() => {
        setTimeString(
          getTimeAgo(
            Date.now() - Date.parse(date),
            updateIntervals.current,
            defaultTimeString
          )
        )
      }, nextInterval)

      return () => clearTimeout(timeoutID)
    }
  }, [date, defaultTimeString, updateIntervals, timeString])

  return timeString
}

const Time = props => {
  const timeString = useTimeAgo(props.date)

  return (
    <time dateTime={getZuluDate(props.date)} className={props.className}>
      {timeString}
    </time>
  )
}

Time.propTypes = {
  className: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
}

export default Time
