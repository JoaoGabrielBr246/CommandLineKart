// Array de jogadores com suas características
const players = [
    {
        NOME: "Mario",           // Nome do personagem
        VELOCIDADE: 4,          // Atributo de velocidade
        MANOBRABILIDADE: 3,     // Atributo de manobrabilidade
        PODER: 3,               // Atributo de poder
        PONTOS: 0               // Pontos do jogador, inicializados em 0
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0
    }
];

// Função para rolar o dado
async function rollDice() {
    // Retorna um número aleatório entre 1 e 6 (simulando um dado)
    return Math.floor(Math.random() * 6) + 1;
}

// Função para determinar o tipo de bloco (RETA, CURVA, CONFRONTO)
async function getRandomBlock() {
    let random = Math.random(); // Gera um número aleatório entre 0 e 1
    let result;

    // Usa uma estrutura de controle para determinar o tipo de bloco
    switch (true) {
        case random < 0.33:
            result = "RETA"; // 33% de chance de ser RETA
            break;
        case random < 0.66:
            result = "CURVA"; // 33% de chance de ser CURVA
            break;
        default:
            result = "CONFRONTO"; // 34% de chance de ser CONFRONTO
    }

    return result; // Retorna o tipo de bloco
}

// Função para logar o resultado do dado
async function logRollResult(characterName, block, diceResult, attribute) {
    // Loga o resultado do dado e o cálculo do resultado final
    console.log(`${characterName} 🎲 rolou um dado de ${block}: ${diceResult}`);
    console.log(`${characterName} 🎲 resultado final: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// Função principal da corrida
async function playRaceEngine(character1, character2) {
    // Loop para 5 rodadas de corrida
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        let block = await getRandomBlock(); // Obtém o tipo de bloco aleatório
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice(); // Rola o dado para o personagem 1
        let diceResult2 = await rollDice(); // Rola o dado para o personagem 2

        let totalTesteSkilll1 = 0; // Total do personagem 1
        let totalTesteSkilll2 = 0; // Total do personagem 2

        // Verifica o tipo de bloco e calcula o resultado
        if (block === "RETA") {
            totalTesteSkilll1 = diceResult1 + character1.VELOCIDADE; // Total para personagem 1
            totalTesteSkilll2 = diceResult2 + character2.VELOCIDADE; // Total para personagem 2

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        } else if (block === "CURVA") {
            totalTesteSkilll1 = diceResult1 + character1.MANOBRABILIDADE; // Total para personagem 1
            totalTesteSkilll2 = diceResult2 + character2.MANOBRABILIDADE; // Total para personagem 2

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        } else {
            // Caso de confronto
            console.log(`🥊 ${character1.NOME} confrontou ${character2.NOME} 🥊`);
            let powerResult1 = diceResult1 + character1.PODER; // Total para personagem 1
            let powerResult2 = diceResult2 + character2.PODER; // Total para personagem 2

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            // Determina quem venceu o confronto
            if (powerResult1 > powerResult2) {
                console.log(`${character1.NOME} venceu o confronto!`);
                if (character2.PONTOS > 0) {
                    console.log(`${character2.NOME} perdeu 1 ponto 🐢`);
                    character2.PONTOS--; // Reduz um ponto para o personagem 2
                }
            } else if (powerResult2 > powerResult1) {
                console.log(`${character2.NOME} venceu o confronto!`);
                if (character1.PONTOS > 0) {
                    console.log(`${character1.NOME} perdeu 1 ponto 🐢`);
                    character1.PONTOS--; // Reduz um ponto para o personagem 1
                }
            } else {
                console.log("Confronto empatado. Nenhum ponto foi perdido.");
            }
        }

        // Verifica quem ganhou o bloco de corrida (RETA ou CURVA)
        if (totalTesteSkilll1 > totalTesteSkilll2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++; // Incrementa ponto para o personagem 1
        } else if (totalTesteSkilll1 < totalTesteSkilll2) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++; // Incrementa ponto para o personagem 2
        }
        console.log("--------------------------------------");
    }
}

// Função para declarar o vencedor da corrida
async function declareWinner(character1, character2) {
    if (character1.PONTOS > character2.PONTOS) {
        console.log(`🎉 ${character1.NOME} venceu a corrida com ${character1.PONTOS} pontos!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🎉 ${character2.NOME} venceu a corrida com ${character2.PONTOS} pontos!`);
    } else {
        console.log("A corrida terminou empatada!");
    }
}

// Função para sortear dois personagens aleatórios para a corrida
function sortearDupla() {
    let index1 = Math.floor(Math.random() * players.length); // Seleciona um índice aleatório
    let index2;

    // Garante que o segundo índice é diferente do primeiro
    do {
        index2 = Math.floor(Math.random() * players.length);
    } while (index1 === index2);

    return [players[index1], players[index2]]; // Retorna os dois jogadores selecionados
}

// Função principal
(async function main() {
    let [player1, player2] = sortearDupla(); // Sorteia dois personagens

    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2); // Inicia a corrida
    await declareWinner(player1, player2); // Declara o vencedor
})();


// Explicação dos Conceitos

//     Array de Jogadores:
//         Um array é usado para armazenar objetos, onde cada objeto representa um jogador com atributos 
//         que influenciam a corrida.

//     Funções async e await:
//         async: Usada para declarar que uma função é assíncrona, permitindo o uso de await 
//         dentro dela. Isso significa que a função pode conter operações que levam tempo para 
//         serem concluídas, como rolar dados ou buscar informações.
//         await: Pausa a execução da função assíncrona até que a Promise (resultado de uma operação assíncrona) 
//         seja resolvida. Isso facilita o gerenciamento de código assíncrono, tornando-o mais legível.

//     Rolagem de Dado:
//         A função rollDice simula a rolagem de um dado, retornando um número aleatório entre 1 e 6.

//     Tipos de Blocos:
//         A função getRandomBlock gera um bloco aleatório para a corrida (reta, curva ou confronto) 
//         com probabilidades definidas.

//     Logging dos Resultados:
//         A função logRollResult registra no console os resultados das jogadas e calcula o resultado final.

//     Engine da Corrida:
//         A função playRaceEngine controla o fluxo principal da corrida, gerenciando as rodadas e 
//         a lógica do jogo, incluindo a verificação de qual jogador venceu cada rodada.

//     Declaração do Vencedor:
//         A função declareWinner compara os pontos dos jogadores e imprime quem venceu a corrida.

//     Sorteio de Jogadores:
//         A função sortearDupla seleciona aleatoriamente dois jogadores do array para competir 
//         na corrida, garantindo que sejam diferentes.

//     Função Principal:
//         A função main inicializa a corrida, chamando outras funções assíncronas e começando o jogo.