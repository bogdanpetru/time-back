import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loader, Timer, Wave } from '@app/components'
import { Strawberry } from '@app/data/projects'
import DefaultView from '@app/web/components/DefaultView'
import useData from '@app/data/management/useData'
import { isNumber } from '@app/utils'
import useProject from '../useProject'
import useStrawberry from './useStrawberry'

const Wrapper = styled(DefaultView)`
  position: relative;
  z-index: 1;
`

const IconWrapper = styled.div`
  height: 63px;
  margin-bottom: 20px;
  text-align: center;
`

const Strawberry = () => {
  const params = useParams<{ projectId: string }>()
  const data = useData()
  const project = data.getProject(params.projectId)
  const { onPause, onStart, strawberry, time, onReset } = useStrawberry(project)
  const showResetButton = Boolean(strawberry?.size) && strawberry?.size !== time

  let timeSpentRatio: number = null
  if (isNumber(strawberry?.size) && isNumber(time)) {
    timeSpentRatio = time / strawberry?.size
  }

  if (!project || !strawberry) {
    return <Loader />
  }

  return (
    <>
      <Wave level={timeSpentRatio} />
      <Wrapper title={project?.name}>
        <Timer
          onPauseStart={strawberry?.running ? onPause : onStart}
          onReset={showResetButton && onReset}
          running={strawberry?.running}
          timePassed={time}
          type={strawberry?.type}
        />
      </Wrapper>
    </>
  )
}

export default Strawberry
