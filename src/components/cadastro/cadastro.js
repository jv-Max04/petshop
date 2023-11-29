import './cadastro.css';
import BtVoltar from '../btVoltar/botaoVoltar.js'

export default function Cadastro({idCad}) {
    return(
        <>
        <div id='cadastroDiv'>
            <BtVoltar />

            <div id='containerForm'>
                <div id='cadastrarX_Div'>
                    <h1 id='cadastrarX'>placeholder</h1> {/*Cadastrar ____, mudar com javascript*/}
                </div>
                <div id='formDinamico_Div'> placeholder {/*Remover texto da div quando concluir form*/}
                    {formDinamico(idCad)}
                </div>
            </div>
        </div>
        </>
    )
}



const formDinamico = (idCad) =>
{
    //Cria o form na página baseado na variável idCad,
    // passada pelo botão clicado pelo usuário na página Home
}

const validarCadastro = () =>
{
    //Zis is a Flammenwerfer! It werfs flammens!
}