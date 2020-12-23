const padWithZero = (no: number): string => {
  let result = `${no}`

  if (result.length < 2) {
    result = `0${result}`
  }

  return result
}

export const formatTime = (ms: number): string => {
  const secondUnit = 1000
  const minuteUnit = secondUnit * 60
  const hourUnit = minuteUnit * 60

  let timeLeftToProcess = ms
  const hours = Math.floor(timeLeftToProcess / hourUnit)
  timeLeftToProcess -= hours * hourUnit
  const minutes = Math.floor(timeLeftToProcess / minuteUnit)
  timeLeftToProcess -= minutes * minuteUnit
  const seconds = Math.floor(timeLeftToProcess / secondUnit)

  const list = []
  if (hours) list.push(hours)
  list.push(minutes)
  list.push(seconds || 0)

  return list.map((item: number) => padWithZero(item)).join(':')
}
