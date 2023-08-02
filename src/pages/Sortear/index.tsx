import * as React from "react"
import style from "../componentes.module.scss"
import Lottie from "lottie-react"
import { useListaAmigos, useListaAmigosSorteados, useSortearAmigo } from "../../hooks"
import { useNavigate } from "react-router-dom"

const aviao = require("../../assets/aviao.png")
const dado = require("../../assets/animation_lkleo958.json")
const dadoPNG = require("../../assets/dado.png")

export default function Sortear() {
    const [ clicou, setClicou ] = React.useState(false)
    const [ nomeAmigo, setNomeAmigo ] = React.useState<string>("")
    const [ nomeAmigoSorteado, setNomeAmigoSorteado ] = React.useState<string | undefined>("")

    const nav = useNavigate()

    const listaAmigos = useListaAmigos()
    const listaAmigosSorteados = useListaAmigosSorteados()

    const atualizarAmigo = useSortearAmigo()

    React.useEffect(() => {
        atualizarAmigo()
    }, [])

    const botaoSortear = () => {
        setNomeAmigoSorteado(listaAmigosSorteados.get(nomeAmigo))
        setClicou(true)
        setTimeout(() => {
            setNomeAmigoSorteado("")
        }, 20000)
    }

    
    return (
        <div className={ style.divPrincipal } >

            <div style={{ display: "flex", alignItems: "flex-start", width: "150%" }} >
                <p 
                    style={{ fontSize: 20, color: "#1D5D9B", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => nav(-1)}
                >{"<"}</p>
            </div>

            <h1>Quem vai tirar o papelzinho?</h1>

            <div className={ style.divSelect } >
                <select
                    placeholder="Selecione um nome"
                    role="select_participante"
                    onChange={(e) => setNomeAmigo(e.target.value) }
                >
                    <option value={0} >Selecione seu nome</option>
                    {listaAmigos?.map( a => {
                        return (
                            <option key={a.id} value={a.nome}>{`${a.nome}`}</option>
                        )
                    } )}
                </select>
            </div>

            <button 
                className={ style.botaoSortear }
                onClick={botaoSortear}
                role="btn_sortear"
                disabled={ nomeAmigo ? false : true }
            >
                { clicou ? <Lottie animationData={dado} loop={false} style={{height: 30, marginRight: 10, marginBottom: 10}} onComplete={() => setClicou(false)} />
                : <img src={ dadoPNG } alt="Dado" style={{height: 18, marginRight: 12, marginBottom: 0}} />
                }
                <p>Sortear</p>  
            </button>

            <p className={style.nomeGanhador} role="nome_sorteado">{nomeAmigoSorteado}</p>

            <img src={ aviao } alt="aviao" style={{width: 150, cursor: "pointer"}} />

        </div>
    )
}

/*

const selecionarAmigo = () => {
        if (amigoSoreado?.id != 0 && amigoSoreado) {
            atualizarAmigo(amigoSoreado.id ,idAmigo)
            setAmigoSorteado({
                nome: "",
                id: 0,
                sorteado: false,
                escolheu: false,
                tirou: ""
            })
            setIdAmigo(0)
        }
    }

const botaoSortear = () => {
        if(idAmigo != 0) {
            setClicou(true)
            setAmigoSorteado(sorteiaAmigo(idAmigo))
            setTimeout( () => {
                setAmigoSorteado({
                    escolheu: false,
                    id: 0,
                    nome: "",
                    sorteado: false,
                    tirou: ""
                })
            }, 15000 )
        }
}

{ listaAmigosJaEscolhidos?.length > 0 ? 
                <p className={style.nomeGanhador} role="nome_sorteado">{amigoSoreado?.nome}</p> :
            <div>
                <p className={style.nomeGanhador} >Todos os amigos já foram sorteados!</p>
                <p className={style.nomeGanhador}
                    style={{color: "#0D1282", cursor: "pointer"}}
                    onClick={() => nav("/resultado")} 
                    >Clique aqui para ver o resultado!
                </p>
            </div> }

*/