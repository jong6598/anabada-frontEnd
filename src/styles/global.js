import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   
   *{
      box-sizing: border-box;
     
      
   }

 body{
    margin: 0px;
    padding: 0px;
    font-family: 'Pretendard-Regular';
   
 }

 a, div {
   font-family: 'Pretendard-Regular';
    text-decoration: none;
    color:inherit;
    -webkit-tap-highlight-color: rgba(0,0,0,.1);
  }

  button{
   cursor: pointer;
   outline: none;
   border: none;
   background-color: transparent;
   font-family: 'Pretendard-Regular';
  }
  
  ul{
   padding-left: 0;
   list-style: none;
  }
  
  h2,p{
   margin: 0;
  }

  select{
   border: none;
   outline: none;
   font-family: 'Pretendard-Regular';
  }

  input{
   border: none;
   font-family: 'Pretendard-Regular';
   
  }
  input:focus-visible {
      outline: 0.01rem solid #007aff;
     
    }
    span{
      font-family: 'Pretendard-Regular';
    } 
    textarea{
      font-family: 'Pretendard-Regular';
    }
`;

export default GlobalStyle;
