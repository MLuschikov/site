var quests = [
    {
        title: "Комната в общаге",
        description: "Башка болит, с утра надо идти на пару к Трусову, неохота, вчера надо было меньше пить!... Во рту кошки нассали!",
        image: "img/room.jpg",
        asks: [
            {
                question: "Пойдёшь на пару?",
                answers: [
                    {
                        text: "да",
                        goTo: 1,
                    }, {
                        text: "пойду",
                        goTo: 1,
                    }
                ],
                gameOver: "Меня отчислили. Военком дал повестку. I`m In The Army Now"
            }
        ]
    }, {
        title: "Коридор",
        description: "Здесь бродят такие же похмельные зомби, как и ты",
        image: "img/corridor.jpg",
        asks: [
            {
                question: "Будешь просить сотку на опохмел?",
                answers: [
                    {
                        text: "да",
                        goTo: 0,
                    }
                ],
                goToWrong: 0,
            }, {
                question: "Куда пойдешь",
                answers: [
                    {
                        text: "кухня",
                        goTo: 0,
                    }, {
                        text: "туалет",
                        goTo: 0,
                    }, {
                        text: "в универ",
                        goTo: 0,
                    }
                ],
                goToWrong: 0,
            }
        ]
    }
];