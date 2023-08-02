import style from "./inical.module.scss"
import { RecoilRoot } from "recoil"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Formulario from "./componentes"
import Comecar from "../pages/Comecar"
import Sortear from "../pages/Sortear"
import Resultado from "../pages/resultado"

export default function PaginaInicial():JSX.Element {
    return (
        <div className={ style.corpo } >
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<Formulario />}>
                            <Route index element={ <Comecar /> } />
                            <Route path="sortear" element={<Sortear />} />
                            <Route path="resultado" element={<Resultado />} />
                        </Route>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </div>
    )
}