// Perguntas do quiz

const perguntas = [

    {
        categoria: "CORALINE",

        pergunta: "O que Coraline usa para abrir a passagem para o outro mundo?",

        respostas: [
            "Uma chave pequena",
            "Uma moeda",
            "Um botão",
            "Uma boneca"
        ],

        correta: 0
    },

    {
        categoria: "ARCANE",

        pergunta: "Qual é o nome da irmã da Jinx?",

        respostas: [
            "Caitlyn",
            "Vi",
            "Mel",
            "Jayce"
        ],

        correta: 1
    },

    {
        categoria: "MATRIX",

        pergunta: "Quem oferece a Neo as duas pílulas?",

        respostas: [
            "Trinity",
            "Cypher",
            "Morpheus",
            "Smith"
        ],

        correta: 2
    },

    {
        categoria: "STRANGER THINGS",

        pergunta: "Como é chamada a dimensão alternativa de Stranger Things?",

        respostas: [
            "The Void",
            "The Upside Down",
            "Dark World",
            "Other Side"
        ],

        correta: 1
    },

    {
        categoria: "HARRY POTTER",

        pergunta: "Qual é o nome da escola de magia de Harry Potter?",

        respostas: [
            "Hogwarts",
            "Durmstrang",
            "Beauxbatons",
            "Ilvermorny"
        ],

        correta: 0
    },

    {
        categoria: "MARVEL",

        pergunta: "Qual personagem é conhecida como Feiticeira Escarlate?",

        respostas: [
            "Wanda Maximoff",
            "Natasha Romanoff",
            "Carol Danvers",
            "Gamora"
        ],

        correta: 0
    },

    {
        categoria: "WEDNESDAY",

        pergunta: "Qual é o nome do pai da Wednesday?",

        respostas: [
            "Pugsley",
            "Gomez",
            "Fester",
            "Morticia"
        ],

        correta: 1
    },

    {
        categoria: "THE LAST OF US",

        pergunta: "Quem acompanha Ellie durante a história?",

        respostas: [
            "Tommy",
            "Joel",
            "Bill",
            "Sam"
        ],

        correta: 1
    },

    {
        categoria: "BATMAN",

        pergunta: "Qual personagem foi interpretado por Heath Ledger?",

        respostas: [
            "Charada",
            "Duas-Caras",
            "Coringa",
            "Pinguim"
        ],

        correta: 2
    },

    {
        categoria: "STAR WARS",

        pergunta: "Qual é o verdadeiro nome de Darth Vader?",

        respostas: [
            "Luke Skywalker",
            "Han Solo",
            "Anakin Skywalker",
            "Obi-Wan"
        ],

        correta: 2
    }

];


// Variáveis

let perguntaAtual = 0;

let pontos = 0;

let acertos = 0;

let tempo = 20;

let intervalo;

let respondeu = false;


// Elementos da página

const inicio = document.getElementById("inicio");

const quiz = document.getElementById("quiz");

const resultado = document.getElementById("resultado");

const textoPergunta =
    document.getElementById("textoPergunta");

const respostas =
    document.getElementById("respostas");

const categoria =
    document.getElementById("categoria");

const pontosElemento =
    document.getElementById("pontos");

const tempoElemento =
    document.getElementById("tempo");

const numeroPergunta =
    document.getElementById("perguntaNumero");

const progresso =
    document.getElementById("progresso");

const proximo =
    document.getElementById("proximo");


// Começar

function iniciarQuiz() {

    perguntaAtual = 0;

    pontos = 0;

    acertos = 0;

    inicio.classList.add("escondido");

    quiz.classList.remove("escondido");

    mostrarPergunta();
}


// Mostrar pergunta

function mostrarPergunta() {

    respondeu = false;

    proximo.disabled = true;

    proximo.textContent = "Próxima";

    let pergunta = perguntas[perguntaAtual];

    textoPergunta.textContent = pergunta.pergunta;

    categoria.textContent = pergunta.categoria;

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    pontosElemento.textContent = pontos;


    // Atualiza a barra

    let porcentagem =
        (perguntaAtual / perguntas.length) * 100;

    progresso.style.width = porcentagem + "%";


    // Limpa respostas

    respostas.innerHTML = "";


    // Cria os botões

    pergunta.respostas.forEach((resposta, indice) => {

        let botao = document.createElement("button");

        botao.classList.add("resposta");

        botao.textContent = resposta;

        botao.onclick = function () {

            escolherResposta(indice);

        };

        respostas.appendChild(botao);

    });


    iniciarTempo();
}


// Tempo

function iniciarTempo() {

    clearInterval(intervalo);

    tempo = 20;

    tempoElemento.textContent = tempo;

    intervalo = setInterval(function () {

        tempo--;

        tempoElemento.textContent = tempo;

        if (tempo <= 0) {

            clearInterval(intervalo);

            escolherResposta(-1);

        }

    }, 1000);
}


// Escolher resposta

function escolherResposta(indice) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    clearInterval(intervalo);

    let pergunta = perguntas[perguntaAtual];

    let botoes =
        document.querySelectorAll(".resposta");


    // Desativa os botões

    botoes.forEach(function (botao) {

        botao.style.pointerEvents = "none";

    });


    // Mostra a correta

    botoes[pergunta.correta]
        .classList.add("correta");


    // Se acertou

    if (indice === pergunta.correta) {

        acertos++;

        pontos += 100;

        pontosElemento.textContent = pontos;

    }

    // Se errou

    else if (indice !== -1) {

        botoes[indice]
            .classList.add("errada");

    }


    proximo.disabled = false;


    // Última pergunta

    if (perguntaAtual === perguntas.length - 1) {

        proximo.textContent = "Ver resultado";

    }

}


// Próxima pergunta

function proximaPergunta() {

    if (!respondeu) {
        return;
    }

    perguntaAtual++;


    if (perguntaAtual >= perguntas.length) {

        mostrarResultado();

    } else {

        mostrarPergunta();

    }

}


// Resultado

function mostrarResultado() {

    clearInterval(intervalo);

    quiz.classList.add("escondido");

    resultado.classList.remove("escondido");

    document.getElementById("acertos")
        .textContent = acertos;

    document.getElementById("pontuacaoFinal")
        .textContent = pontos;

}


// Jogar novamente

function reiniciar() {

    resultado.classList.add("escondido");

    inicio.classList.remove("escondido");

}