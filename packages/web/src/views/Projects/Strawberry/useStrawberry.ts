import { useState, useEffect } from 'react'
import {
  startStrawberry,
  pauseStrawberry,
  stopStrawberry,
  resetStrawberry,
  Strawberry,
  Project,
} from '@app/data/projects'
import { addArray, nowInSeconds, last } from './utils'

const useTick = ({
  strawberry,
  setTime,
  onStrawberryFinish,
  time,
}: {
  strawberry: Strawberry
  setTime: React.Dispatch<React.SetStateAction<number>>
  onStrawberryFinish: () => void
  time: number
}) => {
  useEffect(() => {
    if (!strawberry?.running) {
      return
    }

    const timeoutId = setTimeout(() => {
      const newTime = time - 1000
      if (!newTime) {
        onStrawberryFinish()
      }

      setTime(newTime || strawberry.size)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [strawberry?.running, setTime, time])
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

  const onStrawberryFinish = async () => {
    setStrawberry({
      ...strawberry,
      running: false,
    })
    const newStrawberry = await stopStrawberry(project, strawberry)
    setStrawberry(newStrawberry)
  }

  useTick({ strawberry, setTime, onStrawberryFinish, time })

  const onPause = async () => {
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

  const onReset = async () => {
    const newStrawberry = await resetStrawberry(project)
    setStrawberry(newStrawberry)
  }

  return {
    onStart,
    onPause,
    onReset,
    strawberry,
    time,
  }
}

export default useStrawberry
