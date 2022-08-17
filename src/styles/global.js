import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   *{
      box-sizing: border-box;
   }
   body{
      margin: 0px;
      padding: 0px;
   }
   a, div {
      text-decoration: none;
      color:inherit;
      -webkit-tap-highlight-color: rgba(0,0,0,.1);
   }
`;

export default GlobalStyle;
