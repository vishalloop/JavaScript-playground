function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let finalAllElems = document.querySelector(".allElems");
  let eachElem = document.querySelectorAll(".each");
  let closes = document.querySelectorAll(".close");

  allElems.forEach((elem) => {
    elem.addEventListener("click", function () {
      finalAllElems.style.display = "none";
      eachElem[elem.id].style.display = "block";
    });
  });

  closes.forEach((close) => {
    close.addEventListener("click", function () {
      finalAllElems.style.display = "flex";
      allElems.forEach((elem) => {
        eachElem[elem.id].style.display = "none";
      });
    });
  });
}

openFeatures();

function Todo() {
  let todoForm = document.querySelector(".add-task");
  let taskName = document.querySelector(".enter-task");
  let taskDetails = document.querySelector(".enter-details");
  let checkBox = document.querySelector(".checkbox");
  let mainTask = JSON.parse(localStorage.getItem("allTask")) || [];

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    mainTask.unshift({
      showName: e.target[0].value,
      showDetail: e.target[1].value,
      showChecked: e.target[2].checked,
    });

    localStorage.setItem("allTask", JSON.stringify(mainTask));
    renderTasks();

    taskName.value = "";
    taskDetails.value = "";
    checkBox.checked = false;
  });

  function renderTasks() {
    let showTask = document.querySelector(".show-task");
    showTask.innerHTML = "";

    mainTask.forEach((taskItem, index) => {
      let task = document.createElement("div");
      task.classList.add("task");

      let taskNameDiv = document.createElement("div");
      taskNameDiv.classList.add("task-name");

      let showName = document.createElement("h1");
      showName.innerText = taskItem.showName;
      taskNameDiv.appendChild(showName);

      if (taskItem.showChecked) {
        let showChecked = document.createElement("p");
        showChecked.innerText = "imp";
        taskNameDiv.appendChild(showChecked);
      }

      task.appendChild(taskNameDiv);

      let completed = document.createElement("button");
      completed.innerText = "Mark As Completed";
      completed.classList.add("completed");

      completed.addEventListener("click", function () {
        mainTask.splice(index, 1);
        localStorage.setItem("allTask", JSON.stringify(mainTask));
        renderTasks();
      });

      task.appendChild(completed);
      showTask.appendChild(task);
    });
  }

  renderTasks();
}

Todo();

function dailyPlanner() {
  let dailyPlannerTail = document.querySelector(".daily-planner-tail");

  for (let i = 0; i < 18; i++) {
    let hour = i + 6;
    let dailyPlannerTask = document.createElement("div");
    dailyPlannerTask.classList.add("daily-planner-task");
    let dailyPlannerTime = document.createElement("div");
    let dailyPlannerData = document.createElement("input");
    dailyPlannerData.setAttribute("type", "text");
    dailyPlannerData.setAttribute("placeholder", "....");
    dailyPlannerData.classList.add("daily-planner-data");
    dailyPlannerTime.innerText = `${hour}:00 - ${hour + 1}:00`;
    dailyPlannerTime.classList.add("daily-planner-time");
    dailyPlannerTask.appendChild(dailyPlannerTime);
    dailyPlannerTask.appendChild(dailyPlannerData);
    dailyPlannerTail.appendChild(dailyPlannerTask);
  }

  let dailyplannerData = document.querySelectorAll(".daily-planner-data");
  let mainData = JSON.parse(localStorage.getItem("plannerData")) || [];

  dailyplannerData.forEach((inp, index) => {
    inp.addEventListener("input", function (e) {
      let plannerData = JSON.parse(localStorage.getItem("plannerData")) || [];

      plannerData[index] = e.target.value;

      localStorage.setItem("plannerData", JSON.stringify(plannerData));
    });
    inp.value = mainData[index] || "";
  });

  for (let i = 0; i < 18; i++) {
    dailyplannerData[i].setAttribute("value", mainData);
  }
}

dailyPlanner();

function motivationQuote() {
  let motivationDetail = document.querySelector(".mot-detail");
  let motivationAuthor = document.querySelector(".mot-author");

  fetch("https://dummyjson.com/quotes/random")
    .then((res) => res.json())
    .then((data) => {
      motivationDetail.innerHTML = data.quote;
      motivationAuthor.innerHTML = data.author;
    })
    .catch((err) => console.log(err));
}

motivationQuote();

function promodoroTimer() {
  let workSession = document.querySelector(".session1");
  let breakSession = document.querySelector(".session2");

  let pomodoroTimer = document.querySelector(".timer");
  let startBtn = document.querySelector(".start-btn");
  let pauseBtn = document.querySelector(".pause-btn");
  let resetBtn = document.querySelector(".reset-btn");
  let currentMode = "work";

  let totalSeconds = 1500;
  let checker = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    pomodoroTimer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    if (checker) return;

    checker = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(checker);
        checker = null;
        return;
      }

      totalSeconds--;
      updateTimer();
    }, 1000);

    startBtn.disabled = true;
  }

  function pauseTimer() {
    clearInterval(checker);
    checker = null;
    startBtn.disabled = false;
  }

  function resetTimer() {
    clearInterval(checker);
    checker = null;
    startBtn.disabled = false;

    if (currentMode === "work") {
      totalSeconds = 1500;
    } else {
      totalSeconds = 300;
    }

    updateTimer();
  }

  workSession.addEventListener("click", () => {
    pauseTimer();
    currentMode = "work";
    totalSeconds = 1500;
    updateTimer();
  });

  breakSession.addEventListener("click", () => {
    pauseTimer();
    currentMode = "break";
    totalSeconds = 300;
    updateTimer();
  });

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateTimer();
}

promodoroTimer();

function weatherFeature() {
  let weatherDate = document.querySelector(".weather-date");
  let weatherTime = document.querySelector(".weather-time");
  let weatherCity = document.querySelector(".weather-city");
  let weatherTemp = document.querySelector(".weather-temp");
  let weatherCondition = document.querySelector(".weather-condition");

  function weather() {
    let fullDate = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    weatherDate.innerHTML = `${String(fullDate.getDate()).padStart(2, "0")} ${
      months[fullDate.getMonth()]
    }, ${fullDate.getFullYear()}`;
    if (fullDate.getHours() > 12) {
      weatherTime.innerHTML = `${daysOfWeek[fullDate.getDay()]}, ${String(
        fullDate.getHours() - 12
      ).padStart(2, "0")}:${String(fullDate.getMinutes()).padStart(
        2,
        "0"
      )}:${String(fullDate.getSeconds()).padStart(2, "0")} PM`;
    } else {
      weatherTime.innerHTML = `${daysOfWeek[fullDate.getDay()]}, ${String(
        fullDate.getHours()
      ).padStart(2, "0")}:${String(fullDate.getMinutes()).padStart(
        2,
        "0"
      )}:${String(fullDate.getSeconds()).padStart(2, "0")} AM`;
    }
  }

  setInterval(() => {
    weather();
  }, 1000);

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        weatherCity.innerHTML = `${
          data.address.city || data.address.town || data.address.village
        }(${data.address.state})`;
      });

    const apiKey = "e4237374d7b5ea00aa08ab9ff38c67c0";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        weatherTemp.innerHTML = `${data.main.temp + "°C"}`;
        weatherCondition.innerHTML = `${data.weather[0].description}`;
      });
  });
}

weatherFeature();

function themeFeature() {
  let themeBtn = document.querySelector(".theme");
  let rootElement = document.documentElement;

  let count = Number(localStorage.getItem("themeValue")) || 0;

  applyTheme(count);

  themeBtn.addEventListener("click", function () {
    count = (count + 1) % 6;
    localStorage.setItem("themeValue", count);
    applyTheme(count);
  });
  function applyTheme(count) {
    const themes = [
      {
        "--primmary-color": "#E6F1FF",
        "--secondary-color": "#0B1C2D",
        "--other-color-1": "#00E5FF",
        "--other-color-2": "#132F4C",
        "--red": "#FF4D6D",
        "--green": "#00C853",
        "--btn-bg1": "#00838F",
        "--btn-bg2": "#3949AB",
      },
      {
        "--primmary-color": "#F1F8F4",
        "--secondary-color": "#1B4332",
        "--other-color-1": "#74C69D",
        "--other-color-2": "#2D6A4F",
        "--red": "#D62828",
        "--green": "#40916C",
        "--btn-bg1": "#52B788",
        "--btn-bg2": "#2D6A4F",
      },
      {
        "--primmary-color": "#FFF8E7",
        "--secondary-color": "#2B2D42",
        "--other-color-1": "#FF9F1C",
        "--other-color-2": "#EF476F",
        "--red": "#E63946",
        "--green": "#06D6A0",
        "--btn-bg1": "#F77F00",
        "--btn-bg2": "#D62828",
      },
      {
        "--primmary-color": "#F8FAFC",
        "--secondary-color": "#1E293B",
        "--other-color-1": "#38BDF8",
        "--other-color-2": "#334155",
        "--red": "#EF4444",
        "--green": "#22C55E",
        "--btn-bg1": "#0EA5E9",
        "--btn-bg2": "#6366F1",
      },
      {
        "--primmary-color": "#F5F3FF",
        "--secondary-color": "#240046",
        "--other-color-1": "#FFBE0B",
        "--other-color-2": "#3C096C",
        "--red": "#E5383B",
        "--green": "#38B000",
        "--btn-bg1": "#7B2CBF",
        "--btn-bg2": "#5A189A",
      },
      {
        "--primmary-color": "#F8F4E1",
        "--secondary-color": "#381c0a",
        "--other-color-1": "#FEBA17",
        "--other-color-2": "#74512D",
        "--red": "rgb(221, 20, 20)",
        "--green": "green",
        "--btn-bg1": "rgb(13, 152, 94)",
        "--btn-bg2": "rgb(13, 79, 179)",
      },
    ];

    let selectedTheme = themes[count];

    for (let property in selectedTheme) {
      rootElement.style.setProperty(property, selectedTheme[property]);
    }
  }
}

themeFeature();
