import birdsData from "./bird.js";
import startConfetti from "./confetti.js";
const startNewquiz = document.querySelector(".main__btn");
const mainBodySection = document.querySelector(".main");
const quizBodySection = document.querySelector(".quiz");
const quizBody = document.querySelector(".quiz-body");
const questionSound = document.querySelector(".question");
const answerBody = document.querySelector(".answer");
const countBody = document.querySelector(".count");
const headerLogo = document.querySelector(".header__logo-title");
let questionBird = "";
let setAnswer = "";
let count = 0;
startNewquiz.addEventListener("click", handleStartquiz);
function handleStartquiz() {
  mainBodySection.style.display = "none";
  quizBody.style.display = "block";
}
createQuestion();

function createQuestion() {
  function createAnwer(id, name, classlist, inerText, value) {
    let input = "";
    let lable = "";
    for (let i = 0; i < 4; i++) {
      create();
    }
    function create() {
      input = document.createElement("input");
      lable = document.createElement("label");
      input.type = "radio";
      input.id = id;
      input.name = name;
      input.classList = classlist;
      input.value = value;
      lable.htmlFor = id;
      lable.innerHTML = `${inerText}`;
    }

    lable.append(input);
    answerBody.append(lable);
  }

  function getRandomQuastion() {
    let randomElement = Math.floor(
      0 + Math.random() * (birdsData.length - 1 - 0)
    );
    let randomBirdQuestion = Math.floor(1 + Math.random() * (5 + 1 - 0));
    let birdRandom = {};
    // console.log(randomElement, randomBirdQuestion);
    birdsData[randomElement]?.map((item) => {
      if (item?.id == randomBirdQuestion) {
        birdRandom = item;
      }
      for (let i = 0; i < 1; i++) {
        createAnwer(
          item.id,
          "quiz",
          "answer__the_question",
          item.name,
          item.name
        );
      }
      questionBird = birdRandom.name;
    });
    questionSound.innerHTML = `<p>Кого вы слышите на этом звуке ?</p><audio controls src="${birdRandom?.audio}" ></audio>`;
  }

  getRandomQuastion();
  let btn = document.createElement("button");
  let nextBtn = document.createElement("button");
  let newtextArea = document.createElement("p");
  function createTwoBtn() {
    nextBtn.classlist = "next-btn";
    nextBtn.innerHTML = "Следующий вопрос";
    nextBtn.disabled = true;
    btn.classList = "check-btn";
    btn.innerHTML = "Проверить ответ";
    btn.disabled = false;
    answerBody.append(btn);
    answerBody.append(nextBtn);
    answerBody.append(newtextArea);
  }
  createTwoBtn();

  const checkAnswer = document.querySelectorAll(".answer__the_question");

  function checkClickQuestion() {
    checkAnswer.forEach((ans) =>
      ans.addEventListener("focus", (e) => {
        btn.disabled = false;
        getBirdElement(e.target.value);
        return (setAnswer = e.target.value);
      })
    );
  }

  function getBirdElement(name) {
    birdsData.forEach((item) => {
      for (let key of item) {
        if (key.name == name) {
          item.forEach((elem) => {
            elem.name == name
              ? constuctorQuizQuastion(
                  elem.image,
                  elem.name,
                  elem.description,
                  elem.audio
                )
              : 1;
          });
        }
      }
    });
  }
  checkClickQuestion();
  function constuctorQuizQuastion(img, name, description, audio) {
    birdsData.forEach((item) => {
      // console.log(item);
      return (quizBodySection.innerHTML = `<div class="cardContainer">
        <div class="item-img">
        <img src="${img}">
        </div>
        <div class="item-info">
            <h2 class="item-title">${name}</h2>
            <p class ="item-subtitle">${description}</p>
            <audio controls src="${audio}"></audio>
        </div>
</div>`);
    });
  }

  const checkBtn = document.querySelector(".check-btn");
  // console.log(`это - ${questionBird}`);
  checkBtn.addEventListener("click", () => {
    checkClickQuestion();
    if (setAnswer == questionBird) {
      newtextArea.style.color = "#00ff1f";
      newtextArea.innerHTML =
        "Поздравляю! Вы выбрали правильный вариант ответа! Жми дальше !";
      checkBtn.disabled = true;
      nextBtn.disabled = false;
      count++;
      setAnswer = "";
    } else {
      newtextArea.style.color = "red";
      newtextArea.innerHTML = "Эээх... Попробуйка еще! ";
    }
  });
  checkClickQuestion();
  const winSect = document.querySelector(".win-section");
  nextBtn.addEventListener("click", () => {
    answerBody.innerHTML = "";
    createQuestion();
    // count++;
    countBody.innerHTML = `Ваш счёт ${count}`;
  });
  winsOrno();
  function winsOrno() {
    if (count === 5) {
      winSect.style.display = "grid";
      startConfetti();
    }
  }
}

headerLogo.addEventListener("click", () => {
  location.reload();
});