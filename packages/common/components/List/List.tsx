import styled from 'styled-components'

export const ListItem = styled.li`
  display: flex;
  height: 45px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme?.list?.item?.borderColor};
  cursor: pointer;
`

const List = styled.ul`
  list-style: none;
`

export default List
