import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { StrawberryType } from '@app/data/projects'
import {
  PlayBigIcon,
  PauseIcon,
  DeleteIcon,
  CoffeeIcon,
  TickerIcon,
} from '@app/components'

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

const IconWrapper = styled.div`
  position: absolute;
  top: 15;
  right: -30px;
`

const iconMap = {
  [StrawberryType.STRAWBERRY_TYPE_INTERVAL]: TickerIcon,
  [StrawberryType.STRAWBERRY_TYPE_PAUSE]: CoffeeIcon,
}

interface TimerProps {
  timePassed: number
  running: boolean
  onPauseStart: () => void
  onReset?: () => void
  type?: StrawberryType
}

const Timer: FunctionComponent<TimerProps> = (props) => {
  const Icon = iconMap[props.type]

  return (
    <Wrapper>
      <TimerWrapper>
        {props.onReset && (
          <DeleteButton onClick={props.onReset}>
            <DeleteIcon />
          </DeleteButton>
        )}
        {props.running && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
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
}

Timer.defaultProps = {
  running: false,
}

export default Timer
