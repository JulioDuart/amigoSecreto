import { realizarSorteio } from "../helpers/realizarSorteio"

describe("dado um sorteio de amigo secreto", () => {

    test("cada participante não sorteio o próprio nome", () => {

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

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante.nome)
            expect(amigoSecreto).not.toEqual(participante.nome)
        })
    })
})