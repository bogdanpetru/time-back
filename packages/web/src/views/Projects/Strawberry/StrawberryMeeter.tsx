import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { StrawberrySmallIcon, StrawberrySmallGrayIcon } from '@app/components'

interface StrawberryMeeterProps {
  total: number
  completed: number
}

const StrawberryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const StrawberryItemWrapper = styled.div`
  margin: 0 5px;
`

const StrawberryMeeter: FunctionComponent<StrawberryMeeterProps> = (props) => {
  if (!props.total) {
    return <></>
  }

  const grayNum = props.total - (props.completed || 0)
  const completed = props.completed
    ? Array(props.completed)
        .fill(1)
        .map((_, index) => (
          <StrawberryItemWrapper key={`completed-${index}`}>
            <StrawberrySmallIcon  />
          </StrawberryItemWrapper>
        ))
    : ''
  const gray = Array(grayNum)
    .fill(1)
    .map((_, index) => (
      <StrawberryItemWrapper key={`to-be-done-${index}`}>
        <StrawberrySmallGrayIcon  />
      </StrawberryItemWrapper>
    ))

  return (
    <StrawberryWrapper>
      {completed}
      {gray}
    </StrawberryWrapper>
  )
}

export default StrawberryMeeter
