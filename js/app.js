document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("headerbar").innerHTML = data;
      
      // Set active menu item after header is loaded
      setActiveMenuItem();
      
      // Set up mobile menu functionality
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

  // Load footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footerbar").innerHTML = data;
    });

  // Load whatsapp
  fetch("whatsapp.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("whatsapp").innerHTML = data;
    });
});

function setActiveMenuItem() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Remove active class from all menu items
  const menuItems = document.querySelectorAll('.menu ul li');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to current page menu item
  const menuLinks = document.querySelectorAll('.menu ul li a');
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.parentElement.classList.add('active');
    }
  });
}
