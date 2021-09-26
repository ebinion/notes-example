import {
  addLeadingZero,
  getZuluDate,
  getDateString,
  getNextInterval,
  convertHoursToMilliseconds,
  convertMillisecondsToMinutes,
  convertSecondsToMinutes,
  convertSecondsToHours,
  getTimeAgo,
  getTimeString,
} from './helpers'

describe('addLeadingZero', () => {
  it('adds a leading zero when the number is a single digit', () => {
    expect(addLeadingZero(1)).toBe('01')
  })

  it('does not a leading zero when the number is more than a single digit', () => {
    expect(addLeadingZero(10)).toBe('10')
  })
})

describe('convertHoursToMilliseconds', () => {
  it('returns a valid integer', () => {
    expect(convertHoursToMilliseconds(1)).toEqual(3600000)
  })
})

describe('convertMillisecondsToMinutes', () => {
  it('returns a valid integer', () => {
    expect(convertMillisecondsToMinutes(60000)).toEqual(1)
  })
})

describe('convertSecondsToHours', () => {
  it('returns a valid integer', () => {
    expect(convertSecondsToHours(3600)).toEqual(1)
  })
})

describe('convertSecondsToMinutes', () => {
  it('returns a valid integer', () => {
    expect(convertSecondsToMinutes(60)).toEqual(1)
  })
})

describe('getDateString', () => {
  it('returns a valid date (e.g. "9/1/2021")', () => {
    const date = new Date('2021-09-01T00:00:00')

    expect(getDateString(date)).toBe(`9/1/2021`)
  })
})

describe('getNextInterval', () => {
  it('returns the next update interval based on elapsed time', () => {
    const intervals = [
      {
        elapsedTime: 12,
        updateInterval: 0,
      },
      {
        elapsedTime: 24,
        updateInterval: 0,
      },
      {
        elapsedTime: 48,
        updateInterval: 1,
      },
      {
        elapsedTime: 96,
        updateInterval: 0,
      },
    ]

    expect(getNextInterval(30, intervals)).toEqual(1)
  })
})

describe('getTimeAgo', () => {
  it('returns correct string based on elapsed time', () => {
    const elapsedTime = 3000
    const timeAgos = [
      { elapsedTime: 1000, string: 'now' },
      { elapsedTime: 5000, string: '5 seconds ago' },
    ]

    expect(getTimeAgo(elapsedTime, timeAgos)).toBe('5 seconds ago')
  })

  it('returns default string when no matches occurred', () => {
    const millisecondsElapsed = 20000
    const timeAgos = [
      { duration: 1000, string: 'now' },
      { duration: 5000, string: '5 seconds ago' },
    ]
    const defaultString = 'default string'

    expect(getTimeAgo(millisecondsElapsed, timeAgos, defaultString)).toBe(
      defaultString
    )
  })
})

describe('getTimeString', () => {
  it('returns "12:00am" at midnight', () => {
    const date = new Date('2021-09-20T00:00:00')

    expect(getTimeString(date)).toBe(`12:00am`)
  })

  it('returns switches to pm at noon"', () => {
    const date = new Date('2021-09-20T12:00:00')

    expect(getTimeString(date)).toBe(`12:00pm`)
  })

  it('returns a single digit hour when appropriate (e.g. "1:00pm")', () => {
    const date = new Date('2021-09-20T13:00:00')

    expect(getTimeString(date)).toBe(`1:00pm`)
  })
})

describe('getZuluDate', () => {
  it('returns a valid Zulu (UTC) formated string', () => {
    const dateString = '2021-09-20T00:00:00Z'
    const dateObj = new Date(dateString)

    expect(getZuluDate(dateObj)).toBe(dateString)
  })
})
