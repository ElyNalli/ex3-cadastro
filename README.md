# ex3-cadastro# EX3 - Módulo de Cadastro (CRUD de Clientes)
Fatec Americana - Prof. José William Pinto Gomes

## Tecnologias
Node.js, Express, EJS, SQLite (better-sqlite3), Bootstrap 5.
Arquitetura em camadas (MVC).

## Como executar
1. Instale o Node.js (versão LTS).
2. Clone o repositório e entre na pasta.
3. Instale as dependências: `npm install`
4. Inicie: `npm start`
5. Acesse http://localhost:3000

## Funcionalidades
- Incluir, listar, alterar e excluir (com confirmação antes de excluir)
- Pesquisa por nome, e-mail ou CPF e paginação (5 por página)
- Validação no front-end (campos obrigatórios, e-mail, CPF, CEP) e no back-end
- Consultas parametrizadas (prepared statements) contra SQL Injection
- Mensagens de sucesso e de erro

## Uso de IA
Utilizei o Claude como ferramenta de apoio durante o desenvolvimento, principalmente para entender a estrutura dos códigos, organizar os arquivos e separar as responsabilidades de cada parte do sistema. Também assisti a vídeos no YouTube para compreender melhor o contexto e as tecnologias utilizadas.

Com o auxílio da ferramenta, fui aprendendo passo a passo como desenvolver algumas funcionalidades, esclarecendo dúvidas e adaptando as sugestões ao projeto. Também reaproveitei partes dos códigos sugeridos, realizando as alterações necessárias para atender aos requisitos.

Os principais pontos em que tive apoio foram:

Arquitetura MVC: estruturação da aplicação em camadas, utilizando Express e EJS.
Banco de dados: elaboração de scripts SQL, utilização de consultas parametrizadas, implementação de pesquisa e paginação.
Validação de dados: validação de CPF, CEP e e-mail tanto no front-end quanto no back-end.

Durante o processo, li, testei e adaptei os códigos utilizados. Atualmente, consigo explicar seu funcionamento e compreender a lógica aplicada nas funcionalidades desenvolvidas.
