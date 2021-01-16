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

  const grayNum = sanitizeNumberOfStrawberries(
    props.total - (props.completed || 0)
  )
  const gray = createArrayOf(grayNum, 1).map((_, index) => (
    <StrawberryItemWrapper key={`to-be-done-${index}`}>
      <StrawberrySmallGrayIcon />
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
