const localhost="http://localhost:3000/dono/"
let donos = []
let donoeditado=null;
    
    async function consultar(){
        await fetch(localhost)//async/await espera a função anterior terminar para executar a proxima
        .then((resposta)=>resposta.json())
        .then((resposta)=>{
            donos=resposta;
            console.log("Tabela atualizada com sucesso");

        })
        .catch((erro)=>console.log(erro));
        atualizar();
    }


function atualizar(){
    const corpoTab = document.getElementById("corpoTab");
    corpoTab.innerHTML="";
    donos.forEach((dono) =>{
        let linha = document.createElement("tr");
        linha.innerHTML = 
        `
        <td>${dono.id_cliente}</td>
        <td>${dono.nome}</td>
        <td>${dono.cpf}</td>
        <td>${dono.endereco}</td>
        <td>${dono.telefone}</td>
        <td><button onclick="inciaredicao(${dono.id_cliente})"/>Editar</button></td>
        <td><button onclick="deletar(${dono.id_cliente})">Excluir</button></td>
        `;
        corpoTab.appendChild(linha);
    })
}

async function deletar(id){
    await fetch(localhost +id,{
        method:"DELETE"
    })
    .then((resposta)=>resposta.json())
    .then((resposta)=>console.log(resposta))
    .catch((erro)=>console.log(erro));
    consultar();
}


async function post(){
let nome=document.getElementById("nome").value;
let cpf=document.getElementById("cpf").value;
let endereco=document.getElementById("telefone").value;
let telefone=document.getElementById("telefone").value;


let novodono={
    nome:nome,
    cpf:cpf,
    endereco:endereco,
    telefone:telefone 
};

await fetch(localhost,{
    method:"POST",
    headers:{
"Content-Type":"application/json"
    },
    body:JSON.stringify(novodono)
})
.then((resposta)=>resposta.json())
.then((resposta)=>console.log(resposta));
consultar();
}
function inciaredicao(idDono){
let dono=donos.find((donoss)=>donoss.id_cliente==idDono);
document.getElementById("canc").style.display="";
donoeditado=idDono;
document.getElementById("nome").value=dono.nome
document.getElementById("cpf").value=dono.cpf
document.getElementById("endereco").value=dono.endereco
document.getElementById("telefone").value=dono.telefone
}
async function put(id){
    let nome=document.getElementById("nome").value;
    let cpf=document.getElementById("cpf").value;
    let endereco=document.getElementById("endereco").value;
    let telefone=document.getElementById("telefone").value;
    let novodono={
        nome:nome,
        cpf:cpf,
        endereco:endereco,
        telefone:telefone 
    };
await fetch(localhost +id,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify(novodono)

})
.then((resposta)=>resposta.json())
.then((resposta)=>console.log(resposta))
.catch((erro)=>console.log(erro));
consultar();
}
document.getElementById("form").addEventListener("submit",(event)=>{
    event.preventDefault();//evitar que a pagina fique reiniciando auto
    if(donoeditado===null){
        post();
        consultar();
    }else{
        put(donoeditado);
        consultar();
    }

    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none";
});

document.getElementById("canc").addEventListener("click",(event)=>{
    event.preventDefault()//previne o submit
    document.getElementById("form").reset();//reseta o form
    donoeditado=null;//define o produto editado no momento como nulo
    document.getElementById("canc").style.display = "none"; // esconde o botão
})

consultar();