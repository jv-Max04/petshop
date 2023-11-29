const localhost = "http://localhost:3000/funcionario/";
let empregado = [];
let funcionarioEditado = null;

async function consultar(){
    await fetch(localhost)
    .then((resposta) => resposta.json())
    .then((resposta) => {
        empregado = resposta;
        console.log("Tabela atualizada com sucesso!");
    })
    .catch((erro) => console.log(erro));
    atualizar();
}
function atualizar(){
    const corpoTabela = document.getElementById("corpoTab");
    corpoTabela.innerHTML = "";
    empregado.forEach((funcionarios) => {
        let linha = document.createElement("tr");
        linha.innerHTML = 
        `
        <td>${funcionarios.nome}</td>
        <td>${funcionarios.cpf}</td>
        <td>${funcionarios.salario}</td>
        <td>${funcionarios.funcao}</td>
        <td><button class ="btn btn-dark" onClick = "iniciarEdicao(${funcionarios.id_funcionario})">Editar</button></td>
        <td><button class = "btn btn-danger" onClick = "deletar(${funcionarios.id_funcionario})">Excluir</button></td>
        `;
        corpoTabela.appendChild(linha);
    })
}

async function deletar(id){
    await fetch(localhost + id, {
        method:"DELETE"
    })
    .then((resposta) => resposta.json())
    .then((resposta) => console.log(resposta))
    .catch((err) => console.log(err));
    consultar();
}

async function post(){
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let salario = document.getElementById("salario").value;
    let funcao = document.getElementById("funcao").value;

    let novoFuncionario = {
        nome: nome,
        cpf: cpf,
        salario: salario,
        funcao: funcao
    }
    fetch(localhost, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoFuncionario)
    })
    .then((resposta) => resposta.json())
    .then((resposta) => console.log(resposta))
    .catch((err) => console.log(err));   
    consultar();
}

function iniciarEdicao(idFuncionario){
    let funcionario = empregado.find((func) => func.id_funcionario == idFuncionario);

    document.getElementById("canc").style.display = "";

    funcionarioEditado = idFuncionario;

    document.getElementById("nome").value = funcionario.nome;
    document.getElementById("cpf").value = funcionario.cpf;
    document.getElementById("salario").value = funcionario.salario;
    document.getElementById("funcao").value = funcionario.funcao;
}
async function put(id){
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let salario = document.getElementById("salario").value;
    let funcao = document.getElementById("funcao").value;

    let funcionarioAtualizado = {
        nome: nome,
        cpf: cpf,
        salario: salario,
        funcao: funcao
    };
     console.log(funcionarioAtualizado)
    await fetch(localhost + id, {
        method:"PUT",
        headers:{
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(funcionarioAtualizado)
    })
    .then((resposta) => resposta.json())
    .then((resposta) => console.log(resposta))
    .catch((err) => console.log(err));

    consultar();
}

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    if(document.getElementById("nome").value.trim() == "" ||document.getElementById("tipo").value.trim() == ""||document.getElementById("descricao").value.trim() == ""){
        alert("Preencha todos os campos!");
        return;
    } //? Para evitar linhas vazias

    if(funcionarioEditado == null){
        post();
        consultar();
    }
    else{
        put(funcionarioEditado);
        consultar();
    }

    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none";
})

document.getElementById("canc").addEventListener("click", (event) => {
    event.preventDefault()
    funcionarioEditado = null;
    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none";
})

consultar();    