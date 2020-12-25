import { useState, useEffect } from 'react'

import {
  startStrawberry,
  pauseStrawberry,
  Strawberry,
  Project,
} from '@app/data/projects'

const addArray = (arr: number[]): number =>
  arr?.reduce((acc: number, item: number): number => acc + item, 0) || 0
const last = (collection: any[]): any =>
  Array.isArray(collection) ? collection[collection.length - 1] : null

const nowInSeconds = (): number => Math.floor(Date.now() / 1000) * 1000

const useStrawberry = (project: Project) => {
  const [time, setTime] = useState<number>(0)
  const [strawberry, setStrawberry] = useState<Strawberry>(null)

  useEffect(() => {
    if (!project) {
      return
    }
    setStrawberry(project.currentStrawBerry)
  }, [project])

  useEffect(() => {
    if (!strawberry) {
      return
    }
    if (!strawberry?.startTime.length) {
      setTime(strawberry.size)
      return
    }
    const timeLeft =
      strawberry.size -
      ((strawberry?.timeSpent && addArray(strawberry.timeSpent)) || 0)
    const timeFromPreviousStart =
      strawberry.running && strawberry.startTime.length
        ? nowInSeconds() - last(strawberry.startTime)
        : 0

    setTime(timeLeft - timeFromPreviousStart)
  }, [strawberry])

  useEffect(() => {
    if (!strawberry?.running) {
      return
    }
    let timeoutId: number = null
    function tick() {
      timeoutId = setTimeout(() => {
        setTime((localTime) => localTime - 1000)
        tick()
      }, 1000)
    }
    tick()
    return () => {
      clearTimeout(timeoutId)
    }
  }, [strawberry?.running, setTime])

  const handleStopStart = async () => {
    if (strawberry?.running) {
      const timeSpent = // it is important when pausing that the timer does not change
        strawberry.size -
        time -
        (strawberry?.timeSpent ? addArray(strawberry.timeSpent) : 0)

      setStrawberry((strawberry) => ({
        ...strawberry,
        running: false,
        timeSpent: [...strawberry.timeSpent, timeSpent],
      }))

      await pauseStrawberry(project.id, timeSpent)
    } else {
      const startTime = nowInSeconds()

      setStrawberry((strawberry) => ({
        ...strawberry,
        running: true,
        startTime: [...(strawberry?.startTime || []), startTime],
      }))

      await startStrawberry(project.id, startTime)
    }
  }

  return {
    handleStopStart,
    strawberry,
    time,
  }
}

export default useStrawberry
