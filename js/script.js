document.addEventListener("DOMContentLoaded", function () {
  // Menu de navegação colapsável
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-links-show");
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Formulário de Contato
  const form = document.querySelector(".contato-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("https://formspree.io/f/xqkjlynr", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          form.querySelector(".mensagem.sucesso").style.display = "block";
          form.querySelector(".mensagem.erro").style.display = "none";
          form.reset();
        } else {
          form.querySelector(".mensagem.erro").style.display = "block";
          form.querySelector(".mensagem.sucesso").style.display = "none";
        }
      })
      .catch((error) => {
        form.querySelector(".mensagem.sucesso").style.display = "block";
        form.querySelector(".mensagem.erro").style.display = "none";
      });
  });

  // Validação de Email para Newsletter
  const newsletterForm = document.querySelector(".newsletter");
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const subscribeButton = newsletterForm.querySelector("button");

  subscribeButton.addEventListener("click", function (e) {
    e.preventDefault();
    const email = emailInput.value;

    if (validateEmail(email)) {
      alert("Inscrição realizada com sucesso!");
      emailInput.value = "";
    } else {
      alert("Por favor, insira um email válido.");
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-nav .next");
  const prevButton = document.querySelector(".carousel-nav .prev");

  function updateCurrentSlide(newIndex) {
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = slides[newIndex];
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  }

  nextButton.addEventListener("click", (e) => {
    const currentSlideIndex = slides.findIndex((slide) =>
      slide.classList.contains("current-slide")
    );
    const newIndex = (currentSlideIndex + 1) % slides.length;
    updateCurrentSlide(newIndex);
  });

  prevButton.addEventListener("click", (e) => {
    const currentSlideIndex = slides.findIndex((slide) =>
      slide.classList.contains("current-slide")
    );
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCurrentSlide(newIndex);
  });
});
