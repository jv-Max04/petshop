const localhost = "http://localhost:3000/atendimento/"
let atendimentos = []
let atendimentoEditado = null;


async function consultar(){
   await fetch(localhost)
    .then((r) => r.json())
    .then((r) => {
        atendimentos = r;
        console.log("Tabela atualizada com sucesso!")
    })
    .catch((erro) => console.log(erro));
    atualizar();
}

function atualizar(){
    const corpoTab = document.getElementById("corpoTabela");
    corpoTab.innerHTML = "";//Limpa a tabela existente
    atendimentos.forEach((atendimento) =>{
        let linha = document.createElement("tr");
        atendimento.data_atendimento = atendimento.data_atendimento.split('T')[0];
        linha.innerHTML = 
        `
        <td>${atendimento.id_cliente}</td>
        <td>${atendimento.id_animal}</td>
        <td>${atendimento.id_servico}</td>
        <td>${atendimento.data_atendimento}</td>
        <td>${atendimento.preco}</td>
        <td>${atendimento.forma_pagamento}</td>
        <td><button class="btn btn-dark" onClick="iniciarEdicao(${atendimento.id_atendimento})">Editar</button></td>
        <td><button class="btn btn-danger" onClick="deletar(${atendimento.id_atendimento})">Excluir</button></td>
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
    let id_cliente = document.getElementById("id_cliente").value;
    let id_animal = document.getElementById("id_animal").value;
    let id_servico = document.getElementById("id_servico").value;
    let data_atendimento = document.getElementById("data_atendimento").value;
    let preco = document.getElementById("preco").value;
    let forma_pagamento = document.getElementById("forma_pagamento").value;
    
    let novoAtendimento = {
        id_cliente: id_cliente,
        id_animal: id_animal,
        id_servico: id_servico, 
        data_atendimento: data_atendimento,
        preco: preco, 
        forma_pagamento: forma_pagamento, 
    };

    await fetch(localhost, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(novoAtendimento)
    })
    .then((r)=>r.json())
    .then((r)=>console.log(r))
    .catch((err)=>console.log(err));

    consultar();
}

function iniciarEdicao(idAtendimento){
    atendimentoEditado = idAtendimento;
    let atendimento = atendimentos.find((atend) => atend.id_atendimento === idAtendimento);
    
    document.getElementById("canc").style.display=""; 

    document.getElementById("id_cliente").value = atendimento.id_cliente;
    document.getElementById("id_animal").value = atendimento.id_animal;
    document.getElementById("id_servico").value = atendimento.id_servico;
    document.getElementById("data_atendimento").value = atendimento.data_atendimento;
    document.getElementById("preco").value = atendimento.preco;
    document.getElementById("forma_pagamento").value = atendimento.forma_pagamento;
}

async function put(id){
    let id_cliente = document.getElementById("id_cliente").value;
    let id_animal = document.getElementById("id_animal").value;
    let id_servico = document.getElementById("id_servico").value;
    let data_atendimento = document.getElementById("data_atendimento").value;
    let preco = document.getElementById("preco").value;
    let forma_pagamento = document.getElementById("forma_pagamento").value;
    
    let novoAtendimento = {
        id_cliente: id_cliente,
        id_animal: id_animal,
        id_servico: id_servico, 
        data_atendimento: data_atendimento,
        preco: preco, 
        forma_pagamento: forma_pagamento, 
    };

    await fetch(localhost + id, {
        method:"PUT", 
        headers:{
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(novoAtendimento)
    })
    .then((r)=>r.json())
    .then((r)=>console.log(r))
    .catch((err)=>console.log(err)); 

    consultar(); 
}

document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();

    if(document.getElementById("id_cliente").value.trim() == "" ||document.getElementById("id_animal").value.trim() == ""||document.getElementById("id_servico").value.trim() == ""||document.getElementById("data_atendimento").value.trim() == ""||document.getElementById("preco").value.trim() == ""||document.getElementById("forma_pagamento").value.trim() == ""){
        alert("Preencha todos os campos!");
        return;
    }
    
    if(atendimentoEditado === null){
        post();
        consultar();
    } else {
        put(atendimentoEditado); 
        atendimentoEditado = null;   
        consultar();
    }

    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none";

});

document.getElementById("canc").addEventListener("click", (event)=>{
    event.preventDefault(); //? Previne o submit
    atendimentoEditado = null;//? Define o produto sendo editado atualmente como nulo
    document.getElementById("form").reset(); //? Reseta o form
    document.getElementById("canc").style.display = "none"; //? Esconde o botão cancelar
})

consultar();