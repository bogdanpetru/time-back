export const SECOND_UNIT = 1000
export const MINUTE_UNIT = SECOND_UNIT * 60
export const HOUR_UNIT = MINUTE_UNIT * 60

export const nowInSeconds = (): number => Math.floor(Date.now() / 1000) * 1000

export const secondsToMs = (time: number) => time * SECOND_UNIT
