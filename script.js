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
            'CSS';

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
    updateScoreHistory(finalCategory);
}

// Função para atualizar o histórico de pontuações na tela
function updateScoreHistory(category) {
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