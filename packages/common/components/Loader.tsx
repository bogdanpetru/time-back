import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95px;
`;

interface BulletProps {
  active?: boolean;
}

const Bullet = styled.div<BulletProps>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${props => props?.theme?.loader?.background_color};
  transform: ${props => props?.active ? 'scale(1.4)' : 'scale(1)'};
  transition: transform 250ms ease;
`;


const rotate = (min: number, max: number, value: number): number => {
  if (value < min) {
    return min;
  }
  if (value >= max) {
    return 0;
  }
  return value;
}  

const Loader = () => {
  const numOfBullets = 4;
  const [currentIndex, setIndex] = useState<number>(0);

  useEffect(() => {
    const nextIndex = rotate(0, numOfBullets, currentIndex + 1);
    setTimeout(() => {
      setIndex(nextIndex);
    }, 300);
  }, [currentIndex]);

  return (
    <Wrapper>
      {[...Array(numOfBullets)].map((_, index) => (
        <Bullet key={index} active={index  === currentIndex} />
      ))}
    </Wrapper>
  );
};

export default Loader;