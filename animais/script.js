const localhost = "http://localhost:3000/animal/"

let animais = []

let animalEditado = null;

function atualizar(){
  const corpoTab = document.getElementById("corpoTab");
  corpoTab.innerHTML = "";
  animais.forEach((animal) =>{
      let linha = document.createElement("tr");
      linha.innerHTML = 
      `
      <td>${animal.id_animal}</td>
      <td>${animal.id_dono}</td>
      <td>${animal.nome}</td>
      <td>${animal.especie}</td>
      <td>${animal.raca}</td>
      <td>${animal.cor}</td>
      <td>${animal.sexo}</td>
      <td><button class="btn btn-dark" onClick="iniciarEdicao(${animal.id_animal})">Editar</button></td>
      <td><button class="btn btn-danger" onClick="deletar(${animal.id_animal})">Excluir</button></td>
      `;
      corpoTab.appendChild(linha);
      console.log("Colocado");
  })
}

async function consultar() {
  await fetch(localhost)
  .then((resposta) => resposta.json())
  .then((resp) => {
    animais = resp;
    console.log("Banco de dados consultado com sucesso!")
    atualizar();
  })
  .catch((erro) => console.log(erro));
 
}


async function deletar(id){
  await fetch(localhost + id, {
    method: "DELETE"
  })
  .then((resposta) => resposta.json())
  .then((resp) => console.log(resp))
  .catch((erro) => console.log(erro));
  consultar();
}


async function post() {
  let id_dono = document.getElementById("dono").value;
  let nome = document.getElementById("nome").value;
  let especie = document.getElementById("especie").value;
  let raca = document.getElementById("raca").value;
  let cor = document.getElementById("cor").value;
  let sexo = document.getElementById("sexo").value;

  let novoAnimal = {
    id_dono: id_dono,
    nome: nome,
    especie: especie,
    raca: raca,
    cor: cor,
    sexo: sexo
  };

  await fetch(localhost, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(novoAnimal)
  })
  .then((resposta) => resposta.json())
  .then((resp) => console.log(resp))
  .catch((erro) => console.log(erro));

  consultar();
}


function iniciarEdicao(id_animal) {
  let animal = animais.find((obj) => obj.id_animal == id_animal);
  animalEditado = id_animal;
  document.getElementById("canc").style.display = "";

  document.getElementById("dono").value = animal.id_dono;
  document.getElementById("nome").value = animal.nome;
  document.getElementById("especie").value = animal.especie;
  document.getElementById("raca").value = animal.raca;
  document.getElementById("cor").value = animal.cor;
  document.getElementById("sexo").value = animal.sexo;
}


async function put() {
  let id_dono = document.getElementById("dono").value;
  let nome = document.getElementById("nome").value;
  let especie = document.getElementById("especie").value;
  let raca = document.getElementById("raca").value;
  let cor = document.getElementById("cor").value;
  let sexo = document.getElementById("sexo").value;

  let animalAtualizado = {
    id_dono: id_dono,
    nome: nome,
    especie: especie,
    raca: raca,
    cor: cor,
    sexo: sexo
  };

  await fetch(localhost + animalEditado, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(animalAtualizado)
  })
  .then((resposta) => resposta.json())
  .then((resp) => console.log(resp))
  .catch((erro) => console.log(erro));

  consultar();

}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  if(document.getElementById("dono").value.trim() == "" ||document.getElementById("nome").value.trim() == ""||document.getElementById("especie").value.trim() == "" || document.getElementById("raca").value.trim() == "" || document.getElementById("cor").value.trim() == "" || document.getElementById("sexo").value.trim() == ""){
    alert("Preencha todos os campos!");
    return;
} //? Evita input vazio


  if (animalEditado === null) {
    post();
    consultar();
  } else {
    put(animalEditado);
    animalEditado = null;
    consultar();
  }

  document.getElementById("form").reset();
  document.getElementById("canc").style.display = "none";
});

document.getElementById("canc").addEventListener("click", (event) => {
  event.preventDefault();
  animalEditado = null;
  document.getElementById("form").reset();
  document.getElementById("canc").style.display = "none";
})


consultar();