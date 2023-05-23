<html>
<head>
</head>
<body>
<h1 align="center">Desafio Backend</h1>

# Instruções para uso
Antes de começar a utilizar a aplicação, é necessário criar um banco de dados Postgre e modificar o arquivo `./src/db/dbconfig.js` com as informações para conexão com o banco de dados.

Além disso, é preciso executar o seguinte comando para instalar as dependências da aplicação:
```bash
npm install
```
Após isso é possivel rodar a aplicação com o comando
```bash
npm run dev
```
# Atividades

## 1. GET /v1/
Retorna uma mensagem padrão com status 200 OK.

### Resposta da Aplicação:
```json
{
  "message": "Bem-vindo à API GeoPoly!"
}
```

## 2. POST /v1/auth
Simula uma rota de autenticação (não precisa implementar uma autenticação de verdade). Retorna umas
das possíveis respostas dependendo do corpo da requisição.
Caso a resposta esteja correta ira retornar o seguinte:
```json
{
    "message": "Autenticado com sucesso"
}
```
Caso o usuario ou senha esteja errado ira retornar o seguinte:
```json
{
    "message": "Falha ao autenticar" 
}
```
Caso esteja faltando a senha ou usuario ira retornar o seguinte:
```json
{
    "message": "Formato de Requisição invalido"
}
```

## 3. GET /v2/places
Retorna uma lista de lugares com informações geográficas em formato JSON. Tais informações estão no codigo e não em um banco de dados.<br>
Exemplo de resposta (lugares em São José dos Campos - SP):
```json
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
```

## 4. GET /v2/places/:id
Retorna um lugar específico da lista acima pelo seu ID em formato JSON.<br>Exemplo de resposta caso o id inserido seja 1:
```json
{  
    "id": 1,
    "name": "Parque da Cidade",
    "latitude": -23.221112,
    "longitude": -45.899678
}
```

## 5. POST /v3/places
Cria um novo lugar com informações geográficas a partir de um objeto JSON.
Exemplo de requisição:
```json
{
    "name": "Lago do Vale",
    "latitude": -23.200443,
    "longitude": -45.896235
}
```
Após isso o usuario recebera a resposta:
```json
{
    "message": "Criado com sucesso" 
}
```
Caso tenha inserido algo errado ou esquecido de inserir recebera a seguinte mensangem:
```json
{
   "message": "Erro ao criar local"
}
```

## 6. PUT /places/:id
Atualiza um lugar específico pelo seu ID a partir de um objeto JSON com as informações a serem
atualizadas.
Exemplo de requisição:
```json
{
"name": "Parque da Cidade - São José dos Campos",
"latitude": -23.221112,
"longitude": -45.899678
}
```
O usuario recebera a seguinte mensagem:
```json
{
    "message": "Editado com sucesso"
}
```
Caso tenha inserido algo errado ou esquecido de inserir recebera a seguinte mensangem:
```json
{
    "message": "Erro ao editar local"
}
```

## 7. DELETE /places/:id
Deleta um lugar específico pelo seu ID.
Exemplo de resposta:
```json
{
"message": "removido com sucesso!"
}
```
Caso o ID não exista ou algo foi feito de errado aparecera a seguinte mensagem:
```json
{
"message": "Erro ao remover o local"
}
```

## 8. GET /v4/places/:id1/distanceto/:id2
Retorna a distância entre 2 pontos.
Exemplo de resposta:
```json
{
    "distance": 1300.00
}
```

<h2>Quinta parte está no seguinte link:</h2>
<h2><a href="https://github.com/gusta7597/Desafio-Backend-v5">aqui</h2>