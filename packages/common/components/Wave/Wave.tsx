import { FunctionComponent, useEffect, useState, memo } from 'react'

import styled from 'styled-components'
import useWindowSize from '../useWindowSize'

const clamp = (x: number, min: number, max: number): number => {
  if (x < min) {
    return min
  }
  if (x > max) {
    return max
  }
  return x
}

const fib = (n: number, memo: { [key: number]: number } = {}): number => {
  if (n === 1 || n === 2) {
    return 1
  }
  memo[n] = fib(n - 2, memo) + fib(n - 1, memo)
  return memo[n]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  transition: padding-top 2000ms ease, background-color, 2000ms ease;
`

const Bottom = styled.svg<{ colorRGB: [number, number, number] }>`
  flex: 1;
  background: ${(props) => getRGB(...props.colorRGB)};
`

const randomDelta = (value: number, procente: number = 0.02) => {
  const delta = value * procente
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

const MIDDLE = 'MIDDLE'
const TOP = 'TOP'
const BOTTOM = 'BOTTOM'

const getPointsPattern = (width: number, betweenPoints: number) => {
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
  level: number,
  betweenPoints: number
): number[][] => {
  const points = []
  const offscreen = width * 0.1
  const pattern = getPointsPattern(width + offscreen, betweenPoints)

  const levelY = totalHeight - level

  const getMiddleY = (levelInner: number = levelY): number =>
    randomDelta(levelInner - waveHeight / 2)
  const getBottomY = (levelInner: number = levelY): number =>
    randomDelta(levelInner)
  const getTopY = (levelInner: number = levelY): number =>
    randomDelta(levelInner - waveHeight)

  const firstPoint = [randomDelta(-offscreen, 0.5), getMiddleY(levelY)]

  /**
   * add curve
   * sin(0 - pi) - whould give a courve
   * const coef = sin(width(%) * PI)
   * const level = level * coef
   */
  for (let i = 0; i < pattern.length; i++) {
    const previousPoint: any = points.length ? points[i - 1] : firstPoint
    const x = randomDelta(betweenPoints / 2) + previousPoint[0]
    const widthRatio = clamp(x / width, 0, 1)

    // smaller width, smaller curve
    const curve = (width * 1.2) / (waveHeight * 1.7)
    const localLevel = levelY + curve * Math.sin(widthRatio * Math.PI)

    switch (pattern[i]) {
      case MIDDLE:
        points.push([x, getMiddleY(localLevel)])
        break
      case TOP:
        points.push([x, getTopY(localLevel)])
        break
      case BOTTOM:
        points.push([x, getBottomY(localLevel)])
        break
    }
  }

  return [firstPoint, ...points]
}

const getRGB = (
  red: number,
  green: number,
  blue: number,
  darken: number = 0
): string => `rgb(${red + darken}, ${green + darken}, ${blue + darken})`

interface WaveTopProps {
  height: number
  width: number
  waveNumber: number
  colorRGB: [number, number, number]
  betweenPoints: number
}

const WaveTop: FunctionComponent<WaveTopProps> = memo((props) => {
  const { height, width, waveNumber } = props
  const [points, setPoints] = useState<number[][][][]>([])
  const individualWaveHegiht = height / waveNumber
  const max = fib(waveNumber)

  useEffect(() => {
    const pointsList = []

    for (let i = 1; i < waveNumber; i++) {
      const coef = fib(waveNumber - i) / max + 0.3
      const level = coef * height
      pointsList.push([
        getWavePoints(
          height,
          individualWaveHegiht,
          width,
          level,
          props.betweenPoints
        ),
        getWavePoints(
          height,
          individualWaveHegiht,
          width,
          level,
          props.betweenPoints
        ),
        getWavePoints(
          height,
          individualWaveHegiht,
          width,
          level,
          props.betweenPoints
        ),
      ])
    }

    setPoints(pointsList)
  }, [width])

  const paths = points.map((pointsList) =>
    pointsList.map((points) => getWavePath(points, width, height))
  )

  return (
    <>
      {Boolean(paths.length) && (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
          {paths.map((pathsItem, key) => {
            const darken = (paths.length - (key + 1)) * 7
            return (
              <path
                key={key}
                stroke="transparent"
                fill={getRGB(...props.colorRGB, darken)}
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
  const { width } = useWindowSize()

  if (!width) {
    return <></>
  }

  const colorDelta = 30 - 30 * props.level
  const backgroundColor = getRGB(255, 230 - colorDelta, 230 - colorDelta)
  const waveBaseColor: [number, number, number] = [147, 204, 214]

  return (
    <Wrapper
      style={{
        paddingTop: props?.level ? `${props.level * 70}vh` : '60px',
        backgroundColor: backgroundColor,
      }}
    >
      <WaveTop
        colorRGB={waveBaseColor}
        waveNumber={7}
        width={width}
        height={330}
        betweenPoints={100}
      />
      <Bottom colorRGB={waveBaseColor} />
    </Wrapper>
  )
})

export default Wave
