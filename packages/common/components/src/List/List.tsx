import styled from 'styled-components'

export const ListItem = styled.li`
  display: flex;
  height: 45px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme?.list?.item?.borderColor};
  cursor: pointer;
  padding: 0 16px;
  font-size: 18px;
  color: ${(props) => props.theme?.list?.item?.color};
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 600px;
  overflow-y: auto;
`

export default List
