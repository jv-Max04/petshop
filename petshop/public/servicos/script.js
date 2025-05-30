const localhost = "http://localhost:3000/servico/"
let servicos = []
let servicoEditado = null;


async function consultar(){
   await fetch(localhost)
    .then((r) => r.json())
    .then((r) => {
        servicos = r;
        console.log("Tabela atualizada com sucesso!")
    })
    .catch((erro) => console.log(erro));
    atualizar();
}

function atualizar(){
    const corpoTab = document.getElementById("corpoTabela");
    corpoTab.innerHTML = "";
    servicos.forEach((servico) =>{
        let linha = document.createElement("tr");
        linha.innerHTML = 
        `
        <td>${servico.nome}</td>
        <td>${servico.tipo}</td>
        <td>${servico.descricao}</td>
        <td><button class="btn btn-dark" onClick="iniciarEdicao(${servico.id_servico})">Editar</button></td>
        <td><button class="btn btn-danger" onClick="deletar(${servico.id_servico})">Excluir</button></td>
        `;
        corpoTab.appendChild(linha);
    })
}

async function deletar(id){
    await fetch(localhost + id, {
        method:"DELETE"
    })
    .then((r) => r.json())
    .then((r) => console.log(r))
    .catch((err) => console.log(err));
    consultar();
}

async function post(){
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    
    let novoServico = {
        nome: nome,
        tipo: tipo,
        descricao: descricao
    };

    await fetch(localhost, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(novoServico)
    })
    .then((r)=>r.json())
    .then((r)=>console.log(r))
    .catch((err)=>console.log(err));

    consultar();
}

function iniciarEdicao(idServico){
    servicoEditado = idServico;

    let servico = servicos.find((serv) => serv.id_servico === idServico);
    document.getElementById("canc").style.display = "";

    document.getElementById("nome").value = servico.nome;
    document.getElementById("tipo").value = servico.tipo;
    document.getElementById("descricao").value = servico.descricao;
}

async function put(id){
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    
    let servicoAtualizado = {
        nome: nome,
        tipo: tipo,
        descricao: descricao
    };

    await fetch(localhost + id, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(servicoAtualizado)
    })
    .then((r)=>r.json())
    .then((r)=>console.log(r))
    .catch((err)=>console.log(err));

    consultar();
}

document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();

    if(document.getElementById("nome").value.trim() == "" ||document.getElementById("tipo").value.trim() == ""||document.getElementById("descricao").value.trim() == ""){
        alert("Preencha todos os campos!");
        return;
    }
    
    if(servicoEditado === null){
        post();
        consultar();
    } else {
        put(servicoEditado);  
        servicoEditado = null;  
        consultar();
    }

    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none";

});

document.getElementById("canc").addEventListener("click", (event)=>{
    event.preventDefault(); //? Previne o submit
    servicoEditado = null;//? Define o produto sendo editado atualmente como nulo
    document.getElementById("form").reset(); //? Reseta o form
    document.getElementById("canc").style.display = "none"; //? Esconde o botão cancelar
})

consultar();