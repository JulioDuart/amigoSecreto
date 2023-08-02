import { useNavigate } from "react-router-dom"
import { useListaAmigos } from "../../hooks"
import style from "./resultado.module.scss"

export default function Resultado() {
    const listaDeAmigos = useListaAmigos()
    const nav = useNavigate()

    return (
        <div>
            <div style={{ display: "flex", alignItems: "flex-start", width: "150%" }} >
                <p 
                    style={{ fontSize: 20, color: "#1D5D9B", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => nav(-1)}
                >{"<"}</p>
            </div>
            <h1 className={ style.titulo } >Tabela com os participantes</h1>
            <table className={ style.tabela }>
                <ul className={ style.linha_cabecalho } >
                    <li className={ style.coluna_cabecalho } >Nome de quem tirou a papelzinho</li>
                    <li className={ style.coluna_cabecalho} >Nome de quem foi tirado</li>    
                </ul>                
                    {listaDeAmigos.map(a => {
                        return (
                            <ul className={ style.linha_tabela } >
                                <li className={ style.coluna_tabela } >{a.nome}</li>
                                <li className={ style.coluna_tabela } >{a.tirou}</li>
                            </ul>
                        )
                    })}
                
            </table>
        </div>
    )
}