import { EffectCallback, FC, useEffect, useRef, useState } from 'react' // eslint-disable-line no-unused-vars

import {
  convertHoursToMilliseconds,
  convertMillisecondsToMinutes,
  convertMillisecondsToHours,
  convertSecondsToMilliseconds,
  getDateTimeString,
  getNextInterval,
  getTimeAgo,
  getZuluDate,
} from '../helpers'

const useTimeAgo = (date: Date) => {
  const defaultTimeString = getDateTimeString(date)

  const updateIntervals = useRef([
    {
      elapsedTime: convertSecondsToMilliseconds(5),
      string: 'now',
      updateInterval: convertSecondsToMilliseconds(5),
    },
    {
      elapsedTime: convertSecondsToMilliseconds(45),
      string: 'a few secs ago',
      updateInterval: convertSecondsToMilliseconds(40),
    },
    {
      elapsedTime: convertSecondsToMilliseconds(120),
      string: 'about a min ago',
      updateInterval: convertSecondsToMilliseconds(75),
    },
    {
      elapsedTime: convertHoursToMilliseconds(1),
      string: (num: number) => `${convertMillisecondsToMinutes(num)} mins ago`,
      updateInterval: convertSecondsToMilliseconds(60),
    },
    {
      elapsedTime: convertHoursToMilliseconds(24),
      string: (num: number) => `${convertMillisecondsToHours(num)} hours ago`,
      updateInterval: convertHoursToMilliseconds(1),
    },
  ])

  const [timeString, setTimeString] = useState(
    getTimeAgo(
      Date.now() - Date.parse(date.toISOString()),
      updateIntervals.current,
      defaultTimeString
    )
  )

  const updateText: EffectCallback = () => {
    const dateString = date.toISOString()

      const nextInterval = getNextInterval(
        Date.now() - Date.parse(dateString),
        updateIntervals.current
      )

      const newTimeString = () => {
        return getTimeAgo(
          Date.now() - Date.parse(dateString),
          updateIntervals.current,
          defaultTimeString
        )
      }

      if (newTimeString() !== timeString) {
        setTimeString(newTimeString())
      }

      if (nextInterval) {
        const timeoutID = setTimeout(() => {
          setTimeString(newTimeString())
        }, nextInterval)

        return () => clearTimeout(timeoutID)
      }
  }

  useEffect(
    updateText,
    [date, defaultTimeString, updateIntervals, timeString]
  )

  return timeString
}

interface TimeProps {
  className?: string
  date: Date,
}

const Time:FC<TimeProps> = ({className, date}) => {
  const timeString = useTimeAgo(date)

  return (
    <time dateTime={getZuluDate(date)} className={className}>
      {timeString}
    </time>
  )
}

export default Time
