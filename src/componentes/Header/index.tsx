import style from "./header.module.scss"

const logo = require("../../assets/logo.png")
const mulher = require("../../assets/participante.png")

export default function Cabecalho():JSX.Element {
    return (
        <header className={ style.cabecalho } >
            <img src={logo} alt="Logo" className={ style.logo } />
            <img src={mulher} alt="Mulher" className={ style.mulher } />
        </header>
    )
}