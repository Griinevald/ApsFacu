import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "../../context/user"
import fireBaseApp from "../../services/firebase";
import { getFirestore, collection, addDoc, onSnapshot, query, where } from "firebase/firestore"
import { useChatScroll, useDataLoader } from 'use-chat-scroll'
import send from "../../img/send.png"
import { Main, Footer, Header, Box, Main1, Box1 } from "./style";



function Chat() {
    const { user, signOut } = useContext(UsuarioContext);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState();
    const db = getFirestore(fireBaseApp);
    const history = useHistory();
    const messagesEndRef = useRef(null)


    const handleEnviar = async () => {
        try {
            await addDoc(collection(db, "mensagens"), {
                mensagem: msg,
                autor: user.email,
                lido: true,
                hora: new Date()
            })
        } catch (err) {
            console.log(err)
        }
    }

    const scrollToBottom = () => {
        if (messages.length > 0) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }
    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "mensagens"), where("hora", ">=", new Date()))
            , (querySnapshot) => {
                let tmp = [];

                querySnapshot.forEach(async (document) => {
                    let autor = document.data().autor === user.email ? "me" : "they"
                    let time = new Date(document.data().hora * 1000);
                    tmp.push({
                        id: document.id,
                        msg: document.data().mensagem,
                        style: autor,
                        time: time.getHours() + ":" + time.getMinutes(),
                        ...document.data()
                    })
                })


                setMessages(tmp)
            });
        return () => {
            unsub()
        }
    }, [])


    return (
        <>
            <Main1>
                <Box1>
                    <Main>
                        <Header>
                            <h4 onClick={() => { history.push("/home") }}>Voltar</h4>
                        </Header>
                        <Box>
                            <div className="box" id="box" style={{ height: "100%", width: "96%", overflow: 'auto' }}>
                                {messages.map((item) =>
                                (
                                    <div ref={messagesEndRef} className={item.style + ' msgBox'} id={item.id}>
                                        <p className="msg">{item.msg}</p>
                                        <p className="autor-tempo">{item.autor} - {item.time} </p>
                                    </div>
                                )
                                )}
                            </div>
                        </Box>
                        <Footer>
                            <div className="chatImput">
                                <input className="chatCss" value={msg} type="text" onChange={e => setMsg(e.target.value)} onKeyDown={(e) => {
                                    setMsg(e.target.value);
                                    if (e.key === 'Enter') {
                                        if (e.target.value) {
                                            handleEnviar()
                                            setMsg("")
                                        }
                                    }
                                }} />
                            </div>
                            <div onClick={() => {
                                if (msg) {
                                    handleEnviar()
                                    setMsg("")
                                }
                            }} >
                                <img className="img" src={send} width="32px" />
                            </div>
                        </Footer>
                    </Main>
                </Box1>
            </Main1>
        </>
    )
}
export default Chat;
