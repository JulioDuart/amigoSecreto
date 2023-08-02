import React from "react";
import { RecoilRoot } from "recoil";
import Comecar from "../pages/Comecar";
import { fireEvent, render, screen } from "@testing-library/react";
import { useListaAmigos, useSetListaAmigos } from "../hooks";
import { IAmigos } from "../interfaces";

const mockNavegacao = jest.fn()

jest.mock("react-router-dom", () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

describe("descreve a pagina inicial", () => {

    test("deve ser renderizada corretamente", () => {
        const {container} = render(
            <RecoilRoot>
                <Comecar />
            </RecoilRoot>
        )

        expect(container).toMatchSnapshot()
    })
})