import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "../../context/user";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Logo from "../../img/Logo.png"
import Insta from "../../img/Insta.png"
import Linkedin from "../../img/Linkedin.png"
import Facebook from "../../img/Facebook.png"

import {
    Main,
    Header,
    Content,
    Footer,
    ContainerLogoPharse,
    ContainerSignIn

} from "./style"

function Login() {
    let nome;
    let idade;
    let history = useHistory()
    const { signIn, signUp } = useContext(UsuarioContext);
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")

    const handleLlogin = async () => {
        try {
            signIn(email, password)
        } catch (err) {
            console.log(err)
        }
    }
    const handleCadastrar = async () => {
        try {
            signUp(email, password)
        }catch{
           console.loh("nao foi criado")
        }
    }
    return (
        <>
            <Main>
                <Header>
                    <NotificationContainer />
                </Header>
                <Content>
                    <ContainerLogoPharse>
                        <div id="logo">
                            <img src={Logo} width="300px" />
                        </div>
                        <div id="pharse">
                            <p>Se não puder ajudar, atrapalhe</p>
                            <p>o importante e participar</p>
                        </div>
                    </ContainerLogoPharse>
                    <ContainerSignIn>
                        <div id="containerLogin">
                            <div id="containerButtons">
                                <div className="button">
                                    Membro
                                </div>
                                <div className="button inativo">
                                    Convidado
                                </div>
                            </div>

                            <div className="box">
                                <div className="title">
                                    Email
                                </div>
                                <input onChange={e => { setEmail(e.target.value) }} placeholder="Digite seu Email" />
                            </div>

                            <div className="box">
                                <div className="title">
                                    Senha
                                </div>
                                <input type="password" onChange={e => { setpassword(e.target.value) }} placeholder="Digite sua Senha" />
                            </div>
                            <div id="containerLoginOrJoin">
                                <div onClick={() => {
                                    if (!(!email || !password)) {
                                        handleCadastrar()
                                    } else {
                                        NotificationManager.warning('Você esqeuceu da senha ou do email');
                                    }
                                }} className="button invert">
                                    Cadastre-se
                                </div>
                                <div onClick={() => {
                                    if (!(!email || !password)) {
                                        if(password.length>5){
                                            handleLlogin()
                                        }else{
                                            NotificationManager.warning('Sua senha tem que ter no minimo 6 carateres');
                                        }
                                    } else {
                                        NotificationManager.warning('Você esqeuceu da senha ou do email');
                                    }
                                }} className="button">
                                    Entrar
                                </div>
                            </div>

                        </div>

                    </ContainerSignIn>

                </Content>
                <Footer>
                    <div id="logo">
                        <img src={Logo} width="100px" />
                    </div>
                    <div id="about">
                        <p>Contato</p>
                        <p>Vinicius@eumesmo.com</p>
                    </div>
                    <div id="social">
                        <img src={Linkedin} width="50px" />
                        <img src={Insta} width="45px" />
                        <img src={Facebook} width="50px" />
                    </div>
                </Footer>
            </Main>
        </>
    )
}
export default Login;
