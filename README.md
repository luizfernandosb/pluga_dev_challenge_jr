# Desafio da Pluga - Dev jr

Nós da Pluga nos orgulhamos do nosso time e queremos sempre boas pessoas que acrescentem, por isso gostamos de testar as pessoas que se candidatam.

Esse é um desafio que queremos que você supere:

1. Desenvolver uma tela com uma listagem de cards representando os apps integrados na Pluga e uma barra de busca (ref: wireframe1.png).

2. Use os dados retornados em [pluga.co/ferramentas_search.json](https://pluga.co/ferramentas_search.json) para construir essa listagem, a paginação pode ser de 12 em 12 apps;

3. Ao clicar nos cards, deve abrir um modal referente ao app selecionado (ref: wireframe2.png) com um link para acessar a página do app no site da Pluga, esse link vem junto das outras informações em JSON;

4. Esse modal deve conter uma seção "Últimas ferramentas visualizadas", que mostre as 3 últimas ferramentas visualizadas, independente de quantos cards de apps sejam acessados.

Iremos julgar pelos critérios: legibilidade do código, separação de responsabilidades e expressividade dos nomes. Pense como o usuário, atente-se para os estados vazios, o próprio site da Pluga pode te inspirar.

Requisitos técnicos:

- O desafio deve ser feito utilizando [React](https://reactjs.org);

- Escrever testes será um diferencial;

## O que foi feito

- [x] Tela com listagem de cards e barra de busca  
  - Implementado componente de listagem e componente de busca. A busca filtra o array carregado de pluga.co/ferramentas_search.json (debounce simples para UX).

- [x] Uso dos dados de pluga.co/ferramentas_search.json  
  - Os dados são carregados via fetch/axios no carregamento da página e usados para construir os cards.

- [x] Paginação de 12 em 12 apps  
  - Paginação implementada (componente de paginação controlando página atual e slice dos itens).

- [x] Modal ao clicar no card com link para a página do app  
  - Ao abrir o modal mostram-se as informações do app e um link que abre a página do app no site da Pluga em nova aba.

- [x] Seção "Últimas ferramentas visualizadas" no modal (últimas 3)  
  - As últimas 3 ferramentas visualizadas são armazenadas localmente (localStorage) e exibidas no modal, mantendo ordem de visualização e evitando duplicatas.

- [x] Tratamento de estados vazios e erros  
  - Estados de loading, erro na requisição e lista vazia foram tratados com mensagens/UX apropriadas.

- [x] Feito com React  
  - Projeto implementado em React (estrutura de componentes, hooks para estado/comportamento, separação de responsabilidades).

- [x] Testes automatizados (diferencial)  