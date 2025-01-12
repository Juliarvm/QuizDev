// Variáveis globais para o quiz
let currentQuiz = []; // Armazena o quiz atual
let currentQuestionIndex = 0; // Índice da pergunta atual
let totalPoints = 0; // Total de pontos do jogador
let startTime; // Armazena o tempo de início do quiz
// Banco de dados dos quizzes
const quizzes = {
    metodo: [  // Perguntas e respostas para o quiz 'metodo'
        ["Qual é a primeira etapa proposta pelo Método?", "A) Mar - exposição", "B) Mineração - vocabulário", "C) Anki - revisão", "D) SRE - gênero", "B"],
        ["Quem escreveu o livro 'Morte no nilo'?", "A) Stephen King", "B) Machado de Assis", "C) Jane Austen", "D) Agatha Christie", "D"],
        ["O que é um algoritmo?", "A) Um tipo de linguagem de programação", "B) Uma sequência finita de instruções", "C) Um método de criptografia", "D) Uma marca de computador", "B"],
        ["Qual a capital do Brasil?", "A) São Paulo", "B) Rio de Janeiro", "C) Brasília", "D) Belo Horizonte", "C"],
        ["Quem escreveu 'Dom Quixote'?", "A) William Shakespeare", "B) Miguel de Cervantes", "C) Dante Alighieri", "D) Victor Hugo", "B"]
    ],
    ingles: [  // Perguntas e respostas para o quiz 'ingles'
        ["Qual é a principal habilidade desenvolvida através da prática do 'shadowing' no aprendizado de inglês?", "A) Vocabulário ativo", "B) Pronúncia correta", "C) Compreensão auditiva", "D) Estrutura gramatical", "B"],
        ["Qual é o tempo verbal usado para expressar ações que ocorreram no passado e já foram concluídas antes de um momento específico no passado?", "A) Past Simple", "B) Present Perfect", "C) Past Continuous", "D) Future Perfect", "A"],
        ["Qual é o sinônimo de 'fortunate' em inglês?", "A) Happy", "B) Lucky", "C) Successful", "D) Wealthy", "B"],
        ["Quais são os dois tipos principais de cláusulas em inglês?", "A) Substantivas e adjetivas", "B) Independentes e dependentes", "C) Relativas e absolutas", "D) Simples e compostas", "B"],
        ["O que são 'phrasal verbs' na gramática inglesa?", "A) Verbos que expressam ações físicas", "B) Verbos acompanhados por uma preposição ou advérbio que alteram seu significado", "C) Verbos irregulares usados no passado simples", "D) Verbos modais que indicam permissão", "B"]
    ],
    informacoes: [  // Perguntas e respostas para o quiz 'informacoes'
        ["Qual é a capital da França?", "A) Londres", "B) Paris", "C) Berlim", "D) Roma", "B"],
        ["Qual é o maior planeta do sistema solar?", "A) Júpiter", "B) Saturno", "C) Terra", "D) Netuno", "A"],
        ["Quem pintou a 'Mona Lisa'?", "A) Leonardo da Vinci", "B) Pablo Picasso", "C) Vincent van Gogh", "D) Michelangelo", "A"],
        ["Quem foi o primeiro presidente do Brasil?", "A) Getúlio Vargas", "B) Juscelino Kubitschek", "C) Marechal Deodoro da Fonseca", "D) Fernando Henrique Cardoso", "C"],
        ["Qual é o número atômico do hidrogênio?", "A) 1", "B) 2", "C) 3", "D) 4", "A"]
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

// Função para iniciar o quiz
function startQuiz(quizType) {
    // Define o quiz atual com base no tipo selecionado e embaralha as perguntas
    currentQuiz = shuffleQuestions(quizzes[quizType]);
    currentQuestionIndex = 0; // Reinicia o índice da pergunta
    totalPoints = 0; // Reinicia o total de pontos
    document.getElementById('menu').style.display = 'none'; // Esconde o menu
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
    document.getElementById('question-container').innerText = questionData[0];
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

    // Verifica se a resposta está correta
    if (selectedAnswer === correctAnswer) {
        // Calcula a pontuação com base no tempo de resposta
        points = elapsedTime <= 10 ? Math.round((10 - elapsedTime) / 10 * 10) : 1;
        resultMessage = 'Resposta correta!'; // Mensagem de resposta correta
    } else {
        resultMessage = 'Resposta incorreta'; // Mensagem de resposta incorreta
    }

    // Cria elemento para exibir a mensagem de resultado na página
    const resultElement = document.createElement('p');
    resultElement.textContent = resultMessage;
    resultElement.style.color = selectedAnswer === correctAnswer ? 'green' : 'red'; // Cor da mensagem

    // Adiciona o elemento à área de opções
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.appendChild(resultElement);

    totalPoints += points; // Atualiza a pontuação total
    document.getElementById('score').innerText = `Pontos: ${totalPoints}`; // Exibe a pontuação na interface

    // Desativa os botões de resposta após a seleção
    const buttons = optionsContainer.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    // Incrementa o índice da pergunta atual
    currentQuestionIndex++;
    // Cria botão "Próximo" para avançar para a próxima pergunta
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo';
    nextButton.onclick = nextQuestion;
    optionsContainer.appendChild(nextButton);
}
// Função para sair do quiz
function exitQuiz() {
    alert('Obrigado por utilizar o menu de questões! Até a próxima!'); // Mensagem de agradecimento
    window.close(); // Fecha a janela do navegador
}