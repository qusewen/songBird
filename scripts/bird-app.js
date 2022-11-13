import birdsData from "./bird.js";

console.log(birdsData);
const startNewquiz = document.querySelector(".main__btn");
const mainBodySection = document.querySelector(".main");
const quizBodySection = document.querySelector(".quiz");
const quizBody = document.querySelector('.quiz-body')
const questionSound = document.querySelector(".question");
const answerBody = document.querySelector(".answer");
let questionBird = "";
let setAnswer = "";
startNewquiz.addEventListener("click", handleStartquiz);

function handleStartquiz() {
  mainBodySection.style.display = "none";
  quizBody.style.display ='block'
}

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
    0 + Math.random() * (birdsData.length + 1 - 0)
  );
  let randomBirdQuestion = Math.floor(0 + Math.random() * (5 + 1 - 0));
  let birdRandom = {};
  console.log(randomElement, randomBirdQuestion);
  let test = 0;

  birdsData[randomElement]?.map((item) => {
    if (item?.id == randomBirdQuestion) {
      birdRandom = item;
    }
    for (let i = 0; i < 1; i++) {
      for (let j; j < 6; j++) {
        test++;
        console.log(test);
      }
      createAnwer(
        item.id,
        "quiz",
        "answer__the_question",
        item.name,
        item.name
      );
    }
    questionBird = birdRandom.name;
    // console.log([item][test].id)
    // test++;
    // answerBody.innerHTML = `
    // <label for="0"><input name="bird"  onFocus = "a('first-input')"  class="answer__the_question" id="0" type="radio">${birdsData[randomElement][0].name}</label>
    // <label for="1"><input name="bird"   class="answer__the_question" id="1" type="radio">${birdsData[randomElement][1].name}</label>
    // <label for="2"><input name="bird"  class="answer__the_question" id="2" type="radio">${birdsData[randomElement][2].name}</label>
    // <label for="3"><input name="bird"   class="answer__the_question" id="3" type="radio">${birdsData[randomElement][3].name}</label>
    // <label for="4"><input name="bird"   class="answer__the_question" id="4" type="radio">${birdsData[randomElement][4].name}</label>
    // <label for="5"><input name="bird"    class="answer__the_question" id="5" type="radio">${birdsData[randomElement][5].name}</label>`
  });
  questionSound.innerHTML = `<p>Кого вы слышите на этом звуке ?</p><audio controls src="${birdRandom?.audio}" ></audio>`;
}
// const getBirdOnClick = (name) =>{
//   if(name == 'irst-input'){
//     console.log('first');

//   }
// }
// checkAnswer.forEach((item) => {
//   item.addEventListener('focus', (e)=>{
//     console.log(this.e)
//   })
// })

getRandomQuastion();

let btn = document.createElement("button");
let nextBtn = document.createComment("button");
nextBtn.classlist ="next-btn"
nextBtn.innerHTML = 'Следующий вопрос';
nextBtn.disabled = true;
btn.classList = "check-btn";
btn.innerHTML = "Проверить ответ";
btn.disabled = true;
let newtextArea = document.createElement('p');
answerBody.append(btn);
answerBody.append(nextBtn);
answerBody.append(newtextArea);

const checkAnswer = document.querySelectorAll(".answer__the_question");
console.log(checkAnswer);
// checkAnswer.forEach((i) => {
//   i.addEventListener('focus', (e) => {
//     return console.log(e)
//   })
// })

checkAnswer.forEach((ans) =>
  ans.addEventListener("focus", (e) => {
    btn.disabled = false;
    // constuctorQuizQuastion(item.image,item.name,item.description, item.audio  )
    getBirdElement(e.target.value);
    setAnswer = e.target.value;
    // console.log(e.target.value)
  })
);

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

    // item?.id.findOf(id)? console.log(item) : 1;
  });
}

function constuctorQuizQuastion(img, name, description, audio) {
  birdsData.forEach((item) => {
    console.log(item);
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
console.log(`это - ${questionBird}`);
checkBtn.addEventListener("click", () => {
  if (setAnswer == questionBird) {
    newtextArea.style.color = '#00ff1f'
    newtextArea.innerHTML = 'Поздравляю! Вы выбрали правильный вариант ответа! Обновите страницу, если хотите сыграть еще'
    console.log("good");
    checkBtn.disabled = true;
  } else {
    newtextArea.style.color = 'red'
    newtextArea.innerHTML ='Эээх... Попробуйка еще! '
  }
});

// console.log(totalChecked)
// if(totalChecked[0].checked){
//   console.log('1')
// }
