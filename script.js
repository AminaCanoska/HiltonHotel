document.addEventListener("DOMContentLoaded", () => {
  // --- Dropdown contatti/lingua ---
  const contactBtn = document.getElementById('contattiLink');
  const contactsDropdown = document.getElementById('contactsDropdown');
  const languageBtn = document.getElementById('languageSwitcher');
  const languageDropdown = document.getElementById('languageDropdown');

  contactBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    contactsDropdown.classList.toggle('show');
    languageDropdown.classList.remove('show');
  });

  languageBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
    contactsDropdown.classList.remove('show');
  });

  document.addEventListener('click', function (e) {
    if (
      !contactsDropdown.contains(e.target) &&
      e.target !== contactBtn
    ) {
      contactsDropdown.classList.remove('show');
    }

    if (
      !languageDropdown.contains(e.target) &&
      e.target !== languageBtn
    ) {
      languageDropdown.classList.remove('show');
    }
  });
  // --- Carousel ---
  const restaurantCarousel = document.querySelector('#restaurantCarousel');
  if (restaurantCarousel) {
    new bootstrap.Carousel(restaurantCarousel);
  }

  function animateCaptions() {
    document.querySelectorAll('.carousel-caption').forEach(caption => {
      caption.classList.remove('active');
    });

    const activeItem = document.querySelector('.carousel-item.active');
    if (!activeItem) return;

    const caption = activeItem.querySelector('.carousel-caption');
    if (caption) {
      void caption.offsetWidth;
      caption.classList.add('active');
    }
  }

  animateCaptions();
  const carousel = document.querySelector('.carousel.slide');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', animateCaptions);
  }

  // --- Prenota Modal ---
  const prenotaBtns = document.querySelectorAll(".prenota-btn");
  const modal = document.getElementById("prenotaModal");
  const closeBtn = modal?.querySelector(".close-btn");
  const cameraInput = document.getElementById("cameraSelect");
  const form = document.getElementById("prenotazioneForm");

  prenotaBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      console.log("✅ Hai cliccato su:", btn.dataset.camera);
      const camera = btn.getAttribute("data-camera");
      cameraInput.value = camera;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      cameraInput.focus();
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
    clearErrors();
  });

  modal?.addEventListener("click", e => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  function showError(input, errorId, condition) {
    const errorElem = document.getElementById(errorId);
    if (condition) {
      errorElem.classList.add("error-visible");
      input.setAttribute("aria-invalid", "true");
    } else {
      errorElem.classList.remove("error-visible");
      input.removeAttribute("aria-invalid");
    }
  }

  function clearErrors() {
    const errors = modal.querySelectorAll(".error-message");
    errors.forEach(e => e.classList.remove("error-visible"));
    const inputs = modal.querySelectorAll("input");
    inputs.forEach(i => i.removeAttribute("aria-invalid"));
  }

  form?.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    const nome = form.nome;
    if (!nome.value.trim()) {
      showError(nome, "errorNome", true);
      valid = false;
    }

    const email = form.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      showError(email, "errorEmail", true);
      valid = false;
    }

    const telefono = form.telefono;
    if (telefono.value.trim() && !telefono.checkValidity()) {
      showError(telefono, "errorTelefono", true);
      valid = false;
    }

    const arrivo = form.arrivo;
    if (!arrivo.value) {
      showError(arrivo, "errorArrivo", true);
      valid = false;
    }

    const partenza = form.partenza;
    if (!partenza.value) {
      showError(partenza, "errorPartenza", true);
      valid = false;
    }

    const ospiti = form.ospiti;
    if (!ospiti.value || ospiti.value < 1 || ospiti.value > 10) {
      showError(ospiti, "errorOspiti", true);
      valid = false;
    }

    if (valid) {
      alert(`Prenotazione per la camera "${cameraInput.value}" inviata con successo!`);
      form.reset();
      closeBtn.click();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeBtn.click();
    }
  });
});

