const lightBlue = '#E9FAFD'
const darkBlue = '#124551'
const gray100 = '#F2F2F2'
const gray200 = '#C4C4C4'
const gray300 = '#E5E5E5'
const gray400 = '#DDDCDC'
const gray500 = '#DADADA'
const yellow100 = '#F8BD00'
const yellow200 = '#EEB600'
const red = '#E00202'

const primary = darkBlue
const highlight = yellow100
const alert = red
const lowlight = lightBlue

const input = {
  background_active: lowlight,
  background: gray100,
  height: 42,
  borderBottom: `1px solid ${gray200}`,
  borderBottomError: `1px solid ${alert}`,
  fontSize: 18,
  errorColor: alert,
}

const label = {
  fontSizeWithValue: 18,
  fontSize: 14,
  color: primary,
  colorWithValue: primary,
}

const button = {
  fontSize: 18,
  color: primary,
  padding: '10px 20px',
  primary: {
    background: yellow100,
    activeBackground: yellow200,
  },
  secondary: {
    background: gray300,
    activeBackground: gray400,
  },
}

const text = {
  color: primary,
  fontSize: 14,
}

const title = {
  color: primary,
}

const error = {
  color: red,
}

const loader = {
  background_color: yellow100,
}

const common = `
  font-family: 'Inconsolata', monospace;
`

const list = {
  fontSize: 21,
  item: {
    borderColor: gray500,
    color: primary,
    backgroundHighlight: lowlight,
  },
}

const toast = {
  background: highlight,
  color: primary,
}

const timer = {
  fontSize: 76,
  color: primary,
}

const theme = {
  button,
  common,
  error,
  input,
  label,
  list,
  loader,
  primary,
  text,
  title,
  toast,
  timer,
}

export default theme
