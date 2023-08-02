import { useState } from "react"
import style from "../componentes.module.scss"
import { IAmigos } from "../../interfaces"
import { useListaAmigos } from "../../hooks"
import { useNavigate } from "react-router-dom"
import Formulario from "./componentes/FormularioInput"

const sacola = require("../../assets/sacolas.png")
const playSVG = require("../../assets/play.png")

export default function Comecar() {

    const listaAmigos:IAmigos[] = useListaAmigos()

    const nav = useNavigate()

    const botao = () => {
        if (listaAmigos.length > 3) {
            nav("/sortear")
        } 
    }

    return (
        <div className={style.divPrincipal} >
            <h1>Vamos começar!</h1>
            <div className={style.divInput} >
                <Formulario />
            </div>
            <div className={style.divLista} >
                {listaAmigos?.map(a => {
                    return (
                        <p key={a.id} role="listaItens" >{a.nome}</p>
                    )
                })}
            </div>
            <div className={style.divFooter}>
                <button onClick={botao} role="btn_enviar" disabled={listaAmigos?.length > 3 ? false : true} >
                    <img src={playSVG} alt="play" style={{ height: 20, width: 20, marginRight: 20 }} />
                    <p>Iniciar brincadeira!</p>
                </button>
                <img src={sacola} alt="sacola" />
            </div>
        </div>
    )
}