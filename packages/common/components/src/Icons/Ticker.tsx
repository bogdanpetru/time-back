import styled from 'styled-components'

const TickerWrapper = styled.svg`
  .rotate {
    transform-origin: 25px 34px;
    animation: rotate 2s infinite forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Ticker = () => (
  <TickerWrapper
    width="52"
    height="60"
    viewBox="0 0 52 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25.4173 37.2037C27.0484 37.2037 28.3706 35.88 28.3706 34.2472C28.3706 32.6144 27.0484 31.2907 25.4173 31.2907C23.7863 31.2907 22.4641 32.6144 22.4641 34.2472C22.4641 35.88 23.7863 37.2037 25.4173 37.2037Z"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className="rotate"
      d="M36.2035 23.2203L27.8413 31.5825"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.5002 11.9828L43.7413 15.7458"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.7972 13.4462L46.0383 9.68323"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M50.0185 34.2768C50.0185 20.7538 39.068 9.79126 25.5599 9.79126C12.0518 9.79126 1.10132 20.7538 1.10132 34.2768C1.10132 47.7997 12.0518 58.7623 25.5599 58.7623C39.068 58.7623 50.0185 47.7997 50.0185 34.2768Z"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25.4174 9.73469C27.708 9.73469 29.565 7.8757 29.565 5.58253C29.565 3.28935 27.708 1.43036 25.4174 1.43036C23.1267 1.43036 21.2698 3.28935 21.2698 5.58253C21.2698 7.8757 23.1267 9.73469 25.4174 9.73469Z"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </TickerWrapper>
)

export default Ticker
