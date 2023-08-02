import * as React from "react";
import { useListaAmigos, useSortearAmigo, useListaAmigosSorteados } from "../hooks";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sortear from "../pages/Sortear";

const mockNavegacao = jest.fn()

jest.mock("react-router-dom", () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

const mockSoterarAmigo = jest.fn()

jest.mock("../hooks", () => {
    return {
        useListaAmigos: jest.fn(),
        useListaAmigosSorteados: jest.fn(),
        useSortearAmigo: () => mockSoterarAmigo
    }
})

describe("a pagina de sorteio", () => {

    const participantes = [
        {
            id: 1,
            nome: "Julio",
            sorteado: false,
            escolheu: false,
            tirou: ""
        },
        {
            id: 2,
            nome: "Duarte",
            sorteado: false,
            escolheu: false,
            tirou: ""
        },
        {
            id: 3,
            nome: "Rosa",
            sorteado: false,
            escolheu: false,
            tirou: ""
        },
        {
            id: 4,
            nome: "Maria",
            sorteado: false,
            escolheu: false,
            tirou: ""
        }
    ]

    const resultado = new Map<string, string>()

    resultado.set("Julio", "Duarte")
    resultado.set("Duarte", "Rosa")
    resultado.set("Rosa", "Maria")
    resultado.set("Maria", "Julio")

    beforeEach(() => {
        (useListaAmigos as jest.Mock).mockReturnValue(participantes),
        (useListaAmigosSorteados as jest.Mock).mockReturnValue(resultado)
    })

    test("tem n numero de opções", () => {
        render(
            <RecoilRoot>
                <Sortear />
            </RecoilRoot>
        )
        
        const select = screen.getByRole("select_participante")
        expect(select).toHaveLength(participantes.length + 1)
    })

    test("exibir o nome do amigo secreto", () => {
        render(
            <RecoilRoot>
                <Sortear />
            </RecoilRoot>
        )
        
        const select = screen.getByRole("select_participante")
        const btn = screen.getByRole("btn_sortear")
        
        fireEvent.change(select)
        fireEvent.click(btn)
        
        const nomeSorteado = screen.getByRole("nome_sorteado")  
        expect(nomeSorteado).toBeInTheDocument()
        expect(mockSoterarAmigo).toHaveBeenCalledTimes(1)
    })
})
