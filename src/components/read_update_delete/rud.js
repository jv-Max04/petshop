import './rud.css'
import BtVoltar from '../botaoVoltar.js'

export default function Rud() {
    return (
        <>
        <div id='background'>
            <BtVoltar/>
            <div id='registros_Div'>
                <div className='registroPlaceholder'>
                    <h1>Anml_PlcHldr</h1>
                    <p className='nome_Dono'>Dono_PlcHldr</p>
                    <p className='reg_Info'>Informações: Placeholder</p>
                    <img src='placeholder' alt=''></img>
                    <button className='btEditar'>Editar</button>
                    <button className='btRemover'>Remover</button>
                </div>

                <div className='registroPlaceholder'>
                    <h1>Anml_PlcHldr</h1>
                    <p className='nome_Dono'>Dono_PlcHldr</p>
                    <p className='reg_Info'>Informações: Placeholder</p>
                    <img src='placeholder' alt=''></img>
                    <button className='btEditar'>Editar</button>
                    <button className='btRemover'>Remover</button>
                </div>
                {adicionarRegistro}
            </div> 
        </div>
        </>
    )
}

const adicionarRegistro = () =>
{
    //Adicionar n registros do banco de dados
}

