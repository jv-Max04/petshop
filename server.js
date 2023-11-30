//! ==============================================================================================
const express = require('express'); //? Necessário para as funções de backend em geral.
const cors = require('cors'); //? Necessário para executar backend e frontend no mesmo computador.
const mysql = require('mysql2'); //? Usando mysql2 por conta do procedimento de autenticação.
const port = 3000;

const con = mysql.createConnection({
    host:"localhost",
    user:"dev",
    password:"uscs",
    database:"petshop"
});

const app = express(); //? Cria uma instância do express
app.use(express.json()); //? Configura o express para ler JSON 
app.use(cors()); //? Configura o express para usar o CORS

con.connect(function(err) {
    if (err){
        console.log("Erro durante a conexão: " + err);
        con.end();
        return;
    }  
    console.log("Conectado!");
    
    app.listen(port, () => {
        console.log(`Servidor online na porta: ${port}`);
    }) //? Declarando a porta em uma constante e ativando o listener

}); //? Função acima cria uma conexão com o SGBD

function checkErr(res, erro, resp){
    if(erro){
        res.json(erro)
    } else {
        res.json(resp)
    }
}

//! ==============================================================================================

//* =================================== MAX (Tabela Serviço) =====================================
 app.get("/servico/", (req, res) =>{
    con.query("select * from servico", (erro, resposta)=>{
        checkErr(res, erro, resposta);
    });
 });

 app.post("/servico", (req, res) =>{
    const servico = req.body;
    
    con.query("insert into servico set ?", servico, (erro, resp)=>{
        checkErr(res, erro, resp);
    });
 });

 app.put("/servico/:id", (req, res) => {
    const id  = req.params.id;
    const body = req.body;

    con.query("update servico set ? where id_servico = " + id, body, (erro, resp) =>{
        checkErr(res, erro, resp)
    });
 });

 app.delete("/servico/:id", (req, res)=>{
    con.query(`delete from atendimento where id_servico = ${req.params.id}`);
    con.query(`delete from servico where id_servico = ${req.params.id}`, (erro, resp) =>{
        checkErr(res, erro, resp);
    });
 });
//* ==============================================================================================

//* =================================================== (Satisfação - Lucas) =====================================================

/*
    id_pesquisa int PK
    id_cliente int FK
    nota float
    feedback longtext
*/  



function checkErrComID(res, err, resp)
{
    if(err)
        res.status(404).json(err);
    else if(resp)
        res.status(201).json(resp);
    else
        res.status(400).json({message: "ID de Satisfação não encontrado"});
}

app.get("/satisfacao", (req, res) =>
{
    con.query("SELECT * FROM satisfacao;", (resp, err) =>
    {
        checkErr(res, err, resp);
    });
});

app.post("/satisfacao", (req, res) =>
{
    const body = req.body;
    const sql = "INSERT INTO satisfacao (id_cliente, nota, feedback) VALUES (?, ?, ?)";
    const valores = [body.id_cliente, body.nota, body.feedback];

    con.query(sql, valores, (err, resp) =>
    {
        checkErr(res, err, resp);
    });
});

app.put("/satisfacao/:id", (req, res) =>
{
    const body = req.body;

    con.query(`UPDATE satisfacao SET ? WHERE id_pesquisa = ${req.params.id}`, body, (err, resp) =>
    {
        checkErrComID(res, err, resp);
    });
});

app.delete("/satisfacao/:id", (req, res) =>
{
    con.query(`DELETE FROM satisfacao WHERE id_pesquisa = ${req.params.id}`, (err, resp) => 
    {
        checkErrComID(res, err, resp);
    });
});

//* ==============================================================================================================================

//* ======================================================== Karen (Animal) ======================================================
app.get("/animal/", (req, resp) => {
    con.query(`select * from animal`, (erro, resposta)=> {
        if(erro) {
            resp.json(erro);
        } else {
            resp.json(resposta);
        }
    });
});


app.put("/animal/:id", (req, resp) => {
    const corpo = req.body;
    const id = req.params.id;

 
    con.query(`update animal set ? where id_animal = ${id}`, corpo, (erro, resposta) => {
        if(erro) {
            resp.json(erro);
        } else {
            resp.json(resposta);
        }
    });
});


app.post("/animal/", (req, resp) => {
    const corpo = req.body;
    con.query(`insert into animal set ? `, corpo, (erro, resposta) => {
        if(erro) {
            resp.json(erro);
        } else {
            resp.json(resposta);
        }
    });
});


 
app.delete("/animal/:id", (req, resp) => {
    const id = req.params.id;
    con.query(`delete from atendimento where id_animal = ${id}`);
    con.query(`delete from Animal where id_animal = ${id}`, (erro, resposta) => {
        if(erro) {
            resp.json(erro);
        } else {
            resp.json(resposta);
        }
    });
});

//* ============================================================================================================================

//* ==================================================== Gabriel (Dono) ========================================================
app.get("/dono/",(req,res)=>{
    con.query("select *from dono",(erro,resposta)=>{
      checkErr(res,erro,resposta);
    })
    });
    
    app.post("/dono/",(req,res) =>{
      const novodono=req.body;
     
      con.query("insert into dono set ?",novodono,(erro,resposta)=>{
        checkErr(res,erro,resposta);
      })
      
    });
    
    app.put("/dono/:id",(req,res)=>{
      const atdono=req.body;
      con.query(`update dono set ? where id_cliente=${req.params.id}`,atdono,(erro,resposta)=>{
    checkErr(res,erro,resposta);
      })
    })
    
    app.delete("/dono/:id",(req,res)=>{

    const deletar=`delete from dono where id_cliente = ${req.params.id}`
    con.query(deletar,(erro,resposta)=>{
    checkErr(res,erro,resposta);
    
    })
    
    })
//* ============================================================================================================================

//* ==================================================== Thais(Tabela funcionário) =============================================

app.get("/funcionario/", (req, res) => {
    const selecao = "SELECT * FROM funcionario";
    con.query(selecao, (erro, resposta) => {
        checkErr(res, erro, resposta);
    });
});

app.post("/funcionario/", (req, res) => {
    const novoFuncionario = req.body;
    const inserir = "INSERT INTO funcionario(nome, cpf, salario, funcao) VALUES(?, ?, ?, ?);"
    con.query(inserir, [novoFuncionario.nome, novoFuncionario.cpf, novoFuncionario.salario, novoFuncionario.funcao], (erro, resposta) => {
        checkErr(res, erro, resposta)
    })
});

app.put("/funcionario/:id/", (req, res) => {
    const id = req.params.id;
    const dadosFuncionario = req.body;
    const atualiza = "UPDATE funcionario SET ? WHERE id_funcionario = ?"
    con.query(atualiza, [dadosFuncionario, id], (erro, resposta) => {
        checkErr(res, erro, resposta)
    });
});

app.delete("/funcionario/:id/", (req, res) => {
    const id = req.params.id;
    const deleta = "DELETE FROM funcionario WHERE id_funcionario = ?";
    con.query(deleta, [id], (erro, resposta) => {
        checkErr(res, erro, resposta);
    })
})

//* ========================================================================================================

 //* =================================== Campari (Tabela Atendimento) =====================================
 app.get("/atendimento/", (req, res) =>{
    con.query("select * from atendimento", (erro, resposta)=>{
        checkErr(res, erro, resposta);
    });
 });

 app.post("/atendimento", (req, res) =>{
    console.log("POST from " + req.ip);
    const atendimento = req.body;
    
    con.query("insert into atendimento set ?", atendimento, (erro, resp)=>{
        checkErr(res, erro, resp);
    });
 });

 app.put("/atendimento/:id", (req, res) => {
    console.log("PUT from " + req.ip);
    const id  = req.params.id;
    const body = req.body;

    con.query("update atendimento set ? where id_atendimento = " + id, body, (erro, resp) =>{
        checkErr(res, erro, resp)
    });
 });

 app.delete("/atendimento/:id", (req, res)=>{
    console.log("DELETE from " + req.ip);
    con.query(`delete from atendimento where id_atendimento = ${req.params.id} `, (erro, resp) =>{
        checkErr(res, erro, resp);
    });
 });
//*