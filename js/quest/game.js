var currentQuest = 0;

function answerClickHandler(answer, ask) {
    if (answer) {
        for (var i = 0; i < ask.answers.length; i++) {
             if (answer.toLowerCase() === ask.answers[i].text) {
                currentQuest = ask.answers[i].goTo;
                return setQuest();
            }
        }
        if (Number(ask.goToWrong)) {
            currentQuest = ask.goToWrong;
            return setQuest();
        }
        if (ask.gameOver) {
            document.getElementById('question-title').innerHTML = 'Конец игры!';
            document.getElementById('question-description').innerHTML = ask.gameOver;
            currentQuest = 0;
            setTimeout(setQuest, 5000);
        }
    }
}

function genAsk(ask) {
    var div = document.createElement('div');
    var span = document.createElement('span');
        span.innerHTML = ask.question;
    var input = document.createElement('input');
        input.placeholder = 'Ответ пиши!';
    var button = document.createElement('button');
        button.innerHTML = 'Ответить';
        button.addEventListener('click', function() {
            answerClickHandler(input.value, ask);
        });
    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(button);
    document.getElementById('question-asks').appendChild(div);
}

function setQuest() {
    var question = quests[currentQuest];
    document.getElementById('question-title').innerHTML = question.title;
    document.getElementById('question-description').innerHTML = question.description;
    document.getElementById('question-image').src = question.image;

    document.getElementById('question-asks').innerHTML = '';
    for (var i = 0; i < question.asks.length; i++) {
        genAsk(question.asks[i]);
    }
}