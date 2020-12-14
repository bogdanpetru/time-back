const lightBlue = '#E9FAFD';
const darkBlue = '#124551';
const gray100 = '#F2F2F2';
const gray200 = '#C4C4C4';
const gray300 = '#E5E5E5';
const gray400 = '#DDDCDC';
const yellow100 = '#F8BD00';
const yellow200 = '#EEB600';
const red = '#E00202';

const primary = darkBlue;


const input = {
  background_active: lightBlue,
  background: gray100,
  height: 42,
  borderBottom: `1px solid ${gray200}`,
  fontSize: 18, 
};

const label = {
  fontSizeWithValue: 18,
  fontSize: 14,
  color: primary,
  colorWithValue: primary,
}

const button = {
  fontSize: 18,
  color: primary,
  padding: '7px 10px', 
  primary: {
    background: yellow100,
    activeBackground: yellow200,
  },
  secondary: {
    background: gray300,
    activeBackground: gray400,
  }
}

const text = {
  color: primary,
  fontSize: 14,
};

const title = {
  color: primary,
}

const error = {
  color: red,
};

const loader = {
  background_color: yellow100,
};

const common = `font-family: 'Inconsolata', monospace;`;

const theme = {
  input,
  common,
  label,
  primary,
  button,
  error,
  text,
  loader,
  title,
};

export default theme;