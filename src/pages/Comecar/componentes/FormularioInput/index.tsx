import { useRef, useState } from "react"
import { useSetListaAmigos } from "../../../../hooks"
import { IAmigos } from "../../../../interfaces"

export default function FormularioInput() {
    const setAmigos = useSetListaAmigos()
    const [ nomeAmigo, setNomeAmigo ] = useState<string>("")
    const [ mensagemErro, setMensagemErro] = useState<string>("")

    const inputRef = useRef<HTMLInputElement>(null)

    const funcAdicionar = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (nomeAmigo) {
            const amigo:IAmigos = {
                id: Math.round(new Date().getTime() / 1000),
                nome: nomeAmigo,
                sorteado: false,
                escolheu: false,
                tirou: ""
            }
            try {
                setAmigos(amigo)
                setNomeAmigo("")
                inputRef.current?.focus()
                setMensagemErro("")
            } catch (e) {
                console.log(e)
                setMensagemErro("Amigo já cadastrado!!!")
                setTimeout(() => {
                    setMensagemErro("")
                }, 3000)
            }      
        }
    }
        
    return (
        <>
            <form>
                <input 
                    placeholder="Adicionar nome dos participantes"
                    value={nomeAmigo}
                    onChange={(e) => setNomeAmigo(e.target.value)}
                    ref={inputRef}
                />
                <button disabled={nomeAmigo.length >= 3 ? false : true} type="submit" onClick={funcAdicionar} >
                    Adicionar
                </button>
            </form>
            { mensagemErro && <span role="alert" >{ mensagemErro }</span> }
        </>
    )
}