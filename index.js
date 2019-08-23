"use strict";

const QUIZ_BANK = [
  {
    question: "Who Is A Youtube Natural Hair Veteran? ",
    options: ["Naptural", "KimmyTube", "CurlyProverbz", "BopKing"],
    answer: "KimmyTube"
  },

  {
    question: "CurlyProverbz Is Known For Her? ",
    options: [
      "Ayurveda Hair Care",
      "Wash Day Routines",
      "Henna Gloss Recipes",
      "None Of The Above"
    ],
    answer: "Ayurveda Hair Care"
  },

  {
    question: "What Is The Benefit Of Doing  ACV Rinses ?",
    options: [
      "Close Hair Follicles",
      "Clarify Hair And Scalp",
      "Shiny Hair",
      "All The Above"
    ],
    answer: "All The Above"
  },

  {
    question: "Tea Rinses Are Usually Recommended As A Remedy For?",
    options: ["Hair Fall", "Thickening Hair", "Dry Hair", "Weak Hair"],
    answer: "Hair Fall"
  },

  {
    question: "Hair With No Visible Curl Pattern Is Of What Hair Type?",
    options: ["2D", "5Z", "4C", "3K"],
    answer: "4C"
  }
];

let quizIndex = 0;
let userAnswer = "";
let scoreCount = 0;

function generateElement(item) {
  console.log("`generateElement` ran");

  let appendedVal = "";

  for (let i = 0; i < item.options.length; i++) {
    appendedVal += `<input type="radio" name="option" value='${
      item.options[i]
    }'>${item.options[i]}<br>`;
  }

  return `
  
          <div class= 'quiz_content js_quiz_content'>
        <div class= 'question_container js_question'>
          <label class= question_tracker >Question ${quizIndex + 1} / ${
    QUIZ_BANK.length
  }</label>
          <div class= 'align_quiz_content answer_selection js_answer_selection'>
          <fieldset>
      <legend class= options_heading>${item.question}</legend>
               ${appendedVal}
               </fieldset>
        </div>
        </div>
        <div class= 'result js_result'>
        <p class= 'align_quiz_content result_heading'>Result:</p>
            <p class= 'align_quiz_content medium_font answer js_answer'></p>
             <p class= 'align_quiz_content medium_font current_score js_current_score hide' > </p>
        </div>
        
       </div> 
        `;
}

function generateFinalElement() {
  console.log("`generateElement` ran");
  return `
           <div class= 'final_content border'>
      
       <p class= result_summary>You answered ${scoreCount} out of ${
    QUIZ_BANK.length
  } questions correct.<br><br> You scored  <span class= green_emphasise>${calculateTotalScore()}%</span>  on this quiz</p>

         </div>
        `;
}

function generateQuizString() {
  console.log("retrieved question string content from array");
  let item = generateElement(QUIZ_BANK[quizIndex]);
  return item;
}

function generateFinalString() {
  console.log("retrieved final string content");
  let item = generateFinalElement();
  return item;
}

function toggleDisabledButtons() {
  console.log("`toggleElements` ran");
  $(".js_next_btn").prop("disabled", function(_, val) {
    return !val;
  });
  $(".js_answer_btn").prop("disabled", function(_, val) {
    return !val;
  });
}

function toggleHiddenButtons(target) {
  console.log("`toggleElements` ran");
  $(target).toggle("hide");
}

function displayNewElement(quizString) {
  console.log("`displayNewElement` ran");
  $(".js_quiz_content").replaceWith(quizString);
}

function toggleScreenButton() {
  // toggleHiddenButtons('.result_btn_container');
  console.log("`toggleScreenButton` ran");
  if (quizIndex === QUIZ_BANK.length - 1) {
    toggleHiddenButtons(".result_btn_container");
    toggleHiddenButtons(".js_btn_container");
  } else {
    toggleDisabledButtons();
  }
}

function checkAnswer(userAnswer) {
  console.log("checkAnswer` ran");
  let arrayIndexObject = QUIZ_BANK[quizIndex];
  let output = "";
  if (userAnswer !== arrayIndexObject.answer) {
    output = `Sorry The Correct Answer Is:  *${arrayIndexObject.answer}*`;
  } else {
    output = "Your Answer Is Correct!!!";
    ++scoreCount;
  }
  return output;
}

function calculateTotalScore() {
  console.log("`calculateTotalScore` ran");
  return (scoreCount / QUIZ_BANK.length) * 100;
}

function startQuiz() {
  $("#js_start_form").submit(event => {
    console.log("`startQuiz` ran");
    event.preventDefault();
    let quizString = generateQuizString();
    $(".content").replaceWith(quizString);
    toggleHiddenButtons(".js_btn_container");
  });
}

function submitAnswer() {
  $(".js_answer_btn").click(event => {
    console.log("`submitAnswer` ran");
    event.preventDefault();
    userAnswer = $("input[name=option]:checked").val();

    if (userAnswer === undefined) {
      $(".options_heading").addClass("highlight");
    } else {
      let result = checkAnswer(userAnswer);
      $(".js_answer").text(result);
      $(".js_current_score").text(`${scoreCount} questions right so far`);
      toggleHiddenButtons(".js_current_score");
      toggleScreenButton();
    }
  });
}

function renderNextQuestion() {
  $(".js_next_btn").click(event => {
    console.log("`renderNextQuestion` ran");
    event.preventDefault();
    quizIndex++;
    let quizString = generateQuizString();
    displayNewElement(quizString);
    toggleDisabledButtons();
  });
}

function renderTotalScore() {
  $(".js_result_btn").click(event => {
    console.log("renderTotalScore` ran");
    event.preventDefault();
    const finalElementString = generateFinalElement();
    displayNewElement(finalElementString);
    toggleHiddenButtons(".result_btn_container");
    toggleHiddenButtons(".restart_btn_container");
  });
}

function restartQuiz() {
  $(".js_restart_btn").click(event => {
    console.log("restartQuiz` ran");
    event.preventDefault();
    window.location.href = "quiz.html";
  });
}

function runQuiz() {
  startQuiz();
  submitAnswer();
  renderNextQuestion();
  renderTotalScore();
  restartQuiz();
}

$(runQuiz);
