// Variáveis globais
let currentQuiz = [], currentQuestionIndex = 0, totalPoints = 0, startTime;
let highScores = JSON.parse(localStorage.getItem('quizHighScores')) || {}; // Recupera o histórico do localStorage
// Banco de dados dos quizzes
const quizzes = {
    python: [
        ["Qual é o comando para imprimir uma mensagem em Python?", "A) print()", "B) echo()", "C) console.log()", "D) write()", "A"],
        ["Como se declara uma variável em Python?", "A) var x = 10", "B) int x = 10", "C) let x = 10", "D) x = 10", "D"],
        ["Qual é o operador para potência em Python?", "A) ^", "B) **", "C) *", "D) %", "B"],
        ["Como se cria uma função em Python?", "A) def func(){}", "B) function func(){}", "C) func(){}", "D) create func()", "A"],
        ["Qual é o tipo de dados usado para representar texto em Python?", "A) string", "B) char", "C) text", "D) str", "A"]
    ],
    javaScript: [
        ["Qual comando é usado para exibir uma mensagem no console em JavaScript?", "A) print()", "B) echo()", "C) alert()", "D) console.log()", "D"],
        ["Como se cria uma variável em JavaScript?", "A) var x = 10", "B) let x = 10", "C) const x = 10", "D) Todos os anteriores", "D"],
        ["Qual é o operador utilizado para comparar dois valores em JavaScript?", "A) =", "B) ===", "C) ==", "D) <>", "B"],
        ["Como você escreve um comentário em uma linha em JavaScript?", "A) // comentário", "B) # comentário", "C) <!-- comentário -->", "D) /* comentário */", "A"],
        ["O que é uma função anônima em JavaScript?", "A) Uma função sem nome", "B) Uma função que retorna um valor", "C) Uma função que só pode ser chamada uma vez", "D) Uma função com argumento obrigatório", "A"]
    ],
    css: [
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
        ["Qual é a estrutura de controle para loops em Swift?", "A) foreach", "B) for-in", "C) for-each", "D) while-for", "B"]
    ]
};

// Função para embaralhar as perguntas
function mixQuestions(quiz) {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    return quiz;
}

// Funções de navegação e interação
function startQuiz() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('category-menu').style.display = 'block';
}

function category(quizType) {
    currentQuiz = mixQuestions(quizzes[quizType]);
    currentQuestionIndex = totalPoints = 0;
    document.getElementById('category-menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    nextQuestion();
}

function nextQuestion() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex < currentQuiz.length) {
        displayQuestion(currentQuiz[currentQuestionIndex]);
        startTime = new Date().getTime();
    } else {
        finishQuiz();
    }
}

function displayQuestion(questionData) {
    document.getElementById('question-text').innerText = questionData[0];
    document.getElementById('question-number').innerText = `Pergunta ${currentQuestionIndex + 1} de ${currentQuiz.length}`;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    questionData.slice(1, 5).forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(questionData[5], option.charAt(0));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(correctAnswer, selectedAnswer) {
    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    let points = 0;
    let resultMessage = '';

    const buttons = document.getElementById('options-container').getElementsByTagName('button');
    for (let button of buttons) {
        const answerLetter = button.innerText.charAt(0);
        if (answerLetter === correctAnswer) {
            button.classList.add('correct');
        }
        if (answerLetter === selectedAnswer) {
            button.classList.add(answerLetter === correctAnswer ? 'correct' : 'incorrect');
        }
        button.disabled = true;
    }

    if (selectedAnswer === correctAnswer) {
        points = elapsedTime <= 10 ? Math.round((10 - elapsedTime) / 10 * 10) : 1;
        resultMessage = 'Resposta correta!';
    } else {
        resultMessage = 'Resposta incorreta!';
    }

    const resultElement = document.createElement('p');
    resultElement.textContent = resultMessage;
    resultElement.className = selectedAnswer === correctAnswer ? 'correct-message' : 'incorrect-message';
    document.getElementById('options-container').appendChild(resultElement);

    totalPoints += points;
    document.getElementById('score').innerText = `Pontos: ${totalPoints}`;
    currentQuestionIndex++;

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo';
    nextButton.onclick = nextQuestion;
    document.getElementById('next-button-container').innerHTML = '';
    document.getElementById('next-button-container').appendChild(nextButton);
}

function finishQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';

    const finalCategory = Object.keys(quizzes).find(key => quizzes[key] === currentQuiz) || 'Indefinida';

    if (!highScores[finalCategory] || totalPoints > highScores[finalCategory]) {
        highScores[finalCategory] = totalPoints;
        localStorage.setItem('quizHighScores', JSON.stringify(highScores));
        document.getElementById('record-message').innerText = 'Novo recorde!';
    } else {
        document.getElementById('record-message').innerText = 'Tente bater o recorde!';
    }

    document.getElementById('final-category').innerText = `Categoria: ${finalCategory}`;
    document.getElementById('final-score').innerText = `Sua pontuação: ${totalPoints}`;
    updateScoreHistory();
}

function updateScoreHistory() {
    const scoreHistoryList = document.getElementById('score-history');
    scoreHistoryList.innerHTML = '';

    for (const [cat, score] of Object.entries(highScores)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${cat}: ${score} pontos`;
        scoreHistoryList.appendChild(listItem);
    }
}

function restartQuiz() {
    document.getElementById('final-screen').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

function exitQuiz() {
    alert('Obrigado por jogar! Até a próxima!');
    window.close();
}