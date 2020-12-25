import { useParams } from 'react-router-dom'
import { Loader, Timer } from '@app/components'
import { Strawberry } from '@app/data/projects'
import DefaultView from '../../../components/DefaultView'
import useProject from '../useProject'
import useStrawberry from '../useStrawberry'

const Strawberry = () => {
  const params = useParams<{ projectId: string }>()
  const { project, loading } = useProject(params.projectId)
  const { handleStopStart, strawberry, time } = useStrawberry(project)

  if (loading) {
    return <Loader />
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
