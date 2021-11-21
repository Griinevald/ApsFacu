import React from "react";
import { useLocation, useHistory } from "react-router";
import {
    Main,
    Box,
    DivButon,
    Main1,
    Box1
} from "./style"
function About() {

    return (
        <>
        <Main1>
                <Box1>
            <Main>
                <h1>Notas</h1>
                <Box>
                    <span>
                        Opa mestre, não sei se lembra de mim o "Familia", um mlk retardado com cabelo de emo e com uma mancha no rosto, kkk enfim, hj eu sou dev/analista Sharepoint, amo fazer o back. E odeio esse negocio fazer o design de telas, então pega leve quando for avaliar isso kk, a parte de react eu manjo bem, mas enfim foi bom saber que voltei a ter aulas ctg que sempre foi muito legal e engraçado.
                    </span>

                    <span>
                        E a que nao tenho habilidade pra ser designer brinquei um pouco com hooks.
                    </span>
                </Box>
                <DivButon onClick={()=>{window.history.back()}} >Voltar</DivButon>
            </Main>
            </Box1>
            </Main1>

        </>
    )
}
export default About;
