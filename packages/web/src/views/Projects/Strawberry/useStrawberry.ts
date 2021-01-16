import { useState, useEffect } from 'react'
import { CurrentStrawBerry, Project, StrawberryType } from '@app/data/projects'
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
  strawberry: CurrentStrawBerry
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
  strawberry: CurrentStrawBerry,
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

const useStrawberry = (
  project: Project
): { strawberry: CurrentStrawBerry; time: number } => {
  const data = useData()
  const [time, setTime] = useState<number>(0)
  const strawberry = project?.currentStrawBerry

  const onFinish = () => {
    if (strawberry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL) {
      let message = 'Strawberry finished, take a break'
      if (
        project?.numberOfStrawberries &&
        project.numberOfStrawberries ===
          project?.statistics?.today?.completedStrawberries - 1
      ) {
        message = 'Congratulations you are finished for today.'
      }

      addNotification(message, {
        img: strawberryImg,
      })
    } else {
      addNotification('Break over, get back to work 😛', {
        img: strawberryImg,
      })
    }

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
