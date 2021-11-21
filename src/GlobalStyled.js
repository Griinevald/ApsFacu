import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{ 
    margin:0%;
    color: #fff;
    font-family: Verdana;
    background-color: #333;

}`;
export const Main1 = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;
export const Box1 = styled.div`
width: 25rem;
height: 35rem;
background: #fff;
border-radius: 2rem;
`;
