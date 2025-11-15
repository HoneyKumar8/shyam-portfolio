import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #0f0f0f;
    color: #fff;
  }

  a {
    color: #ff007f;
    text-decoration: none;
  }

  h1, h2, h3 {
    color: #ff007f;
  }

  button {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export default GlobalStyles;
