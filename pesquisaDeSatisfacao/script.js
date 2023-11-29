const localhost = "http://localhost:3000/satisfacao/"

let pesquisas = [] //id_pesquisa PK, id_cliente FK, nota, feedback
let pesquisaEditada = null;
console.log(pesquisaEditada);

function consultar()
{
    fetch(localhost,
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            }
        })
    .then((resposta) => resposta.json())
    .then((resposta) => 
    {
        pesquisas = resposta;
        atualizar();
    })
    .catch((erro) => console.log(erro));
}

function atualizar()
{
    const corpoTab = document.getElementById("corpoTab");
    corpoTab.innerHTML = "";
    document.getElementById("form").reset();

    pesquisas.forEach((objeto) =>
    {
        let linha = document.createElement("tr");
        linha.innerHTML = 
        `
            <td>${objeto.id_pesquisa}</td>
            <td>${objeto.id_cliente}</td>
            <td>${objeto.nota}</td>
            <td>${objeto.feedback}</td>
            <td><button class="btn btn-dark" onclick="iniciarEdicao(${objeto.id_pesquisa})">Editar</button></td>
            <td><button class="btn btn-danger" onclick="btExcluir(${objeto.id_pesquisa})">Excluir</button></td>
        `;
        corpoTab.appendChild(linha);
    })
}

document.getElementById("form").addEventListener("submit", (evento) =>
{
    evento.preventDefault();
    
    if(document.getElementById("inputIdCliente").value.trim() == "" ||document.getElementById("inputNota").value.trim() == ""||document.getElementById("inputFeedback").value.trim() == ""){
        alert("Preencha todos os campos!");
        return;
    }

    if(pesquisaEditada === null)
    {
        btEnviar();
        consultar();
    }
    else
    {
        btEditar(pesquisaEditada);
        consultar();
    }

    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none";
});

document.getElementById("canc").addEventListener("click", (evento) =>
{
    evento.preventDefault();
    pesquisaEditada = null;
    document.getElementById("form").reset();
    document.getElementById("canc").style.display = "none"
});

consultar();

async function btEnviar()
{
    let varIdCliente = document.getElementById("inputIdCliente").value;
    let varNota = document.getElementById("inputNota").value;
    let varFeedback = document.getElementById("inputFeedback").value;
    
    let novaPesquisa = 
    {
        id_cliente: varIdCliente,
        nota: varNota,
        feedback: varFeedback
    };

    await fetch(localhost, 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaPesquisa)
        })
        .then((resposta) => resposta.json())
        .then((resposta) => console.log(resposta))
        .catch((erro) => console.log(erro))

        consultar();
}

function iniciarEdicao(idPesquisa)
{
    let pesquisa = pesquisas.find((pesquisasCallback) => pesquisasCallback.id_pesquisa === idPesquisa);
    pesquisaEditada = idPesquisa;
    document.getElementById("canc").style.display="";

    document.getElementById("inputIdCliente").value = pesquisa.id_cliente;
    document.getElementById("inputNota").value = pesquisa.nota;
    document.getElementById("inputFeedback").value = pesquisa.feedback;
}

async function btEditar(id)
{
    console.log("click")

    let varIdCliente = document.getElementById("inputIdCliente").value;
    let varNota = document.getElementById("inputNota").value;
    let varFeedback = document.getElementById("inputFeedback").value;

    let novaPesquisa = 
    {
        id_cliente: varIdCliente,
        nota: varNota,
        feedback: varFeedback
    };

    await fetch(localhost + id, 
        {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaPesquisa)
        })
        .then((resposta) => resposta.json())
        .then((resposta) => console.log(resposta))
        .catch((erro) => console.log(erro));

        consultar();
}

async function btExcluir(id)
{
    console.log("click")

    await fetch(localhost + id, 
        {
            method: "DELETE"
        })
        .then((resposta) => resposta.json())
        .then((resposta) => console.log(resposta))
        .catch((erro) => console.log(erro))
        consultar();
}

