import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { PlayBigIcon, PauseIcon, DeleteIcon } from '@app/components'

import { formatTime } from './utils'
import TransparentButton from '../TransparentButton'

const TimerInner = styled.div`
  text-align: center;
  font-size: ${(props) => props?.theme?.timer?.fontSize}px;
  color: ${(props) => props?.theme?.timer?.color};
  margin-bottom: 40px;
`

const ControlsWrapper = styled.div`
  text-align: center;
`

const Wrapper = styled.div`
  text-align: center;
`

const DeleteButton = styled(TransparentButton)`
  position: absolute;
  top: 0;
  right: -40px;
`

const TimerWrapper = styled.div`
  display: inline-block;
  position: relative;
`

interface TimerProps {
  timePassed: number
  running: boolean
  onPauseStart: () => void
  onReset?: () => void
}

const Timer: FunctionComponent<TimerProps> = (props) => (
  <Wrapper>
    <TimerWrapper>
      {props.onReset && (
        <DeleteButton onClick={props.onReset}>
          <DeleteIcon />
        </DeleteButton>
      )}
      <TimerInner>{formatTime(props.timePassed)}</TimerInner>
    </TimerWrapper>
    <ControlsWrapper>
      <TransparentButton onClick={props.onPauseStart}>
        {props.running ? <PauseIcon /> : <PlayBigIcon />}
      </TransparentButton>
    </ControlsWrapper>
  </Wrapper>
)

Timer.defaultProps = {
  running: false,
}

export default Timer
