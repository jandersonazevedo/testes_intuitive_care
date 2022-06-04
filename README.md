# Testes - IntuitiveCare
Sistema que permite a realização de um CRUD apartir de um arquivo CSV. 

Ambiente de desenvolvimento
----------
- NPM v6.14.15
- XAMPP v3.3.0
- Node.js v14.18.1
- Vue 3

Instalação
----------

Para instalar o projeto siga os seguintes passos:

1. Clone este repositorio com `git clone https://github.com/jandersonazevedo/testes_intuitive_care.git`
2. Instale as bibliotecas necessárias entrando nas pastas `\client` e `\server` via termina e executando: 
`npm install`
3. Crie um banco de dados MySQL com o nome **testes_csv** e edite as informações referentes a conexão ao banco no arquivo `server\src\database\config_db.js`
4. Exporte o arquivo `\server\src\database\testes_csv.sql` para o banco de dados
5. Com o banco de dados configurado e executando, inicie o servidor entrando na pasta `\server` via terminal e executando: `npm run dev`
6. Execute o frontend entrando na pasta `\client` e executando `npm run serve`
7. Para finalizar, abra o navegador e acesse a url `http://localhost:8080/`
