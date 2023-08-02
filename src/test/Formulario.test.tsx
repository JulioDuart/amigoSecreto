import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import FormularioInput from "../pages/Comecar/componentes/FormularioInput";
import { RecoilRoot } from "recoil";

// Jest
describe("Comportamento do FormularioInput.tsx", () => {
    
    test("quando o input está vazio, novos participantes não podem ser adicionados", () => {

        render(
            <RecoilRoot>
                <FormularioInput />
            </RecoilRoot>
        )
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText("Adicionar nome dos participantes")
    
        // encontrar o botão
        const botao = screen.getByRole("button")
    
        // garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
    
        // garantir que o botao esteja desabilitado
        expect(botao).toBeDisabled()
    })
    
    test("adicionar um participante caso exista um nome preenchido", () => {
        render(
            <RecoilRoot>
                <FormularioInput />
            </RecoilRoot>
        )
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText("Adicionar nome dos participantes")
    
        // encontrar o botão
        const botao = screen.getByRole("button")
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina"
            }
        })
    
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        // garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()
    
        // garantir que o input não tenha um valor
        expect(input).toHaveValue("")
    })
    
    test("nomes duplicados não podem ser adicionados na lista", () => {
        render(
            <RecoilRoot>
                <FormularioInput />
            </RecoilRoot>
        )
        const input = screen.getByPlaceholderText("Adicionar nome dos participantes")
        const botao = screen.getByRole("button")
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina"
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina"
            }
        })
        fireEvent.click(botao)
    
        const mensagemErro = screen.getByRole("alert")
    
        expect(mensagemErro.textContent).toBe("Amigo já cadastrado!!!")
    })
    
    test("mensagem de erro sumindo depois de n segundos", () => {
        jest.useFakeTimers()
    
        render(
            <RecoilRoot>
                <FormularioInput />
            </RecoilRoot>
        )
        const input = screen.getByPlaceholderText("Adicionar nome dos participantes")
        const botao = screen.getByRole("button")
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina"
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: "Ana Catarina"
            }
        })
        fireEvent.click(botao)
    
        let mensagemErro = screen.queryByRole("alert")
    
        expect(mensagemErro).toBeInTheDocument()
    
        // esperar n segundos
    
        act(() => {
            jest.runAllTimers()
        })
    
        mensagemErro = screen.queryByRole("alert") 
        expect(mensagemErro).toBeNull()   
    })
})
