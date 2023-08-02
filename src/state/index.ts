import { atom } from "recoil"
import { IAmigos } from "../interfaces"

export const statetListaAmigos = atom<IAmigos[]>({
    key: "listaAmigos",
    default: []
})

export const statetListaAmigosSorteados = atom<Map<string, string>>({
    key: "listaAmigosSorteados",
    default: new Map<string, string>()
})
