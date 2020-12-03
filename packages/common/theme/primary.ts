const lightBlue = '#E9FAFD';
const darkBlue = '#124551';
const gray100 = '#F2F2F2';
const gray200 = '#C4C4C4';
const gray300 = '#E5E5E5';
const gray400 = '#DDDCDC';
const yellow100 = '#F8BD00';
const yellow200 = '#EEB600';

const primary = darkBlue;


const input = {
  background_active: lightBlue,
  background: gray100,
  height: 40,
  border_bottom: `1px solid ${gray200}`,
  font_size: 18, 
};

const label = {
  font_size_with_value: 18,
  font_size: 12,
  color: primary,
}

const button = {
  font_size: 18,
  color: primary,
  padding: '7px 10px', 
  primary: {
    background: yellow100,
    active_background: yellow200,
  },
  secondary: {
    background: gray300,
    active_background: gray400,
  }
}

const common = `font-family: 'Inconsolata', monospace;`

const theme = {
  input,
  common,
  label,
  primary,
  button,
};

export default theme;