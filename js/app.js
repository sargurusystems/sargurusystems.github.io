document.addEventListener("DOMContentLoaded", function () {
  const mobmenu = document.querySelector(".mobmenu");
  if (mobmenu) {
    mobmenu.addEventListener("click", function () {
      const menuUl = document.querySelector(".menu ul");
      if (menuUl) {
        menuUl.classList.toggle("active");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("headerbar").innerHTML = data;
    });

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footerbar").innerHTML = data;
    });

  fetch("whatsapp.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("whatsapp").innerHTML = data;
    });
});
