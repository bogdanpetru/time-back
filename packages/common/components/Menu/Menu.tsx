import { FunctionComponent, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { HamburgerCloseIcon, HamburgerIcon } from '../Icons'
import TransparentButton from '../TransparentButton'

const Wrapper = styled.div`
  position: relative;
`

const MenuBody = styled.div`
  position: absolute;
  right: 36px;
  top: 0px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props?.theme?.menu?.background};
  width: 200px;
`

const Menu: FunctionComponent = (props) => {
  const wrapperRef = useRef<Element>()
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (!isOpen && !wrapperRef?.current?.contains(event.target as Element)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handleWindowClick)

    return () => window.removeEventListener('click', handleWindowClick)
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      <TransparentButton onClick={handleClick}>
        {isOpen ? <HamburgerCloseIcon /> : <HamburgerIcon />}
      </TransparentButton>
      {isOpen && <MenuBody>{props.children}</MenuBody>}
    </Wrapper>
  )
}

export default Menu
