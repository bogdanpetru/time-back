import { useState, useEffect } from 'react'
import { Strawberry, Project } from '@app/data/projects'
import useData from '@app/data/management/useData'
import { addNotification } from '@app/services/notification'
import { getRemainingStrawberryTime } from '@app/data/management/utils'

import strawberryImg from '@app/assets/strawberry.png'

const useTick = ({
  strawberry,
  setTime,
  onFinish,
  time,
}: {
  strawberry: Strawberry
  setTime: React.Dispatch<React.SetStateAction<number>>
  onFinish: () => void
  time: number
}) => {
  useEffect(() => {
    if (!strawberry?.running) {
      return
    }
    const timeoutId = setTimeout(() => {
      let time = getRemainingStrawberryTime(strawberry)
      if (time <= 0) {
        onFinish()
        time = 0
      }
      setTime(time)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [strawberry?.running, setTime, time])
}

const useWatchStrawberryEnd = (
  strawberry: Strawberry,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  onFinish: () => void
) => {
  useEffect(() => {
    if (!strawberry) {
      return
    }
    const time = getRemainingStrawberryTime(strawberry)
    if (time <= 0) {
      onFinish()
    } else {
      setTime(time)
    }
  }, [strawberry])
}

const useStrawberry = (project: Project) => {
  const data = useData()
  const [time, setTime] = useState<number>(0)
  const strawberry = project?.currentStrawBerry

  const onFinish = () => {
    addNotification('Strawberry finished, take a break', { img: strawberryImg })
    data.finishStrawberry(project.id)
  }

  useWatchStrawberryEnd(strawberry, setTime, onFinish)
  useTick({ strawberry, setTime, onFinish, time })

  return {
    strawberry,
    time,
  }
}

export default useStrawberry
