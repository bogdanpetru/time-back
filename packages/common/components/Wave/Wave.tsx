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

const randomDelta = (value: number, procent: number = 0.05) => {
  const delta = value * procent
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

const getY = (y: number, totalHeight: number): number => totalHeight - y

const MIDDLE = 'MIDDLE'
const TOP = 'TOP'
const BOTTOM = 'BOTTOM'

const getPattern = (width: number, betweenPoints: number) => {
  const pattern = [TOP, MIDDLE, BOTTOM, MIDDLE]
  const numOfPoints = Math.ceil(width / betweenPoints) * 2

  return Array(Math.ceil(numOfPoints / pattern.length))
    .fill(pattern)
    .reduce((acc, item) => [...acc, ...item], [])
}

/**
  1  2  3   4   5   6
      *              *
  *     *       *
            *
  */
const getWavePoints = (
  totalHeight: number,
  waveHeight: number,
  width: number,
  level: number
): number[][] => {
  const betweenPoints = randomDelta(100)

  const points = []
  const pattern = getPattern(width, betweenPoints)

  const levelY = totalHeight - level

  const getMiddleY = () => randomDelta(levelY - waveHeight / 2)
  const getBottomY = () => randomDelta(levelY)
  const getTopY = () => randomDelta(levelY - waveHeight)

  const firstPoint = [randomDelta(-20), getMiddleY()]

  for (let i = 0; i < pattern.length; i++) {
    const previousPoint: any = points.length ? points[i - 1] : firstPoint
    switch (pattern[i]) {
      case MIDDLE:
        points.push([
          randomDelta(betweenPoints / 2) + previousPoint[0],
          getMiddleY(),
        ])
        break
      case TOP:
        points.push([
          randomDelta(betweenPoints / 2) + previousPoint[0],
          getTopY(),
        ])
        break
      case BOTTOM:
        points.push([
          randomDelta(betweenPoints / 2) + previousPoint[0],
          getBottomY(),
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

const getRGB = (red: number, green: number, blue: number, darken: number) =>
  `rgb(${red + darken}, ${green + darken}, ${blue + darken})`

const WaveTop: FunctionComponent<WaveTopProps> = memo((props) => {
  const { height, width, waveNumber } = props
  const [points, setPoints] = useState<number[][][][]>([])
  const individualWaveHegiht = height / waveNumber

  useEffect(() => {
    const pointsList = []
    let level = height - individualWaveHegiht
    for (let i = 0; i < waveNumber; i++) {
      pointsList.push([
        getWavePoints(height, individualWaveHegiht, width, level),
        getWavePoints(height, individualWaveHegiht, width, level),
        getWavePoints(height, individualWaveHegiht, width, level),
      ])
      level -= individualWaveHegiht
    }

    setPoints(pointsList)
  }, [])

  const paths = points.map((pointsList) =>
    pointsList.map((points) => getWavePath(points, width, height))
  )

  const startingFill: [number, number, number] = [188, 245, 255]

  return (
    <>
      {Boolean(paths.length) && (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          {paths.map((pathsItem, key) => {
            const darken = (paths.length - (key + 1)) * 8
            return (
              <path
                key={key}
                stroke="transparent"
                fill={getRGB(...startingFill, darken)}
              >
                <animate
                  attributeType="XML"
                  attributeName="d"
                  values={[...pathsItem, pathsItem[0]].join(';')}
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>
            )
          })}
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
      <WaveTop waveNumber={10} width={width} height={300} />
      <Bottom />
    </Wrapper>
  )
})

export default Wave
