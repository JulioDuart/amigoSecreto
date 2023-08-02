import Cabecalho from "../../componentes/Header"
import style from "./formulario.module.scss"
import { Outlet } from "react-router-dom"

export default function Formulario():JSX.Element {
    return (
        <>
            <Cabecalho />
            <div className={ style.div } >
                <Outlet />
            </div>
        </>
    )
}