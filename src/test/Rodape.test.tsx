import React from "react";
import { RecoilRoot } from "recoil";
import Comecar from "../pages/Comecar";
import { fireEvent, render, screen } from "@testing-library/react";
import { useListaAmigos, useSetListaAmigos } from "../hooks";
import { IAmigos } from "../interfaces";

const mockNavegacao = jest.fn()

jest.mock("../hooks", () => {
    return {
        useListaAmigos: jest.fn(),
        useSetListaAmigos: jest.fn()
    }
})

jest.mock("react-router-dom", () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

describe("onde não exitem participantes suficientes", () => {
    test("conferindo se o botão está desabilitado com menos participantes", () => {

        render(
            <RecoilRoot>
                <Comecar />
            </RecoilRoot>
        )

        const btn = screen.getByRole("btn_enviar")

        expect(btn).toBeDisabled()
    })
})

describe("quando existe participantes suficiente", () => {

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

    beforeEach(() => {
        (useListaAmigos as jest.Mock).mockReturnValue(participantes),
            (useSetListaAmigos as jest.Mock).mockImplementation((amigo: IAmigos) => { })
    })

    test("a brincadeira pode ser iniciada", () => {

        render(
            <RecoilRoot>
                <Comecar />
            </RecoilRoot>
        )

        const btn = screen.getByRole("btn_enviar")
        expect(btn).toBeEnabled()
    })

    test("a brincadeira foi iniciada", () => {
        render(
            <RecoilRoot>
                <Comecar />
            </RecoilRoot>
        )

        const btn = screen.getByRole("btn_enviar")
        fireEvent.click(btn)

        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        expect(mockNavegacao).toHaveBeenCalledWith("/sortear")
    })
})
