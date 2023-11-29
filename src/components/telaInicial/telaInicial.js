import { useState } from 'react';
import './telaInicial.css';
import TelaDono from '../tabelas/dono/telaDono'; //TO DO
import TelaAnimal from '../tabelas/animal/telaAnimal'; //TO DO
import TelaFuncionario from '../tabelas/funcionario/telaFuncionario'; //TO DO
import TelaAtendimento from '../tabelas/atendimento/telaAtendimento'; //TO DO
import TelaPesquisa from '../tabelas/pesquisa/telaPesquisa';

export default function TelaInicial() {
    const [botaoSelecionado, setBotaoSelecionado] = useState(null);
    const [telaRenderizada, setTelaRenderizada] = useState(false);  
    const handleClickBotao = (idClick) => {
        setTelaRenderizada(true);
        setBotaoSelecionado(idClick);
    };  

    return (
        <>
        {/*Renderiza TelaInicial apenas enquanto outra tela não estiver renderizada*/}
            {!telaRenderizada && (
              <div id='div_botoes'>
                <button onClick={() => handleClickBotao(0)}>Donos</button>
                <button onClick={() => handleClickBotao(1)}>Animais</button>
                <button onClick={() => handleClickBotao(2)}>Funcionários</button>
                <button onClick={() => handleClickBotao(3)}>Atendimentos realizados</button>
                <button onClick={() => handleClickBotao(4)}>Pesquisa de satisfação</button>
              </div>
        )}  
        {botaoSelecionado !== null && botaoSelecionado === 0 && <TelaDono/>}
        {botaoSelecionado !== null && botaoSelecionado === 1 && <TelaAnimal/>}
        {botaoSelecionado !== null && botaoSelecionado === 2 && <TelaFuncionario/>}
        {botaoSelecionado !== null && botaoSelecionado === 3 && <TelaAtendimento/>}
        {botaoSelecionado !== null && botaoSelecionado === 4 && <TelaPesquisa/>}
        </>
    );
}
