const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;



playerLivesCount.textContent = playerLives;


const getData = () => [
    { imgSrc: "./images/aristokrat.jpg", name: "aristokrat" },
    { imgSrc: "./images/barbekyu.jpg", name: "barbekyu" },
    { imgSrc: "./images/doktorisky.jpg", name: "doktoriskiy" },
    { imgSrc: "./images/egerisky.jpg", name: "egerisky" },
    { imgSrc: "./images/flag.jpg", name: "flag" },
    { imgSrc: "./images/myasa.jpg", name: "myasa" },
    { imgSrc: "./images/tushonka.jpg", name: "tushonka" },
    { imgSrc: "./images/vintaj.jpg", name: "vintaj" },
    { imgSrc: "./images/aristokrat.jpg", name: "aristokrat" },
    { imgSrc: "./images/barbekyu.jpg", name: "barbekyu" },
    { imgSrc: "./images/doktorisky.jpg", name: "doktoriskiy" },
    { imgSrc: "./images/egerisky.jpg", name: "egerisky" },
    { imgSrc: "./images/flag.jpg", name: "flag" },
    { imgSrc: "./images/myasa.jpg", name: "myasa" },
    { imgSrc: "./images/tushonka.jpg", name: "tushonka" },
    { imgSrc: "./images/vintaj.jpg", name: "vintaj" },
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

const cardGenerator = () => {
    const cardData = randomize();
    //html o'zgarishi
    cardData.forEach((item, index) => {
        const card = document.createElement("div")
        const face = document.createElement("img")
        const back = document.createElement("div")
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        face.src = item.imgSrc;
        card.setAttribute("name", item.name)

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};
// cardlarni tekshirish 
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped")
    const flippedCard = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");

    //logic bitch)

    if (flippedCard.length === 2) {
        if (flippedCard[0].getAttribute("name") ===
            flippedCard[1].getAttribute("name")
        ) {
            console.log("match");
            flippedCard.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("wrong");
            flippedCard.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 500);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("Yutqazdingiz :( qayta urunib ko'ring");
            }
        }
    }
    if (toggleCard.lenth === 16){
        restart("YOU WON");
    };
};

const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");

        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 500);

    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives
    setTimeout(() => window.alert(text), 100)
}

cardGenerator()