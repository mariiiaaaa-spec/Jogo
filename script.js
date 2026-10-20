
const perguntas = [
    {
        pergunta: "Qual número completa a sequência: 2, 4, 6, 8, ...?",
        opcoes: ["9", "10", "12", "14"],
        correta: 1,
        explicacao: "A sequência aumenta de 2 em 2. Depois do 8 vem o 10."
    },
    {
        pergunta: "Se todos os gatos são animais e Mimi é um gato, então Mimi é...",
        opcoes: [
            "Uma planta",
            "Um animal",
            "Um objeto",
            "Não é possível saber"
        ],
        correta: 1,
        explicacao: "Se todo gato é animal e Mimi é um gato, Mimi também é um animal."
    },
    {
        pergunta: "Você tem 3 maçãs e ganha mais 2. Quantas maçãs tem agora?",
        opcoes: ["4", "5", "6", "8"],
        correta: 1,
        explicacao: "Basta somar 3 + 2 = 5."
    },
    {
        pergunta: "Qual item não combina com os outros?",
        opcoes: ["Triângulo", "Quadrado", "Círculo", "Cenoura"],
        correta: 3,
        explicacao: "Triângulo, quadrado e círculo são formas geométricas."
    },
    {
        pergunta: "Ana chegou antes de Bruno. Bruno chegou antes de Caio. Quem chegou por último?",
        opcoes: ["Ana", "Bruno", "Caio", "Não dá para saber"],
        correta: 2,
        explicacao: "A ordem é Ana, Bruno e Caio. Caio chegou por último."
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

const elementoPergunta = document.getElementById("pergunta");
const elementoOpcoes = document.getElementById("opcoes");
const elementoPontuacao = document.getElementById("pontuacao");
const elementoNumero = document.getElementById("numeroPergunta");
const elementoTotal = document.getElementById("totalPerguntas");
const elementoProgresso = document.getElementById("progresso");
const elementoFeedback = document.getElementById("feedback");
const botaoContinuar = document.getElementById("botaoContinuar");

elementoTotal.textContent = perguntas.length;

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indiceAtual];

    elementoPergunta.textContent = atual.pergunta;
    elementoNumero.textContent = indiceAtual + 1;

    elementoProgresso.style.width =
        `${(indiceAtual / perguntas.length) * 100}%`;

    elementoFeedback.textContent =
        "Escolha uma resposta para continuar.";

    elementoFeedback.className = "feedback";
    elementoOpcoes.innerHTML = "";

    botaoContinuar.disabled = true;
    botaoContinuar.textContent =
        indiceAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    atual.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.className = "option-button";
        botao.textContent = opcao;

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        elementoOpcoes.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indiceAtual];
    const botoes = elementoOpcoes.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indiceEscolhido === atual.correta) {
        pontuacao += 10;

        elementoPontuacao.textContent = pontuacao;

        botaoEscolhido.classList.add("correct");

        elementoFeedback.textContent =
            `Correto! ${atual.explicacao}`;

        elementoFeedback.classList.add("correct-text");
    } else {
        botaoEscolhido.classList.add("wrong");

        botoes[atual.correta].classList.add("correct");

        elementoFeedback.textContent =
            `Resposta incorreta. ${atual.explicacao}`;

        elementoFeedback.classList.add("wrong-text");
    }

    elementoProgresso.style.width =
        `${((indiceAtual + 1) / perguntas.length) * 100}%`;

    botaoContinuar.disabled = false;
}

function mostrarResultado() {
    const total = perguntas.length * 10;

    let mensagem = "Continue praticando para melhorar!";

    if (pontuacao === total) {
        mensagem = "Perfeito! Você acertou todas as perguntas!";
    } else if (pontuacao >= 30) {
        mensagem = "Muito bem! Você mandou bem no desafio.";
    }

    elementoPergunta.textContent = "Desafio concluído!";

    elementoOpcoes.innerHTML = `
        <div class="status-card">
            <span>Sua pontuação final</span>
            <strong>${pontuacao}/${total}</strong>
        </div>
    `;

    elementoFeedback.textContent = mensagem;
    elementoFeedback.className = "feedback correct-text";

    elementoNumero.textContent = perguntas.length;
    elementoProgresso.style.width = "100%";

    botaoContinuar.disabled = false;
    botaoContinuar.textContent = "Jogar novamente";
}

function reiniciarJogo() {
    indiceAtual = 0;
    pontuacao = 0;

    elementoPontuacao.textContent = "0";

    mostrarPergunta();
}

botaoContinuar.addEventListener("click", () => {
    if (!respondeu) return;

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// Permite jogar novamente após o resultado final.
botaoContinuar.addEventListener("click", () => {
    if (botaoContinuar.textContent === "Jogar novamente") {
        reiniciarJogo();
    }
});

mostrarPergunta();
