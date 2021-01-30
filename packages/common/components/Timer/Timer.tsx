import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { StrawberryType } from '@app/data/interface'
import {
  PlayBigIcon,
  PauseBigIcon,
  DeleteIcon,
  CoffeeIcon,
  TickerIcon,
} from '@app/components'

import { formatTime } from './utils'
import TransparentButton from '../TransparentButton'

const Wrapper = styled.div`
  margin-bottom: 50px;
  text-align: center;
`

const TimerInner = styled.div`
  text-align: center;
  font-size: ${(props) => props?.theme?.timer?.fontSize}px;
  color: ${(props) => props?.theme?.timer?.color};
  margin-bottom: 40px;
`

const ControlsWrapper = styled.div`
  position: relative;
  text-align: center;
`

const DeleteButton = styled(TransparentButton)`
  position: absolute;
  top: 33px;
  left: calc(29px + 50%);
`

const TimerWrapper = styled.div`
  display: inline-block;
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  top: 13px;
  left: -30px;
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
  showDecorationIcons: boolean
}

const Timer: FunctionComponent<TimerProps> = (props) => {
  const Icon = iconMap[props.type]

  return (
    <Wrapper>
      <TimerWrapper>
        <IconWrapper>
          {props.showDecorationIcons && Icon && (
            <Icon running={props.running} />
          )}
        </IconWrapper>
        <TimerInner>{formatTime(props.timePassed)}</TimerInner>
      </TimerWrapper>
      <ControlsWrapper>
        <TransparentButton onClick={props.onPauseStart}>
          {props.running ? <PauseBigIcon /> : <PlayBigIcon />}
        </TransparentButton>
        {props.onReset && (
          <DeleteButton onClick={props.onReset}>
            <DeleteIcon />
          </DeleteButton>
        )}
      </ControlsWrapper>
    </Wrapper>
  )
}

Timer.defaultProps = {
  running: false,
}

export default Timer
