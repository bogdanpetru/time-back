import { FunctionComponent, memo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loader, Timer, Wave } from '@app/components'
import { Strawberry, StrawberryType } from '@app/data/interface'
import { getTimeLeftRatio } from '@app/data/utils'
import DefaultView from '@app/web/components/DefaultView'
import useData from '@app/data/management/useData'
import StrawberryMeeter from './StrawberryMeeter'

const Wrapper = styled(DefaultView)`
  position: relative;
  z-index: 1;
`

const Strawberry: FunctionComponent = memo(() => {
  const params = useParams<{ projectId: string }>()
  const data = useData()
  const [project, loading] = data.getProject(params.projectId)
  const strawberry = project?.currentStrawBerry
  const time = loading ? null : data.getTime(project.id)

  if (loading) {
    return <Loader />
  }

  const showResetButton =
    (Boolean(strawberry?.size) && strawberry?.size !== time) ||
    strawberry?.type === StrawberryType.STRAWBERRY_TYPE_PAUSE

  const onPause = () => data.pauseStrawberry(project.id)
  const onStart = () => data.startStrawberry(project.id)
  const onReset = () => data.resetStrawberry(project.id)

  return (
    <>
      <Wave level={getTimeLeftRatio(strawberry, data.getTime(project.id))} />
      <Wrapper title={project?.name}>
        <Timer
          onPauseStart={strawberry?.running ? onPause : onStart}
          onReset={showResetButton && onReset}
          running={strawberry?.running}
          timePassed={time}
          type={strawberry?.type}
        />
        <StrawberryMeeter
          total={project.numberOfStrawberries}
          completed={project?.statistics?.today?.completedStrawberries || 0}
        />
      </Wrapper>
    </>
  )
})

export default Strawberry
