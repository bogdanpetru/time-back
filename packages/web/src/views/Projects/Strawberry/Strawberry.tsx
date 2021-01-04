import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loader, Timer, Wave } from '@app/components'
import { Strawberry, StrawberryType } from '@app/data/projects'
import DefaultView from '@app/web/components/DefaultView'
import useData from '@app/data/management/useData'
import { isNumber } from '@app/utils'
import useStrawberry from './useStrawberry'

const Wrapper = styled(DefaultView)`
  position: relative;
  z-index: 1;
`

const Strawberry = () => {
  const params = useParams<{ projectId: string }>()
  const data = useData()
  const project = data.getProject(params.projectId)
  const { onPause, onStart, strawberry, time, onReset } = useStrawberry(project)
  const showResetButton =
    (Boolean(strawberry?.size) && strawberry?.size !== time) ||
    strawberry?.type === StrawberryType.STRAWBERRY_TYPE_PAUSE
  const showDecorationIcons =
    Boolean(strawberry?.size) && strawberry?.size !== time

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
          showDecorationIcons={showDecorationIcons}
        />
      </Wrapper>
    </>
  )
}

export default Strawberry
