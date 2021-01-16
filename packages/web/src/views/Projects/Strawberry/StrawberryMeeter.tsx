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
`

const StrawberryItemWrapper = styled.div`
  margin: 0 5px;
`

const sanitizeNumberOfStrawberries = (number: number): number => {
  if (!number) {
    return 0
  }
  return Math.floor(number)
}

const createArrayOf = <T,>(length: number, fill: T): Array<T> =>
  Array(sanitizeNumberOfStrawberries(length)).fill(fill)

const StrawberryMeeter: FunctionComponent<StrawberryMeeterProps> = (props) => {
  if (!props.total) {
    return <></>
  }

  const completedNum = sanitizeNumberOfStrawberries(props.completed)
  const completed = createArrayOf(completedNum, 1).map((_, index) => (
    <StrawberryItemWrapper key={`completed-${index}`}>
      <StrawberrySmallIcon />
    </StrawberryItemWrapper>
  ))

  let grayNum = sanitizeNumberOfStrawberries(
    props.total - (props.completed || 0)
  )
  let overflowNum = 0
  if (grayNum < 0) {
    overflowNum = grayNum * -1
    grayNum = 0
  }
  const gray = createArrayOf(grayNum, 1).map((_, index) => (
    <StrawberryItemWrapper key={`to-be-done-${index}`}>
      <StrawberrySmallGrayIcon />
    </StrawberryItemWrapper>
  ))

  const overflow = createArrayOf(overflowNum, 1).map((_, index) => (
    <StrawberryItemWrapper key={`over-done-${index}`}>
      <StrawberrySmallGrayIcon />
    </StrawberryItemWrapper>
  ))

  return (
    <StrawberryWrapper>
      {completed}
      {gray}
      {overflow && <div>extra: {overflow}</div>}
    </StrawberryWrapper>
  )
}

export default StrawberryMeeter
