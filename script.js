// Variáveis globais para o quiz
let currentQuiz = []; // Armazena o quiz atual
let currentQuestionIndex = 0; // Índice da pergunta atual
let totalPoints = 0; // Total de pontos do jogador
let startTime; // Armazena o tempo de início do quiz
// Banco de dados dos quizzes
const quizzes = {
    python: [  // Perguntas e respostas para o quiz 'python'
        ["Qual é o comando para imprimir uma mensagem em Python?", "A) print()", "B) echo()", "C) console.log()", "D) write()", "A"],
        ["Como se declara uma variável em Python?", "A) var x = 10", "B) int x = 10", "C) let x = 10", "D) x = 10", "D"],
        ["Qual é o operador para potência em Python?", "A) ^", "B) **", "C) *", "D) %", "B"],
        ["Como se cria uma função em Python?", "A) def func(){}", "B) function func(){}", "C) func(){}", "D) create func()", "A"],
        ["Qual é o tipo de dados usado para representar texto em Python?", "A) string", "B) char", "C) text", "D) str", "A"]
    ],
    javaScript: [  // Perguntas e respostas para o quiz 'javascript'
        ["Qual comando é usado para exibir uma mensagem no console em JavaScript?", "A) print()", "B) echo()", "C) alert()", "D) console.log()", "D"],
        ["Como se cria uma variável em JavaScript?", "A) var x = 10", "B) let x = 10", "C) const x = 10", "D) Todos os anteriores", "D"],
        ["Qual é o operador utilizado para comparar dois valores em JavaScript?", "A) =", "B) ===", "C) ==", "D) <>", "B"],
        ["Como você escreve um comentário em uma linha em JavaScript?", "A) // comentário", "B) # comentário", "C) <!-- comentário -->", "D) /* comentário */", "A"],
        ["O que é uma função anônima em JavaScript?", "A) Uma função sem nome", "B) Uma função que retorna um valor", "C) Uma função que só pode ser chamada uma vez", "D) Uma função com argumento obrigatório", "A"]
    ],
    css: [  // Perguntas e respostas para o quiz 'css'
        ["Como você altera a cor de fundo de uma página em CSS?", "A) background-color: #fff;", "B) color: #fff;", "C) background: #fff;", "D) all-of-the-above;", "A"],
        ["Qual propriedade CSS é usada para mudar o tipo da fonte?", "A) font-family", "B) text-font", "C) font-style", "D) font-type", "A"],
        ["O que faz a propriedade 'position: absolute' em CSS?", "A) Posiciona um elemento em relação ao seu primeiro elemento pai posicionado", "B) Posiciona um elemento no centro da tela", "C) Posiciona um elemento fixo na tela", "D) Posiciona um elemento de forma relativa", "A"],
        ["Como você faz o texto de um parágrafo aparecer em negrito em CSS?", "A) font-weight: bold;", "B) text-transform: bold;", "C) font-style: bold;", "D) text-weight: bold;", "A"],
        ["Como você adiciona uma borda a um elemento em CSS?", "A) border: 1px solid black;", "B) border-width: 1px;", "C) border-style: solid;", "D) all of the above", "A"]
    ],
    csharp: [
        ["Como declarar uma variável em C#?", "A) var x = 10;", "B) int x = 10;", "C) let x = 10;", "D) x = 10;", "B"],
        ["Como é chamado o método principal em um programa C#?", "A) start()", "B) main()", "C) Main()", "D) execute()", "C"],
        ["Qual namespace é usado frequentemente em programas C#?", "A) System", "B) Console", "C) CSharp", "D) Namespace", "A"],
        ["Como você escreve um comentário em C#?", "A) // comentário", "B) /* comentário */", "C) <!-- comentário -->", "D) # comentário", "A"],
        ["Como criar um objeto em C#?", "A) var obj = new Object();", "B) Object obj = new Object();", "C) obj = Object();", "D) object obj = create();", "B"]
    ],
    cpp: [
        ["Como declarar uma variável em C++?", "A) let x = 10;", "B) var x = 10;", "C) int x = 10;", "D) x = 10;", "C"],
        ["Qual é a extensão padrão de arquivos C++?", "A) .cs", "B) .cpp", "C) .c", "D) .h", "B"],
        ["Qual comando é usado para saída de texto no console em C++?", "A) printf()", "B) echo()", "C) System.out.println()", "D) cout <<", "D"],
        ["Como você escreve um comentário em C++?", "A) // comentário", "B) /* comentário */", "C) <!-- comentário -->", "D) # comentário", "A"],
        ["Qual biblioteca padrão é usada para operações básicas em C++?", "A) <stdio.h>", "B) <iostream>", "C) <conio.h>", "D) <stdlib.h>", "B"]
    ],
    java: [
        ["Qual é o método principal em Java?", "A) main()", "B) start()", "C) Main()", "D) main(String[] args)", "D"],
        ["Como declarar uma variável em Java?", "A) var x = 10;", "B) int x = 10;", "C) let x = 10;", "D) x = 10;", "B"],
        ["Como criar uma instância de uma classe em Java?", "A) Class obj = new Class();", "B) var obj = Class();", "C) Class obj = create(Class);", "D) Class obj = Class;", "A"],
        ["Como você escreve um comentário em Java?", "A) // comentário", "B) /* comentário */", "C) <!-- comentário -->", "D) Ambos A e B", "D"],
        ["Qual palavra-chave é usada para herança em Java?", "A) extends", "B) inherits", "C) implements", "D) super", "A"]
    ],
    html: [
        ["Qual tag é usada para criar um link em HTML?", "A) <a>", "B) <link>", "C) <href>", "D) <url>", "A"],
        ["Qual atributo é usado para especificar o destino de um link?", "A) href", "B) src", "C) link", "D) url", "A"],
        ["Como inserir uma imagem em uma página HTML?", "A) <img src='image.jpg'>", "B) <image src='image.jpg'>", "C) <picture src='image.jpg'>", "D) <img href='image.jpg'>", "A"],
        ["Qual é a estrutura correta de um documento HTML?", "A) <html><head><body></body></head></html>", "B) <html><body><head></head></body></html>", "C) <html><head></head><body></body></html>", "D) <head><body><html></html></body></head>", "C"],
        ["Como você adiciona um título na página HTML?", "A) <title>", "B) <head>", "C) <heading>", "D) <h1>", "A"]
    ],
    swift: [
        ["Como declarar uma variável em Swift?", "A) let x = 10", "B) var x = 10", "C) const x = 10", "D) int x = 10", "B"],
        ["Qual palavra-chave é usada para constantes em Swift?", "A) const", "B) let", "C) var", "D) static", "B"],
        ["Como você escreve uma função em Swift?", "A) func myFunction(){}", "B) function myFunction(){}", "C) def myFunction(){}", "D) myFunction() => {}", "A"],
        ["Como você verifica se um array está vazio em Swift?", "A) array.count == 0", "B) array.isEmpty", "C) array.size == 0", "D) array == nil", "B"],
        ["Qual é a estrutura de controle para loops em Swift?", "A) foreach", "B) for-in", "C) for-each", "D) while-for", "B"],
    ]

};
// Função para embaralhar as perguntas de um quiz
function shuffleQuestions(quiz) {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatório
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]]; // Troca de posição das perguntas
    }
    return quiz; // Retorna o quiz embaralhado
}

// Função para mudar para página de escolha de categoria
function startQuiz() {
    document.getElementById('menu').style.display = 'none'; // Esconde o menu inicial
    document.getElementById('category-menu').style.display = 'block'; // Exibe o menu de categorias
}

// Função para iniciar o quiz de uma categoria selecionada
function category(quizType) {
    // Define o quiz atual com base no tipo selecionado e embaralha as perguntas
    currentQuiz = shuffleQuestions(quizzes[quizType]);
    currentQuestionIndex = 0; // Reinicia o índice da pergunta
    totalPoints = 0; // Reinicia o total de pontos
    document.getElementById('category-menu').style.display = 'none'; // Esconde o menu de categorias
    document.getElementById('quiz').style.display = 'block'; // Exibe a área do quiz
    nextQuestion(); // Chama a função para exibir a próxima pergunta
}


// Função para exibir a próxima pergunta
function nextQuestion() {
    // Limpa a área de opções antes de exibir a próxima pergunta
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Verifica se ainda há perguntas a serem exibidas
    if (currentQuestionIndex < currentQuiz.length) {
        displayQuestion(currentQuiz[currentQuestionIndex]); // Exibe a pergunta
        startTime = new Date().getTime(); // Armazena o tempo de início
    } else {
        // Mostra mensagem de finalização do quiz
        alert(`Quiz finalizado! Pontuação total: ${totalPoints}`);
        document.getElementById('quiz').style.display = 'none'; // Esconde a área do quiz
        document.getElementById('menu').style.display = 'block'; // Exibe o menu novamente
    }
}

// Função para exibir uma pergunta
function displayQuestion(questionData) {
    // Exibe a pergunta na interface
    document.getElementById('question-text').innerText = questionData[0];
    const questionNumber = document.getElementById('question-number');
    questionNumber.innerText = `Pergunta ${currentQuestionIndex + 1} de ${currentQuiz.length}`; // Atualiza a contagem

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Cria botões para as opções de resposta
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.innerText = questionData[i];
        button.onclick = () => checkAnswer(questionData[5], questionData[i].charAt(0));
        optionsContainer.appendChild(button);
    }
}

// Função para verificar a resposta selecionada
function checkAnswer(correctAnswer, selectedAnswer) {
    const elapsedTime = (new Date().getTime() - startTime) / 1000; // Calcula o tempo decorrido
    let points = 0; // Inicializa a pontuação da resposta
    let resultMessage = ''; // Mensagem para exibir na página HTML

    // Recupera todos os botões das opções
    const buttons = document.getElementById('options-container').getElementsByTagName('button');

    for (let button of buttons) {
        const answerLetter = button.innerText.charAt(0); // Letra da opção

        if (answerLetter === correctAnswer) {
            // Adiciona a classe que destaca a resposta correta
            button.classList.add('correct');
        }

        if (answerLetter === selectedAnswer) {
            // Adiciona a classe para a resposta selecionada
            button.classList.add(answerLetter === correctAnswer ? 'correct' : 'incorrect');
        }

        // Desabilita todas as opções
        button.disabled = true;
    }

    if (selectedAnswer === correctAnswer) {
        // Calcula a pontuação com base no tempo de resposta
        points = elapsedTime <= 10 ? Math.round((10 - elapsedTime) / 10 * 10) : 1;
        resultMessage = 'Resposta correta!';
    } else {
        resultMessage = 'Resposta incorreta!';
    }

    // Exibe a mensagem de resultado
    const resultElement = document.createElement('p');
    resultElement.textContent = resultMessage;
    resultElement.className = selectedAnswer === correctAnswer ? 'correct-message' : 'incorrect-message';
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.appendChild(resultElement);

    // Atualiza a pontuação total
    totalPoints += points;
    document.getElementById('score').innerText = `Pontos: ${totalPoints}`;

    // Incrementa o índice da pergunta atual
    currentQuestionIndex++;

    // Exibe o botão "Próximo"
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo';
    nextButton.onclick = nextQuestion;
    nextButton.id = 'next-button';
    const nextButtonContainer = document.getElementById('next-button-container');
    nextButtonContainer.innerHTML = ''; // Limpa o contêiner
    nextButtonContainer.appendChild(nextButton);
}
let highScores = JSON.parse(localStorage.getItem('quizHighScores')) || {}; // Recupera o histórico do localStorage

// Função para exibir a tela de finalização do quiz
function finishQuiz() {
    document.getElementById('quiz').style.display = 'none'; // Esconde o quiz
    document.getElementById('final-screen').style.display = 'block'; // Exibe a tela final

    const finalCategory = currentQuiz === quizzes.python ? 'Python' :
        currentQuiz === quizzes.javaScript ? 'JavaScript' :
            currentQuiz === quizzes.css ? 'CSS' :
                currentQuiz === quizzes.cpp ? 'C++' :
                    currentQuiz === quizzes.csharp ? 'C#' :
                        currentQuiz === quizzes.java ? 'Java' :
                            currentQuiz === quizzes.html ? 'HTML' :
                                'Swift'; // Caso o quiz atual seja Swift

    // Atualiza o histórico de pontuações
    if (!highScores[finalCategory] || totalPoints > highScores[finalCategory]) {
        highScores[finalCategory] = totalPoints; // Atualiza o recorde
        localStorage.setItem('quizHighScores', JSON.stringify(highScores)); // Salva no localStorage
        document.getElementById('record-message').innerText = 'Novo recorde!';
    } else {
        document.getElementById('record-message').innerText = 'Tente bater o recorde!';
    }

    // Exibe os dados na tela
    document.getElementById('final-category').innerText = `Categoria: ${finalCategory}`;
    document.getElementById('final-score').innerText = `Sua pontuação: ${totalPoints}`;
    updateScoreHistory();
}

// Função para atualizar o histórico de pontuações na tela
function updateScoreHistory() {
    const scoreHistoryList = document.getElementById('score-history');
    scoreHistoryList.innerHTML = '';

    for (const [cat, score] of Object.entries(highScores)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${cat}: ${score} pontos`;
        scoreHistoryList.appendChild(listItem);
    }
}


// Adapte a função `nextQuestion` para chamar `finishQuiz` quando o quiz terminar
function nextQuestion() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex < currentQuiz.length) {
        displayQuestion(currentQuiz[currentQuestionIndex]);
        startTime = new Date().getTime();
    } else {
        finishQuiz(); // Chama a tela de finalização
    }
}

// Função para reiniciar o quiz
function restartQuiz() {
    document.getElementById('final-screen').style.display = 'none'; // Esconde a tela final
    document.getElementById('menu').style.display = 'block'; // Mostra o menu inicial
}

// Função para sair do quiz
function exitQuiz() {
    alert('Obrigado por jogar! Até a próxima!');
    window.close(); // Fecha a janela do navegador
}