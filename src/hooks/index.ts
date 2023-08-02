import { useRecoilState, useSetRecoilState } from "recoil"
import { IAmigos } from "../interfaces"
import { statetListaAmigos, statetListaAmigosSorteados } from "../state"
import shuffle from "just-shuffle"
import { realizarSorteio } from "../helpers/realizarSorteio"

export const useListaAmigos = () => {
    const amigos = useRecoilState<IAmigos[]>(statetListaAmigos)

    return amigos[0]
    
}

export const useSetListaAmigos = () => {
    const setAmigos = useSetRecoilState<IAmigos[]>(statetListaAmigos)
    const amigos = useRecoilState<IAmigos[]>(statetListaAmigos)

    return (amigo:IAmigos) => {
        const jaTem = amigos[0].find(a => a.nome === amigo.nome)
        if (jaTem) throw Error("Nome já cadastrado!")
        else setAmigos(amigosAntigos => [...amigosAntigos, amigo])
    }
}

export const useSorteioAmigo = () => {
    const listaAmigos = useListaAmigos()

    return (id:number|undefined) => {
        const amigosNaoSorteados = listaAmigos.filter(a => a.sorteado === false)
        const amigosFiltrado = amigosNaoSorteados.filter(a => a.id !== id)
        const numeroRestante = amigosFiltrado.length
        return amigosFiltrado[Math.floor(Math.random() * numeroRestante)]
    }
}

export const useListaAmigosQueEscolheram = () => {
    const amigos = useRecoilState<IAmigos[]>(statetListaAmigos)

    const amigosNaoSorteados = amigos[0].filter(a => a.escolheu === false)
    return amigosNaoSorteados 
}

export const useSortearAmigo = () => {
    const listaAmigos = useListaAmigos()
    const listaAmigosModificada:IAmigos[] = shuffle(listaAmigos)

    const restult = useSetRecoilState(statetListaAmigosSorteados)

    return () => {
        const resultado = realizarSorteio(listaAmigosModificada)
        restult(resultado)
    }
}

export const useListaAmigosQueSorteados = () => {
    const amigos = useRecoilState<IAmigos[]>(statetListaAmigos)

    return () => {
        const amigosNaoSorteados = amigos[0].filter(a => a.sorteado === false)
        return amigosNaoSorteados
    }
}

export const useListaAmigosSorteados = () => { 
    const amigos = useRecoilState(statetListaAmigosSorteados)
    return amigos[0]   
}

/*
export const useSortearAmigo = () => {
    const listaAmigos = useListaAmigos()


    const setAmigos = useSetRecoilState<IAmigos[]>(statetListaAmigos)

    return (idSorteado:number|undefined, idEscolheu:number|undefined) => {
        const amigoFiltrado = listaAmigos.find(a => a.id === idSorteado)
        if (amigoFiltrado) {
            const nome = amigoFiltrado.nome
            const atuAmigoSort = {
                id: amigoFiltrado.id,
                nome: nome,
                sorteado: true,
                escolheu: amigoFiltrado.escolheu,
                tirou: amigoFiltrado.tirou
            }
            const index = listaAmigos.findIndex(a => a.id === idSorteado)
            setAmigos(amigosAntigo => [...amigosAntigo.slice(0, index), atuAmigoSort, ...amigosAntigo.slice(index + 1)])
            const amigoFiltradoEscolheu = listaAmigos.find(a => a.id === idEscolheu)
            if (amigoFiltradoEscolheu) {
                const nome = amigoFiltradoEscolheu.nome
                const atuAmigoEsco = {
                    id: amigoFiltradoEscolheu.id,
                    nome: nome,
                    sorteado: amigoFiltradoEscolheu.sorteado,
                    escolheu: true,
                    tirou: amigoFiltrado.nome
                }
                const index = listaAmigos.findIndex(a => a.id === idEscolheu)
                setAmigos(amigosAntigo => [...amigosAntigo.slice(0, index), atuAmigoEsco, ...amigosAntigo.slice(index + 1)])
            }
        }
        
    }
}

*/