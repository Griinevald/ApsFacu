import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UsuarioContext } from '../../context/user';
import {
    Main,
    DivButon,
    Main1,
    Box1
} from "./style"

function Home() {
    const history = useHistory();
    const { signOut } = useContext(UsuarioContext);

    return (
        <>
            <Main1>
                <Box1>
                    <Main >
                        <h1 class="">Home</h1>
                        <div className="homeButons">
                            <DivButon className="DivButon" onClick={() => { history.push("/chat") }} type="DivButon">Chat</DivButon>
                            <br />
                            <DivButon className="DivButon" onClick={() => { history.push("/about") }} type="DivButon">Sobre</DivButon>
                            <br />
                            <DivButon className="DivButon" onClick={() => { signOut() }} type="DivButon">Deslogar</DivButon>
                        </div>
                    </Main>
                </Box1>
            </Main1>


        </>
    )
}
export default Home;
