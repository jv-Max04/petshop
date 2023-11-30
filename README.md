# <center>Petshop</center>

## Fizemos um banco de dados sobre um banco de dados fictício, e essa é uma interface web para ver e fazer alterações no mesmo.

### Integrantes:
- Lucas Ruiz <br>
- Gabriel Campari <br>
- João Victor Max. <br>
- Karen Arruda <br>
- Thais Gabriel

---

# <center>Tutorial

- Clone o repositório ou baixe o arquivo .zip, extraia para a área de trabalho e abra a pasta no vscode (tenha ***certeza*** de que seu vscode está aberto na pasta petshop apenas, e não na petshop-master/petshop, caso contrário, o redirect da main.html gera um erro).

- Aberto o VsCode, abra um novo terminal (ctrl + shift + ') e, tenha certeza que o caminho mostrado no terminal é C:\caminho\até\a\pasta\petshop ou C:\caminho\até\a\pasta\petshop-master.

- No termnal, digite <code>npm i</code>, para que o node leia o arquivo package-lock.json e baixe automáticamente as depêndencias (CORS, Express e MySQL2).

- Abra seu aplicativo de preferência para gerenciar o mysql, copie o código encontrado no arquivo script.sql e cole no aplicativo. Rode o script para que seja gerada uma base de dados com as informações necessárias.

- Após criado o banco de dados, abra o arquivo server.js e, na linha 7, altere as informações de conexão para as que condizam com o seu banco de dados.

- Agora, basta inciciar o servidor utilziando o comando <code>node server.js</code> e iniciar o arquivo main.html, utilizando o live server ou qualquer outra ferrameta de sua preferência!