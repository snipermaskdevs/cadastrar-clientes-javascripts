const readline = require('readline');
const fs = require('fs');

// Criação da interface de leitura
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let clientes = [];

// Função para carregar os clientes do arquivo
function carregarClientes() {
    if (fs.existsSync('clientes.json')) {
        const data = fs.readFileSync('clientes.json', 'utf8');
        try {
            clientes = JSON.parse(data);
        } catch (error) {
            console.log("Erro ao carregar os dados. Iniciando com uma lista vazia.");
            clientes = [];
        }
    } else {
        clientes = [];
        fs.writeFileSync('clientes.json', JSON.stringify(clientes));
        console.log("Arquivo clientes.json criado.");
    }
}

// Função para salvar os clientes no arquivo
function salvarClientes() {
    fs.writeFileSync('clientes.json', JSON.stringify(clientes, null, 2));
    console.log("✔️ Dados salvos com sucesso!");
}

// Função para exibir o menu
function mostrarMenu() {
    console.log("\nEscolha uma das opções abaixo:");
    console.log("1. Cadastrar um novo cliente");
    console.log("2. Editar dados de um cliente");
    console.log("3. Excluir um cliente");
    console.log("4. Mostrar lista de clientes cadastrados");
    console.log("5. Exibir créditos");
    console.log("6. Sair do sistema");
}

// Função para mostrar a mensagem de boas-vindas
function mostrarBoasVindas() {
    console.log("\nBem-vindo ao sistema de cadastro de clientes.");
    console.log("Vamos começar a registrar um novo cliente!\n");
}

// Função para validar CPF (apenas uma validação simples para formato)
function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

// Função para validar Email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Função para cadastrar cliente
function cadastrarCliente() {
    console.log("\n--- Cadastro de Cliente ---");

    rl.question("Digite o nome completo do cliente: ", (nome) => {
        rl.question("Digite a idade do cliente: ", (idade) => {
            rl.question("Digite o email do cliente: ", (email) => {
                if (!validarEmail(email)) {
                    console.log("❌ E-mail inválido! Tente novamente.");
                    return cadastrarCliente(); // Chama novamente o cadastro
                }

                rl.question("Digite o CPF do cliente: ", (cpf) => {
                    if (!validarCPF(cpf)) {
                        console.log("❌ CPF inválido! Tente novamente.");
                        return cadastrarCliente(); // Chama novamente o cadastro
                    }

                    rl.question("Digite o endereço completo do cliente: ", (endereco) => {
                        rl.question("Digite a cidade onde o cliente reside: ", (cidade) => {
                            rl.question("Digite o estado do cliente (ex: SP, RJ): ", (estado) => {
                                rl.question("Digite o bairro do cliente: ", (bairro) => {
                                    rl.question("Digite o código postal (CEP) do cliente: ", (codigoPostal) => {
                                        const cliente = { nome, idade, email, cpf, endereco, cidade, estado, bairro, codigoPostal };
                                        clientes.push(cliente);
                                        salvarClientes();
                                        console.log(`✔️ Cliente ${nome} cadastrado com sucesso!`);
                                        mostrarMenu();
                                        selecionarOpcao();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Função para buscar cliente por nome
function buscarClientePorNome(nome) {
    return clientes.filter(cliente => cliente.nome.toLowerCase().includes(nome.toLowerCase()));
}

// Função para editar cliente
function editarCliente() {
    rl.question("Digite o nome do cliente que deseja editar: ", (nome) => {
        const clientesEncontrados = buscarClientePorNome(nome);

        if (clientesEncontrados.length === 0) {
            console.log("❌ Nenhum cliente encontrado com esse nome.");
            mostrarMenu();
            selecionarOpcao();
        } else {
            console.log("\n--- Clientes encontrados ---");
            clientesEncontrados.forEach((cliente, index) => {
                console.log(`${index + 1}. Nome: ${cliente.nome}, CPF: ${cliente.cpf}, Email: ${cliente.email}`);
            });

            rl.question("Digite o número do cliente que deseja editar: ", (numero) => {
                const clienteSelecionado = clientesEncontrados[parseInt(numero) - 1];
                const index = clientes.indexOf(clienteSelecionado);

                rl.question("Digite o novo nome do cliente: ", (nome) => {
                    rl.question("Digite a nova idade do cliente: ", (idade) => {
                        rl.question("Digite o novo email do cliente: ", (email) => {
                            if (!validarEmail(email)) {
                                console.log("❌ E-mail inválido! Tente novamente.");
                                return editarCliente(); // Tenta editar novamente
                            }

                            rl.question("Digite o novo CPF do cliente: ", (cpf) => {
                                if (!validarCPF(cpf)) {
                                    console.log("❌ CPF inválido! Tente novamente.");
                                    return editarCliente(); // Tenta editar novamente
                                }

                                rl.question("Digite o novo endereço do cliente: ", (endereco) => {
                                    rl.question("Digite a nova cidade do cliente: ", (cidade) => {
                                        rl.question("Digite o novo estado do cliente: ", (estado) => {
                                            rl.question("Digite o novo bairro do cliente: ", (bairro) => {
                                                rl.question("Digite o novo código postal (CEP) do cliente: ", (codigoPostal) => {
                                                    clientes[index] = { nome, idade, email, cpf, endereco, cidade, estado, bairro, codigoPostal };
                                                    salvarClientes();
                                                    console.log("✔️ Cliente editado com sucesso!");
                                                    mostrarMenu();
                                                    selecionarOpcao();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
}

// Função para excluir cliente
function excluirCliente() {
    rl.question("Digite o nome do cliente que deseja excluir: ", (nome) => {
        const clientesEncontrados = buscarClientePorNome(nome);

        if (clientesEncontrados.length === 0) {
            console.log("❌ Nenhum cliente encontrado com esse nome.");
            mostrarMenu();
            selecionarOpcao();
        } else {
            console.log("\n--- Clientes encontrados ---");
            clientesEncontrados.forEach((cliente, index) => {
                console.log(`${index + 1}. Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
            });

            rl.question("Digite o número do cliente que deseja excluir: ", (numero) => {
                const clienteSelecionado = clientesEncontrados[parseInt(numero) - 1];
                const index = clientes.indexOf(clienteSelecionado);
                clientes.splice(index, 1);
                salvarClientes();
                console.log("✔️ Cliente excluído com sucesso!");
                mostrarMenu();
                selecionarOpcao();
            });
        }
    });
}

// Função para mostrar a lista de clientes
function mostrarListaClientes() {
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
    } else {
        console.log("Lista de Clientes:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1}. Nome: ${cliente.nome}, Idade: ${cliente.idade}, Email: ${cliente.email}, CPF: ${cliente.cpf}, Endereço: ${cliente.endereco}, Cidade: ${cliente.cidade}, Estado: ${cliente.estado}, Bairro: ${cliente.bairro}, Código Postal: ${cliente.codigoPostal}`);
        });
    }
}

// Função para selecionar a opção do menu
function selecionarOpcao() {
    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarCliente();
                break;
            case '2':
                editarCliente();
                break;
            case '3':
                excluirCliente();
                break;
            case '4':
                mostrarListaClientes();
                mostrarMenu();
                selecionarOpcao();
                break;
            case '5':
                mostrarCreditos(); // Exibe os créditos
                mostrarMenu();
                selecionarOpcao();
                break;
            case '6':
                rl.close();
                console.log("Saindo do sistema...");
                break;
            default:
                console.log("❌ Opção inválida! Tente novamente.");
                mostrarMenu();
                selecionarOpcao();
        }
    });
}

// Função para exibir créditos
function mostrarCreditos() {
    console.log("\n--- Créditos ---");
    console.log("Desenvolvido por: snipermaskdev");
    console.log("Este sistema permite o cadastro, edição, exclusão e visualização de clientes.");
    console.log("Os dados são armazenados em um arquivo JSON para persistência.");
    console.log("Obrigado por utilizar o sistema!");
}

// Início do programa
carregarClientes();
mostrarBoasVindas();
mostrarMenu();
selecionarOpcao();
