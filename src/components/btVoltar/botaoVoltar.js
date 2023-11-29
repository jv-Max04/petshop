import { useState } from 'react';
import './botaoVoltar.css';
import TelaInicial from '../telaInicial/telaInicial';

export default function BotaoVoltar() {
    const [botaoSelecionado, setBotaoSelecionado] = useState(null);
    const [telaInicialRenderizada, setTelaInicialRenderizada] = useState(false);
    const [renderizarBtVoltar, setRenderizarBtVoltar] = useState(true);
    const handleClickBotao = () =>
    {
        setTelaInicialRenderizada(true);
        setBotaoSelecionado();
        setRenderizarBtVoltar(false);
    }

    return (
        <>
            {!telaInicialRenderizada && 
            renderizarBtVoltar && (
                <button id='btVoltar' onClick={handleClickBotao}>VOLTAR</button>
            )}
                {botaoSelecionado !== null && <TelaInicial/>}
        </>
    )
}