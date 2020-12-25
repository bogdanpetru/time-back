import { useState, useEffect } from 'react'
import {
  startStrawberry,
  pauseStrawberry,
  Strawberry,
  Project,
} from '@app/data/projects'
import { addArray, nowInSeconds, last } from './utils'

const useTick = (
  strawberry: Strawberry,
  setTime: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    if (!strawberry?.running) {
      return
    }
    let timeoutId: number = null
    function tick() {
      timeoutId = setTimeout(() => {
        setTime((localTime: number) => localTime - 1000)
        tick()
      }, 1000)
    }
    tick()
    return () => {
      clearTimeout(timeoutId)
    }
  }, [strawberry?.running, setTime])
}

const useUpdateTimeOnStrawberryChange = (
  strawberry: Strawberry,
  setTime: React.Dispatch<React.SetStateAction<number>>
) => {
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
}

const useStrawberry = (project: Project) => {
  const [time, setTime] = useState<number>(0)
  const [strawberry, setStrawberry] = useState<Strawberry>(null)

  useEffect(() => {
    project && setStrawberry(project.currentStrawBerry)
  }, [project])

  useUpdateTimeOnStrawberryChange(strawberry, setTime)
  useTick(strawberry, setTime)

  const onStop = async () => {
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
  }

  const onStart = async () => {
    const startTime = nowInSeconds()
    setStrawberry((strawberry) => ({
      ...strawberry,
      running: true,
      startTime: [...(strawberry?.startTime || []), startTime],
    }))
    await startStrawberry(project.id, startTime)
  }

  return {
    onStart,
    onStop,
    strawberry,
    time,
  }
}

export default useStrawberry
