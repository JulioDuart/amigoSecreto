import shuffle from "just-shuffle";
import { IAmigos } from "../interfaces";

export function realizarSorteio(participantes:IAmigos[]) {
    const listaAmigosModificada:IAmigos[] = shuffle(participantes)
    const tamanhoLista = listaAmigosModificada.length

    const resultado = new Map<string, string>()
    for (let index = 0; index < tamanhoLista; index++) {
        const indiceDoAmigo = index === (tamanhoLista - 1) ? 0 : index + 1
        resultado.set(listaAmigosModificada[index].nome, listaAmigosModificada[indiceDoAmigo].nome)
    }
    return resultado
}