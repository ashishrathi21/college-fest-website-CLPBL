 if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeToggle").firstElementChild;

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
}

window.onload = function () {
  const body = document.body;
  const icon = document.getElementById("themeToggle").firstElementChild;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    body.classList.remove("dark-mode");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

}



const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const cards = document.querySelector('.card-content');

function handleScrollNext() {
  cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
}

function handleScrollPrev() {
  cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
}

next.addEventListener('click', handleScrollNext);
prev.addEventListener('click', handleScrollPrev);
