import styled from "styled-components";

export const Main = styled.div`
text-align: center;
position: relative;
width:25rem;
height: 24rem;
.homeButons{
    margin-top: 40%;
}
.chatCss {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-left: 5%;
}

.chatImput {
    float: left;
    width: 80%;
}
.chatButon{
    width: 50px;
    height: 50px;
    float: right;
    cursor: pointer;
}
.img{
    border: 1px solid #cccccc;
    border-radius: 10%;
    padding: 5px;
    margin-top: 2%;
}
.img:hover{
    border: 1.5px solid black;
    border-radius: 10%;
    padding: 5px;
    margin-top: 2%;
    cursor: pointer;
}
.box{
    border: 1px solid #cccccc;
    margin: 1% 1.5%
}
.me{
    border-top-right-radius: 4em;
    border-top-left-radius: 4em;
    border-bottom-left-radius: 4em;
    background-color: rgb(160, 240, 176);
    margin: 1% 0 1% 37%;
    text-align: right;

}
.they{
    border-top-right-radius: 4em;
    border-top-left-radius: 4em;
    border-bottom-right-radius: 4em;
    background-color: rgb(0, 240, 255);
    margin: 2% 37% 0% 3%;
    text-align: left;

}
.they .autor-tempo{
    text-align: left;
}
.msgBox{
    width: 60%;
}
.autor-tempo{
    font-size: 8px;
    text-align: right;
    margin: 0 2%;
    padding: 0;
}
.msg{
    margin: 0 5%;
    padding: 0;
}
`;
export const Box = styled.div`
width: 100%;
    height: 100%;
`;
export const Footer = styled.div`
padding: 3%;
flex-direction: row;
`;
export const Header = styled.div`
padding: 3%;
flex-direction: row;
cursor: pointer;
`;
export const Main1 = styled.div`
color: black;
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