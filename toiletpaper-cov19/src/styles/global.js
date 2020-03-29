import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    background-color: ${theme.main.bg};
    width: inherit;
    height: inherit;
    color: ${theme.main.text};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 1.25;
  }

  #app-root {
    width: inherit;
    height: inherit;
  }

  h1 {
    color: ${theme.brand.primary};
    font-size: 4.8rem;
    font-weight: 800;
  }

  h2 {
    color: ${theme.brand.primary};
    font-size: 3.4rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 2rem;
  }

  i {
    font-weight: 400;
  }
`;

export default GlobalStyle;
