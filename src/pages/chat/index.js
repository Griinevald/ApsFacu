import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "../../context/user"
import fireBaseApp from "../../services/firebase";
import { getFirestore, collection, addDoc, onSnapshot, query, where } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useChatScroll, useDataLoader } from 'use-chat-scroll'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import send from "../../img/send.png"
import load from "../../img/load.gif"
import upload from "../../img/upload.png"
import notificacao from "../../audio/notify.mp3"
import { Main, Footer, Header, Box, Main1, Box1 } from "./style";
const imagens = [".JPEG", ".JPG", ".GIF", ".PNG", ".BMP", ".SVG"]


function Chat() {
    const { user, signOut } = useContext(UsuarioContext);
    const [messages, setMessages] = useState([]);
    const [uploading, setUpload] = useState(false);
    const [msg, setMsg] = useState();
    const db = getFirestore(fireBaseApp);
    const storage = getStorage(fireBaseApp);
    const history = useHistory();
    const messagesEndRef = useRef(null)

    const toBase64 = file => new Promise((resolve, reject) => {
        debugger
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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
    const enviarImagem = async (url) => {
        try {
            await addDoc(collection(db, "mensagens"), {
                mensagem: null,
                img: url,
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
                if (messages.length > 0) {
                    var audio = new Audio(notificacao)
                    audio.play();
                }

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
                        <NotificationContainer />
                        <Header>
                            <h4 onClick={() => { history.push("/home") }}>Voltar</h4>
                        </Header>
                        <Box>
                            <div className="box" id="box" style={{ height: "100%", width: "96%", overflow: 'auto' }}>
                                {messages.map((item) =>
                                (
                                    <div ref={messagesEndRef} className={item.style + ' msgBox'} id={item.id}>
                                        {item.msg ? <>
                                            <p className="msg">{item.msg}</p>
                                            <p className="autor-tempo">{item.autor} - {item.time} </p></> :
                                            <>
                                                <div style={{ padding: " 5px" }}>
                                                    <img src={item.img} className={item.style + "img"} style={{ width: "100%" }} height="180" />
                                                    <p className="autor-tempo">{item.autor} - {item.time} </p>
                                                </div>

                                            </>}
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
                            <div style={{ display: 'flex' }} >
                                <img onClick={() => {
                                    if (msg) {
                                        handleEnviar()
                                        setMsg("")
                                    }
                                }} className="img" width='32px' src={send} />
                                {uploading ?
                                    <img className="img" src={load} width='32px' height='30px' /> :
                                    <img className="img" onClick={() => {
                                        document.getElementById('myfile').click()
                                    }} src={upload} width='26px' />
                                }

                            </div>

                            <div>
                                <input type="file" id='myfile' style={{ display: 'none' }} defaultValue={null} onChange={async (e) => {
                                    let file = document.querySelector('#myfile').files[0];
                                    let nome = e.target.files[0].name
                                    let isImage = 0;
                                    debugger
                                    imagens.map(e => {
                                        if (nome.includes(e.toLowerCase())) {
                                            isImage++
                                        }
                                    })
                                    console.log(isImage)
                                    if (isImage > 0) {
                                        setUpload(true)
                                        const imageRef = ref(storage, nome);
                                        await uploadBytesResumable(imageRef, file).then(async (snapshot) => {
                                            console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                                            console.log('File metadata:', snapshot.metadata);
                                            await getDownloadURL(snapshot.ref).then(async (url) => {
                                                enviarImagem(url)
                                                setUpload(false)
                                                document.getElementById('myfile').value = null
                                            });
                                        }).catch((error) => {
                                            console.error('Upload failed', error);
                                        });
                                    } else {
                                        NotificationManager.warning('Apenas imagens: .JPEG, .JPG, .GIF, .PNG, .BMP, .SVG');
                                    }
                                }} />
                            </div>
                        </Footer>
                    </Main>
                </Box1>
            </Main1>
        </>
    )
}
export default Chat;
