<html>
<head>
</head>
<body>
<h1 align="center"> Desafio Backend</h1>

<h2 > Instruções para uso</h2>
<p >Antes de começar a utilizar a aplicação é necessario que crie um banco de dados Postgre e modifique o arquivo ./scr/db/dbconfig.js com as informações para conexão com o banco de dados.</p>
<p>Além disso é preciso dar o comando:<br>
<pre><code>npm install</code></pre>Para instalar as dependencias da aplicação, após isso é possivel rodar a aplicação com o comando<pre><code>npm run dev</code></pre></p>

<h1 align="center"> Atividade v1</h1>

<h2>1</h2>
<p>. GET /v1/<br>
Retorna uma mensagem padrão com status 200 OK.
Resposta da Aplicação:
<pre><code>
{
“message”: “Bem vindo a API GeoPoly!”
}
</code></pre></p>

<h2>2</h2>
<p> POST /v1/auth<br>
Simula uma rota de autenticação (não precisa implementar uma autenticação de verdade). Retorna umas
das possíveis respostas dependendo do corpo da requisição.
Caso a resposta esteja correta ira retornar o seguinte:
<pre><code>
{
    message: "Autenticado com sucesso"
}
</code></pre>
Caso o usuario ou senha esteja errado ira retornar o seguinte:
<pre><code>
{
    message: "Falha ao autenticar" 
}
</code></pre>
Caso esteja faltando a senha ou usuario ira retornar o seguinte:
<pre><code>
{
    message: "Formato de Requisição invalido"
}
</code></pre>
</p>
<h1 align="center"> Atividade v2</h1>
<h2>3</h2>
<p> 
GET /v2/places<br>
Retorna uma lista de lugares com informações geográficas em formato JSON. Tais informações estão no codigo e não em um banco de dados.<br>
Exemplo de resposta (lugares em São José dos Campos - SP):
<pre><code>
{  
    "id": 1,
    "name": "Parque da Cidade",
    "latitude": -23.221112,
    "longitude": -45.899678
}
{
    "id": 2,
    "name": "Praça Ulisses Guimarães",
    "latitude": -23.180038,
    "longitude": -45.884357
},

</code></pre>
</p>
<h2>4</h2>
<p> 
GET /v2/places/:id<br>
Retorna um lugar específico da lista acima pelo seu ID em formato JSON.<br>Exemplo de resposta caso o id inserido seja 1:
<pre><code>
{  
    "id": 1,
    "name": "Parque da Cidade",
    "latitude": -23.221112,
    "longitude": -45.899678
}
</code></pre>
</p>
<h1 align="center"> Atividade v3</h1>
<h2>5</h2>
<p> 
POST /v3/places<br>
Cria um novo lugar com informações geográficas a partir de um objeto JSON.
Exemplo de requisição:
<pre><code>
{
    "name": "Lago do Vale",
    "latitude": -23.200443,
    "longitude": -45.896235
}
</code></pre>
Após isso o usuario recebera a resposta:
<pre><code>
{
    message: 'Criado com sucesso' 
}
</code></pre>
Caso tenha inserido algo errado ou esquecido de inserir recebera a seguinte mensangem:
<pre><code>
{
    message: 'Erro ao criar local'
}
</code></pre>
</p>
<h2>6.</h2>
<p> 
PUT /places/:id<br>
Atualiza um lugar específico pelo seu ID a partir de um objeto JSON com as informações a serem
atualizadas.
Exemplo de requisição:
<pre><code>
{
"name": "Parque da Cidade - São José dos Campos",
"latitude": -23.221112,
"longitude": -45.899678
}
</code></pre>
O usuario recebera a seguinte mensagem:
<pre><code>
{
    message: 'Editado com sucesso' 
}
</code></pre>
Caso tenha inserido algo errado ou esquecido de inserir recebera a seguinte mensangem:
<pre><code>
{
    message: 'Erro ao editar local'
}
</code></pre>
</p>
<h2>7</h2>
<p>
DELETE /places/:id<br>
Deleta um lugar específico pelo seu ID.
Exemplo de resposta:
<pre><code>
{
"message": "removido com sucesso!"
}
</code></pre>
Caso o ID não exista ou algo foi feito de errado aparecera a seguinte mensagem:
<pre><code>
{
"message": "Erro ao remover o local"
}
</code></pre>
</p>
<h1 align="center"> Atividade v4</h1>
<h2>8</h2>
<p>
GET /v4/places/:id1/distanceto/:id2<br>
Retorna a distância entre 2 pontos.
Exemplo de resposta:
<pre><code>
{
“distance”: 1300.00
}
</code></pre>

<h2>Quinta parte está no seguinte link:</h2>
<h2><a href="https://github.com/gusta7597/Desafio-Backend-v5">aqui</h2>