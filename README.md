# Quiz Dev

Este é um projeto de quiz interativo sobre linguagens de programação, criado com HTML, CSS e JavaScript. Ele permite que o usuário escolha entre três categorias (Python, JavaScript e CSS) e responda a perguntas sobre essas linguagens. A aplicação conta com pontuação baseada no tempo de resposta e acertos, feedback de resposta e um sistema de navegação entre as perguntas.

## Tecnologias Utilizadas
- HTML: Estruturação da interface do usuário.
- CSS: Estilização da interface.
- JavaScript: Lógica de interação, incluindo a navegação entre as perguntas e verificação de respostas.

## Funcionalidades
- Menu Inicial: Exibe uma tela de boas-vindas com um botão para iniciar o quiz.
- Escolha de Categoria: O usuário pode selecionar uma das categorias: Python, JavaScript, CSS, C++, C#, Java, HTML ou Swift.
- Exibição de Perguntas: As perguntas são exibidas com opções de múltipla escolha.
- Pontuação: A pontuação é atualizada a cada resposta correta, levando em consideração o tempo de resposta.
- Feedback de Resposta: O usuário recebe um feedback de "Resposta correta" ou "Resposta incorreta" após responder a cada pergunta.
- Navegação entre as Perguntas: O usuário pode avançar para a próxima pergunta após responder a atual.
- Armazenamento das Melhores Pontuações: O localStorage é utilizado para armazenar as melhores pontuações alcançadas pelo usuário e exibi-las na tela de finalização. Isso permite que o usuário veja seu desempenho anterior.


## Instruções para Executar o Sistema
1. Clone o repositório para o seu ambiente local
2. Navegue até a pasta do projeto
3. Abra o arquivo index.html em um navegador de sua escolha
4. Inicie a interação com o quiz clicando no botão de "Iniciar" no menu inicial


## Decisões de Projeto
- HTML foi utilizado para estruturar a página de forma simples e eficaz, sem a necessidade de frameworks.
- CSS foi utilizado para dar um estilo básico à página, com foco na clareza e usabilidade da interface.
- JavaScript foi usado para gerenciar a lógica do quiz, incluindo o controle de navegação entre perguntas, verificação de respostas e cálculo de pontuação.
- localStorage é utilizado para armazenar as melhores pontuações do usuário. As pontuações são salvas no navegador do usuário e podem ser visualizadas na tela de finalização, onde é possível também ver o histórico de recordes.
- Armazenamento de dados: As perguntas e respostas estão armazenadas diretamente no código JavaScript, organizadas por categoria (Python, JavaScript, CSS), permitindo fácil manutenção e adição de novos tópicos.