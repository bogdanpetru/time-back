import { nowInSeconds } from '@app/utils'

interface Subscriber {
  (time: number): void
}

interface Unsubscribe {
  (): void
}

let subscribers: Subscriber[] = []

let isTicking = false

function tick() {
  setTimeout(() => {
    const now = nowInSeconds()
    for (const subscriber of subscribers) {
      subscriber(now)
    }
    tick()
  }, 1000)
}

export function subscribe(subscriber: Subscriber): Unsubscribe {
  startTicking()

  subscribers.push(subscriber)
  return () => {
    subscribers = subscribers.filter((sub) => sub !== subscriber)
  }
}

export function startTicking() {
  if (isTicking) {
    return
  } else {
    isTicking = true
  }
  tick()
}
