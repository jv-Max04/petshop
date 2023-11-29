import { useState } from "react";
import "./telaPesquisa.css";
import BotaoVoltar from "../../btVoltar/botaoVoltar";

export default function TelaPesquisa() {

    const [telaInicialRenderizada, setTelaInicialRenderizada] = useState(false);
    const [renderizarBtVoltar, setRenderizarBtVoltar] = useState(true);

    return (
        <>
            {!telaInicialRenderizada && 
            renderizarBtVoltar &&
            (
                <div>
                    <BotaoVoltar/>
                <div id="div_botoes">
                    <button>Acessar</button>
                    <button>Adicionar</button>
                    <button>Modificar</button>
                    <button>Remover</button>
                </div>
                
            </div>
            )}
        </>
    )
}