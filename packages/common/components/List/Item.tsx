import { FunctionComponent } from 'react'
import styled from 'styled-components'

export const ListItemInner = styled.li`
  position: relative;
  display: flex;
  height: 55px;
  align-items: center;
`
const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: ${(props) => props.theme?.list?.item?.hightlightBackground};
  transition: width 1s ease;
`

const ChildWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;
  font-size: ${(props) => props.theme?.list?.fontSize || 18}px;
  color: ${(props) => props.theme?.list?.item?.color};
`

interface ListItemProps {
  level: number
  onClick(event: React.MouseEvent): void
}

const ListItem: FunctionComponent<ListItemProps> = (props) => {
  return (
    <ListItemInner onClick={props.onClick}>
      {props.level && (
        <Background
          style={{
            width: `${100 - props.level * 100}%`,
          }}
        />
      )}
      <ChildWrapper>{props.children}</ChildWrapper>
    </ListItemInner>
  )
}

export default ListItem
