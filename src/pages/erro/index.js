import React from "react";
import { Link } from "react-router-dom";

function Error() {
    return (
        <>
            <h1 style={{color:"black", textAlign: "center"}}>Página 404</h1>
            <Link style={{color:"black", textAlign: "center"}} to="/home">Voltar a Home</Link>
        </>
    )
}
export default Error;
