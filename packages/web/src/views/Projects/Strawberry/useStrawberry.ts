import { useState, useEffect } from 'react'
import {
  startStrawberry,
  pauseStrawberry,
  createNewStrawberry,
  Strawberry,
  Project,
} from '@app/data/projects'
import useData from '@app/data/management/useData'
import { addNotification } from '@app/services/notification'
import { nowInSeconds } from '@app/utils'
import { addArray, getRemainingTime } from './utils'

import strawberryImg from '@app/assets/strawberry.png'

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
      let time = getRemainingTime(strawberry)
      if (time <= 0) {
        onStrawberryFinish()
        time = 0
      }
      setTime(time)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [strawberry?.running, setTime, time])
}

const useUpdateTimeOnStrawberryChange = (
  strawberry: Strawberry,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  onStrawberryFinish: () => void
) => {
  useEffect(() => {
    if (!strawberry) {
      return
    }

    const time = getRemainingTime(strawberry)
    if (time <= 0) {
      onStrawberryFinish()
    } else {
      setTime(time)
    }
  }, [strawberry])
}

const useStrawberry = (project: Project) => {
  const data = useData()

  const [time, setTime] = useState<number>(0)
  const [strawberry, setStrawberry] = useState<Strawberry>(null)

  useEffect(() => {
    project && setStrawberry(project.currentStrawBerry)
  }, [project])

  useUpdateTimeOnStrawberryChange(strawberry, setTime, onStrawberryFinish)

  useTick({ strawberry, setTime, onStrawberryFinish, time })

  async function onStrawberryFinish() {
    setStrawberry({
      ...strawberry,
      running: false,
    })
    addNotification('Strawberry finished, take a break', { img: strawberryImg })

    const newStrawberry = await createNewStrawberry(project, strawberry)
    setStrawberry(newStrawberry)
  }

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

  const onStart = () => data.startStrawberry(project.id)
  const onReset = () => data.resetStrawberry(project.id)

  return {
    onStart,
    onPause,
    onReset,
    strawberry,
    time,
  }
}

export default useStrawberry
