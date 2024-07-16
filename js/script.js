function redireccionar() {
  window.location.href = "#preloader";
  setTimeout(function () {
    window.location.href = "#";
  }, 1500);
}
redireccionar();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "Formulario enviado con éxito.",
        icon: "success",
      });
    }
  });

let menuIsOpen = false;

function mostrarMenu() {
  let menuButton = document.getElementById("menu");
  let header = document.querySelector("header");
  let extraMenu = document.querySelector(".extra-menu");
  let body = document.querySelector("body");

  function toggleMenu() {
    if (menuIsOpen) {
      extraMenu.classList.remove("ease-height");
      body.classList.remove("none-scroll");
      header.style.opacity = "1";
    } else {
      extraMenu.classList.add("ease-height");
      body.classList.add("none-scroll");
      header.style.opacity = "1";
    }
    menuIsOpen = !menuIsOpen;
  }

  menuButton.addEventListener("click", toggleMenu);
}

function smoothScrollAnimation(event) {
  event.preventDefault();

  const href = this.getAttribute("href");
  const targetElement = document.querySelector(href);
  let body = document.querySelector("body");
  let extraMenu = document.querySelector(".extra-menu");

  if (targetElement) {
    const targetOffset =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetOffset - startPosition;
    const duration = 500;
    let startTime;

    function animate(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;
      const scrollPosition = easeInOut(
        timeElapsed,
        startPosition,
        distance,
        duration
      );

      window.scrollTo(0, scrollPosition);

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    }

    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    body.classList.remove("none-scroll");
    body.classList.add("overflow-scroll");
    extraMenu.classList.remove("ease-height");

    menuIsOpen = !menuIsOpen;

    requestAnimationFrame(animate);
  }
}

const easeHrefLinks = document.querySelectorAll(".ease-href");

easeHrefLinks.forEach((link) => {
  link.addEventListener("click", smoothScrollAnimation);
});

function createCarousel(
  carouselSelector,
  autoplay = false,
  interval = 3000,
  arrows = true
) {
  const container = document.querySelector(carouselSelector);
  container.style.position = "relative";
  container.style.overflow = "hidden";

  const slides = container.querySelectorAll(`${carouselSelector} > div`);
  let currentSlide = 0;

  let carouselInterval;

  if (arrows) {
    createCarouselArrows(container);
  }

  function createCarouselArrows(container) {
    const preletrow = document.createElement("div");
    preletrow.className = "carousel-arrow carousel-arrow-prev";
    preletrow.innerHTML = "&#10094;";
    preletrow.onclick = () => {
      changeSlide(-1);
      restartCarouselInterval();
    };
    preletrow.style.position = "absolute";
    preletrow.style.top = "50%";
    preletrow.style.transform = "translateY(-50%)";
    preletrow.style.left = "10px";
    preletrow.style.cursor = "pointer";

    const nextArrow = document.createElement("div");
    nextArrow.className = "carousel-arrow carousel-arrow-next";
    nextArrow.innerHTML = "&#10095;";
    nextArrow.onclick = () => {
      changeSlide(1);
      restartCarouselInterval();
    };
    nextArrow.style.position = "absolute";
    nextArrow.style.top = "50%";
    nextArrow.style.transform = "translateY(-50%)";
    nextArrow.style.right = "10px";
    nextArrow.style.cursor = "pointer";

    container.appendChild(preletrow);
    container.appendChild(nextArrow);
  }

  slides.forEach((slide) => {
    slide.style.opacity = 0;
    slide.style.position = "absolute";
    slide.style.transition = "opacity 1s ease-in-out";
  });

  function changeSlide(direction) {
    const newIndex = (currentSlide + direction + slides.length) % slides.length;
    showSlide(newIndex);
  }

  function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    slides[currentSlide].style.opacity = 0;
    slides[index].classList.add("active");
    slides[index].style.opacity = 1;
    currentSlide = index;
  }

  function startCarouselInterval() {
    carouselInterval = setInterval(() => changeSlide(1), interval);
  }

  function restartCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
  }

  if (autoplay) {
    startCarouselInterval();
  }

  showSlide(currentSlide);
}

function OnloadPage() {
  createCarousel(".review-container", true, 10000, true);
  createCarousel(".home", true, 5000, false);
  mostrarMenu();
}

document.addEventListener("DOMContentLoaded", OnloadPage);

let header = document.querySelector("header");
let lastScroll = 0;

document.body.onscroll = function () {
  if (window.scrollY > lastScroll) {
    header.style.opacity = "0.6";
  } else {
    header.style.opacity = "1";
  }
  lastScroll = window.scrollY;
};

var homeBackLink = document.getElementById("home-back");

function scrollToTop() {
  const startPosition = window.scrollY;
  const distance = -startPosition;
  const duration = 500;

  let startTime;

  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const timeElapsed = currentTime - startTime;
    const scrollPosition = easeInOut(
      timeElapsed,
      startPosition,
      distance,
      duration
    );

    window.scrollTo(0, scrollPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    }
  }

  function easeInOut(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animate);
}

var homeBackLink = document.getElementById("home-back");
homeBackLink.addEventListener("click", function (event) {
  event.preventDefault();
  scrollToTop();
});
