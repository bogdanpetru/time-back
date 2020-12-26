import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loader, Timer, Wave } from '@app/components'
import { Strawberry } from '@app/data/projects'
import DefaultView from '@app/web/components/DefaultView'
import useProject from '../useProject'
import useStrawberry from './useStrawberry'

const Wrapper = styled(DefaultView)`
  position: relative;
  z-index: 1;
`

const Strawberry = () => {
  const params = useParams<{ projectId: string }>()
  const { project, loading } = useProject(params.projectId)
  const { onStop, onStart, strawberry, time } = useStrawberry(project)

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Wave />
      <Wrapper title={project.name}>
        <Timer
          onStopStart={strawberry?.running ? onStop : onStart}
          running={strawberry?.running}
          timePassed={time}
        />
      </Wrapper>
    </>
  )
}

export default Strawberry
