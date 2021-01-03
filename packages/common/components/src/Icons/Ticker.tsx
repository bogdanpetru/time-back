import { FunctionComponent } from 'react'
import styled from 'styled-components'

const TickerWrapper = styled.svg<{ running: boolean }>`
  .rotate {
    transform-origin: 12px 15.5px;
    ${(props) => props.running && 'animation: rotate 2s infinite forwards;'}
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

const Ticker: FunctionComponent<{ running?: boolean }> = (props) => (
  <TickerWrapper
    width="24"
    height="28"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    running={props.running}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.8947 17.0281C12.6255 17.0281 13.2179 16.4351 13.2179 15.7035C13.2179 14.9719 12.6255 14.3788 11.8947 14.3788C11.1639 14.3788 10.5715 14.9719 10.5715 15.7035C10.5715 16.4351 11.1639 17.0281 11.8947 17.0281Z"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className="rotate"
      d="M16.7274 10.7629L12.9808 14.5096"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.7888 5.72797L20.1047 7.41396"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.818 6.38368L21.1339 4.69769"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22.9172 15.7167C22.9172 9.65782 18.0109 4.74609 11.9586 4.74609C5.90633 4.74609 1 9.65782 1 15.7167C1 21.7757 5.90633 26.6874 11.9586 26.6874C18.0109 26.6874 22.9172 21.7757 22.9172 15.7167Z"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.8948 4.72073C12.9211 4.72073 13.7531 3.88782 13.7531 2.86036C13.7531 1.83291 12.9211 1 11.8948 1C10.8684 1 10.0364 1.83291 10.0364 2.86036C10.0364 3.88782 10.8684 4.72073 11.8948 4.72073Z"
      stroke="#124551"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </TickerWrapper>
)

export default Ticker
