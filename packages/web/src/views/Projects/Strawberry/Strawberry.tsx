import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Timer } from '@app/components'
import {
  startStrawberry,
  pauseStrawberry,
  Strawberry,
} from '@app/data/projects'
import DefaultView from '../../../components/DefaultView'
import useProject from '../useProject'

const nowInSeconds = (): number => Math.floor(Date.now() / 1000) * 1000

const addArray = (arr: number[]): number =>
  arr?.reduce((acc: number, item: number): number => acc + item, 0) || 0
const last = (collection: any[]): any =>
  Array.isArray(collection) ? collection[collection.length - 1] : null

const Strawberry = () => {
  const params = useParams<{ projectId: string }>()
  const { project, loading } = useProject(params.projectId)
  const [time, setTime] = useState<number>(0)
  const [strawberry, setStrawberry] = useState<Strawberry>(null)

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
    if (!project) {
      return
    }
    setStrawberry(project.currentStrawBerry)
  }, [project])

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

  if (loading) {
    return <Loader />
  }

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
      await pauseStrawberry(params.projectId, timeSpent)
    } else {
      const startTime = nowInSeconds()
      setStrawberry((strawberry) => ({
        ...strawberry,
        running: true,
        startTime: [...(strawberry?.startTime || []), startTime],
      }))
      await startStrawberry(params.projectId, startTime)
    }
  }

  return (
    <DefaultView title={project.name}>
      <Timer
        onStopStart={handleStopStart}
        running={strawberry?.running}
        timePassed={time}
      />
    </DefaultView>
  )
}

export default Strawberry
