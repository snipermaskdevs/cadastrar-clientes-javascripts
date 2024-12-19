# Sistema de Cadastro de Clientes

Este é um sistema simples desenvolvido com Node.js para cadastro, edição, exclusão e exibição de clientes. O sistema armazena os dados dos clientes em um arquivo JSON (`clientes.json`), garantindo persistência das informações entre as execuções.

## Funcionalidades

- **Cadastrar Cliente**: Permite cadastrar um novo cliente, informando as seguintes informações:
  - Nome
  - Idade
  - Email
  - Profissão
  - CPF
  - Endereço
  - Cidade
  - Estado
  - Bairro
  - Código Postal

- **Editar Cliente**: Permite editar os dados de um cliente já cadastrado, alterando qualquer uma das informações mencionadas acima.

- **Excluir Cliente**: Permite excluir um cliente do sistema, removendo suas informações do arquivo.

- **Mostrar Lista de Clientes**: Exibe todos os clientes cadastrados com suas informações completas.

- **Persistência de Dados**: Todos os dados dos clientes são armazenados de forma permanente em um arquivo `clientes.json`. Caso o arquivo não exista, ele será criado automaticamente na primeira execução do sistema, garantindo que as informações não sejam perdidas ao fechar o programa.

- **Exibir Créditos**: Exibe informações sobre os desenvolvedores e a funcionalidade do sistema quando o usuário seleciona a opção correspondente no menu.

## Menu
Escolha uma opção:
1. Cadastrar Cliente
2. Editar Cliente
3. Excluir Cliente
4. Mostrar Lista de Clientes
5. Exibir Créditos
6. Sair

## Requisitos

- **Node.js**: O sistema requer a instalação do Node.js. Se você ainda não tem o Node.js instalado, pode baixá-lo [aqui](https://nodejs.org/).

- **Editor de Código**: Recomendamos o uso de um editor como o [Visual Studio Code](https://code.visualstudio.com/) para facilitar o desenvolvimento e manutenção do código.

## Como Usar

### 1. Clonar o Repositório

Clone o repositório ou baixe os arquivos diretamente:

```bash
git clone https://github.com/snipermaskdevs/cadastrar-clientes-javascripts.git
```

### 2. Rodar o Sistema

Para iniciar o sistema, execute o seguinte comando:

```bash
node cadastro-clientes.js
```

