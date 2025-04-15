let paraGraph =
  "The quick brown fox jumps over the lazy dog, showcasing agility and grace. Typing tests are designed to measure speed, accuracy, and consistency. Stay focused, breathe steadily, and let your fingers dance across the keyboard. With practice and patience, progress is inevitable, and mastery is only a matter of time.";

let textToType = document.querySelector(".text-to-type");
let inputField = document.querySelector(".text-container");
let keys = Array.from(document.querySelectorAll(".key"));
const audio = new Audio("./assets/type-audio.mp3");
let timer = document.getElementById("timer");
let time = 0;
let timeInterval;

document.addEventListener("keydown", (e) => {
  if (inputField.value.length < 1) {
    if (e.key === " ") {
      e.preventDefault();
      timeInterval = setInterval(() => {
        time++;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds > 59) {
          minutes++;
          seconds = 0;
        }
        timer.textContent = `🕒 ${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`;
        if (
          time === 60 ||
          inputField.value.trim().split(" ").length ===
            paraGraph.split(" ").length
        ) {
          clearInterval(timeInterval);
          timeInterval = null;
          document.querySelector(".finish-container").style.display = "flex";
          document.querySelector(".tint").style.display = "block";
          document.getElementById(
            "speed-finish"
          ).textContent = `Your speed: ${Math.floor(
            inputField.value.trim().split(" ").length / (time / 60)
          )} WPM`;
          inputField.disabled = true;
          inputField.blur();
          time = 0;
        }
      }, 1000);
      inputField.focus();
    } else {
      return;
    }
  }
});

function playSound() {
  audio.currentTime = 0;
  audio.play();
}

function highLightKey(key) {
  key.classList.add("active-key");
  setTimeout(() => {
    key.classList.remove("active-key");
  }, 200);
}

textToType.textContent = paraGraph;

inputField.addEventListener("input", (e) => {
  keys.forEach((element) => {
    if (e.data === element.innerText) {
      highLightKey(element);
      playSound();
    }

    if (e.data === " ") {
      highLightKey(document.querySelector(".spaceKey"));
      playSound();
    }
    if (e.data === null) {
      highLightKey(document.querySelector(".backSpace"));
      playSound();
    }
  });
});

document.querySelector(".restart-button").addEventListener("click", () => {
  document.querySelector(".finish-container").style.display = "none";
  document.querySelector(".tint").style.display = "none";
  inputField.value = "";
  inputField.disabled = false;
  time = 0;
  timer.textContent = `🕒 00:00`;
  textToType.textContent = paraGraph;
});
