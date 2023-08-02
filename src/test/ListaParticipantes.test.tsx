import React from "react";
import { RecoilRoot } from "recoil";
import Comecar from "../pages/Comecar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useListaAmigos, useSetListaAmigos } from "../hooks";
import { IAmigos } from "../interfaces";

jest.mock("../hooks", () => {
    return {
        useListaAmigos: jest.fn(),
        useSetListaAmigos: jest.fn()
    }
})

describe("uma lista vazia de participantes", () => {
    beforeEach(() => {
        (useListaAmigos as jest.Mock).mockReturnValue([]),
        (useSetListaAmigos as jest.Mock).mockImplementation((amigo:IAmigos) => {})
    })

    test("deve retornar uma lista vazia", () => {

        render(
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<Comecar />} />
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        )
    
        const itens = screen.queryAllByRole("listaItens")
        expect(itens).toHaveLength(0)
    })

})

describe("adicionado n amigos", () => {

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
        }
    ]

    beforeEach(() => {
        (useListaAmigos as jest.Mock).mockReturnValue(participantes),
        (useSetListaAmigos as jest.Mock).mockImplementation((amigo:IAmigos) => {})
    })

    test("conferido se tem n amigos", () => {

        render(
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<Comecar />} />
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        )
    
        const itens = screen.queryAllByRole("listaItens")
        expect(itens).toHaveLength(participantes.length)

    })
})
