import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`

#root {

}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html { 
  font-size:62.5%
}

body {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2e2d41;
  cursor: default;
}


button,
input {
  font-family: 'Raleway', sans-serif;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}

a, img, div{
  -webkit-tap-highlight-color: transparent;
}
`;

export default GlobalStyle;
