import { createGlobalStyle } from './config/styled-components';

const GlobalTheme = createGlobalStyle`
html, body {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.dark};
    font-family: ${props => props.theme.fonts.primary};
    min-height: 100%;
  }

  #root {
    min-height: 100%;
    display: inline;
  }
`;

export default GlobalTheme;
