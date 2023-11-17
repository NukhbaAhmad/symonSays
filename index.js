const colors = ["green", "red", "blue", "yellow"];
let playPattern = [];
let userPattern = [];
let userScore = 0;

$(".startHere").click(function (e) {
  stratGame();
});

const stratGame = () => {
  playPattern = [];
  userPattern = [];
  userScore = 0;
  $(".Level").slideDown().text("Level 1");
  $(".userScore").slideUp();
  nextSequence();
};

// Next Blinking Color
const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * colors.length);
  const randomChosenColour = colors[randomNumber];
  playPattern.push(randomChosenColour);

  // Audio
  let audioSrc = $(`.${randomChosenColour}`).attr("data-audio");
  let audio = new Audio(audioSrc);

  // Animation
  $(`.${randomChosenColour}`).css(
    "box-shadow",
    `0 0 20px 10px ${randomChosenColour}`
  );
  // Play Audio
  audio.play();
  //
  setTimeout(function () {
    $(`.${randomChosenColour}`).css(
      "box-shadow",
      "none",
      "opacity",
      "0.9",
      "background-color",
      `${randomChosenColour}`
    );
  }, 400);
};

// User Selected
$(".PlayBox").on("click", (e) => {
  const userChosenColor = e.target.id;
  userPattern.push(userChosenColor);
  checkAnswer();
});

// NOTE: Game Blink Pattern is checked with each user Click
const checkAnswer = () => {
  // After user each click increment by 1 --> 0--1--2--3
  const currentIndex = userPattern.length - 1;

  // Check if the current user click matches the relative play pattern element
  // User click "red - 0" matches playPattern[0] "red" --> OK +++  else error
  if (userPattern[currentIndex] === playPattern[currentIndex]) {
    // User click is correct so far --- All patterns clicked
    if (userPattern.length === playPattern.length) {
      // User completed the pattern
      userPattern = [];
      userScore = userScore + 1;
      $(".Level").text(`Level ${userScore}`);
      nextSequence();
    }
  } else {
    // User click is incorrect
    showResultOnLoss();
  }
};

const showResultOnLoss = () => {
  let audio = new Audio("/Voices/gameOverr.mp3");
  $("body").css("background-color", "red");
  audio.play();

  setTimeout(function () {
    $("body").css("background-color", "#333");
  }, 100);

  $(".userScore").slideDown();
  if (userScore >= 0) {
    $(".userScore").text(`You Scored: ${userScore}`);
  }

  setTimeout(function () {
    confettiCall();
  }, 1000);
};

const confettiCall = () => {
  var end = Date.now() + 0.4 * 1000;

  // go Buckeyes!
  var colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 65,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
