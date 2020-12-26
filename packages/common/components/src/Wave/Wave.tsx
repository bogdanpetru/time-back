import { useEffect, useState, memo } from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Bottom = styled.div`
  flex: 1;
  background: #bcf5ff;
`

const randomRange = (value: number, delta: number) => {
  const min = value - delta
  const max = value + delta
  return Math.random() * (max - min) + min
}

const getWavePath = (height: number, width: number) => {
  /**
    1  2  3   4   5   6
       *              *
    *     *       *
              *
   */
  const betweenPoints = randomRange(100, 5)

  const MIDDLE = 'MIDDLE'
  const TOP = 'TOP'
  const BOTTOM = 'BOTTOM'
  const pattern = [TOP, MIDDLE, BOTTOM, MIDDLE]

  const numOfPoints = Math.ceil(width / betweenPoints) * 2
  const completePattern: any[] = Array(Math.ceil(numOfPoints / pattern.length))
    .fill(pattern)
    .reduce((acc, item) => [...acc, ...item], [])

  const firstPoint = [randomRange(0, 10), randomRange(height / 2, 20)]

  const points = []
  for (let i = 0; i < completePattern.length; i++) {
    const previousPoint: any = points.length ? points[i - 1] : firstPoint

    switch (completePattern[i]) {
      case MIDDLE:
        points.push([
          randomRange(betweenPoints / 2, 10) + previousPoint[0],
          randomRange(height, 20) / 2,
        ])
        break
      case TOP:
        points.push([randomRange(betweenPoints / 2, 10) + previousPoint[0], 0])
        break
      case BOTTOM:
        points.push([
          randomRange(betweenPoints / 2, 10) + previousPoint[0],
          randomRange(height, 20),
        ])
        break
    }
  }

  const path = points
    .reduce(
      (acc, item) => {
        if (acc[acc.length - 1].length > 1) {
          acc.push([])
        }
        acc[acc.length - 1].push(item)
        return acc
      },
      [[]]
    )
    .reduce(
      (acc, item) =>
        `${acc} Q ${item[0][0]} ${item[0][1]} ${item[1][0]} ${item[1][1]}`,
      ''
    )

  return `M ${firstPoint[0]} ${firstPoint[1]} ${path} V ${height} H -${width} Z`
}

const Wave = memo(() => {
  const [paths, setPaths] = useState<string[]>(null)
  const [width, setWidth] = useState<number>(null)
  const [height, setHeight] = useState<number>(50)

  useEffect(() => {
    const width = window.innerWidth
    setWidth(width)
    setPaths([
      getWavePath(height, width),
      getWavePath(height, width),
      getWavePath(height, width),
    ])
  }, [])

  if (!width) {
    return <></>
  }

  return (
    <Wrapper>
      {Boolean(paths.length) && (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          <path stroke="transparent" fill="#bcf5ff">
            <animate
              attributeType="XML"
              attributeName="d"
              values={[...paths, paths[0]].join(';')}
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
      <Bottom />
    </Wrapper>
  )
})

export default Wave
