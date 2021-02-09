import { FunctionComponent, useEffect, useState, memo } from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
  transition: padding-top 2000ms ease;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`

const Bottom = styled.div`
  flex: 1;
  background: #bcf5ff;
`

const randomDelta = (value: number, delta: number) => {
  const min = value - delta
  const max = value + delta
  return Math.random() * (max - min) + min
}

const getWavePath = (
  points: Array<number[]>,
  width: number,
  height: number
): string => {
  const [firstPoint, ...restOfPoints] = points

  const path = restOfPoints
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

const getWavePoints = (
  height: number,
  width: number,
  level: number
): number[][] => {
  /**
    1  2  3   4   5   6
       *              *
    *     *       *
              *
   */
  const betweenPoints = randomDelta(100, 5)
  const MIDDLE = 'MIDDLE'
  const TOP = 'TOP'
  const BOTTOM = 'BOTTOM'
  const pattern = [TOP, MIDDLE, BOTTOM, MIDDLE]

  const numOfPoints = Math.ceil(width / betweenPoints) * 2
  const completePattern: any[] = Array(Math.ceil(numOfPoints / pattern.length))
    .fill(pattern)
    .reduce((acc, item) => [...acc, ...item], [])

  const firstPoint = [randomDelta(-20, 10), randomDelta(height / 2, 20)]

  const points = []

  for (let i = 0; i < completePattern.length; i++) {
    const previousPoint: any = points.length ? points[i - 1] : firstPoint
    switch (completePattern[i]) {
      case MIDDLE:
        points.push([
          randomDelta(betweenPoints / 2, 10) + previousPoint[0],
          randomDelta(height, 20) / 2,
        ])
        break
      case TOP:
        points.push([randomDelta(betweenPoints / 2, 10) + previousPoint[0], 0])
        break
      case BOTTOM:
        points.push([
          randomDelta(betweenPoints / 2, 10) + previousPoint[0],
          randomDelta(height, 20),
        ])
        break
    }
  }

  return [firstPoint, ...points]
}

interface WaveTopProps {
  height: number
  width: number
  waveNumber: number
}

const WaveTop: FunctionComponent<WaveTopProps> = memo((props) => {
  const { height, width, waveNumber } = props
  const [points, setPoints] = useState<number[][][]>([])

  useEffect(() => {
    const pointsList = [getWavePoints(height, width, 0)]
    setPoints(pointsList)
  }, [])

  const paths = points.map((pointsList) =>
    getWavePath(pointsList, width, height)
  )

  return (
    <>
      {Boolean(paths.length) && (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          {paths.map((pathsItem, key) => (
            <path key={key} stroke="transparent" fill="#bcf5ff">
              <animate
                attributeType="XML"
                attributeName="d"
                values={[...paths, paths[0]].join(';')}
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          ))}
          {points
            .reduce((acc, item) => [...acc, ...item], [])
            .map((point) => (
              <circle cx={point[0]} cy={point[1]} r="5" />
            ))}
        </svg>
      )}
    </>
  )
})

interface WaveProps {
  level?: number
}

const Wave: FunctionComponent<WaveProps> = memo((props) => {
  const [width, setWidth] = useState<number>(null)

  useEffect(() => {
    const width = window.innerWidth
    setWidth(width)
  }, [])

  if (!width) {
    return <></>
  }

  return (
    <Wrapper
      style={{
        paddingTop: props?.level ? `${props.level * 90}vh` : '90px',
      }}
    >
      <WaveTop waveNumber={4} width={width} height={300} />
      <Bottom />
    </Wrapper>
  )
})

export default Wave
