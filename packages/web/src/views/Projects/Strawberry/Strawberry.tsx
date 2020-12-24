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

const addArray = (acc: number, item: number): number => acc + item
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
    const currentTime =
      strawberry.size - (strawberry.timeSpent?.reduce(addArray, 0) || 0)
    const timeFromPreviousStart = strawberry.startTime
      ? Date.now() - last(strawberry.startTime)
      : 0

    setTime(currentTime - timeFromPreviousStart)
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
      const lastStartTime = last(strawberry.startTime)
      const timeSpent = Date.now() - lastStartTime
      await pauseStrawberry(params.projectId, timeSpent)
      setStrawberry((strawberry) => ({
        ...strawberry,
        running: false,
        timeSpent: [...strawberry.timeSpent, timeSpent],
      }))
    } else {
      const startTime = await startStrawberry(params.projectId)
      setStrawberry((strawberry) => ({
        ...strawberry,
        running: true,
        startTime: [...(strawberry?.startTime || []), startTime],
      }))
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
