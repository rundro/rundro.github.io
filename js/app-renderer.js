// Carousel state
let currentSlide = 0;
let slideCount = 0;

function renderAppCard(app) {
  return `
    <div class="app-card" onclick="openAppModal('${app.id}')">
      <div class="app-card-image">
        <img src="${app.icon}" alt="${app.name} Icon" />
      </div>
      <div class="app-card-content">
        <span class="category">${app.category}</span>
        <h3>${app.name}</h3>
        <p>${app.tagline}</p>
      </div>
    </div>
  `;
}

function renderFeatures(features) {
  return features
    .map(
      (feature) => `
    <div class="feature-card">
      <h3>${feature.title}</h3>
      <p>${feature.details.map((detail) => `• ${detail}`).join("<br>")}</p>
    </div>
  `
    )
    .join("");
}

function renderScreenshots(screenshots) {
  return screenshots
    .map(
      (screenshot) => `
    <div class="carousel-slide">
      <img src="${screenshot.src}" alt="${screenshot.alt}">
    </div>
  `
    )
    .join("");
}

function renderAppModal(app) {
  return `
    <div class="modal-hero">
      <img src="${app.icon}" alt="${app.name} Icon" class="app-icon">
      <h2>${app.name}</h2>
      <p>${app.description}</p>
      <a href="${
        app.appStoreUrl
      }" class="cta-button">Download on the App Store</a>
    </div>
    
    <section class="modal-features">
      <h2 class="section-title">Key Features</h2>
      <div class="features-grid">
        ${renderFeatures(app.features)}
      </div>
    </section>

    <section class="screenshots-carousel">
      <h2 class="section-title">Screenshots</h2>
      <div class="carousel-container">
        <button class="carousel-button prev" onclick="moveCarousel(-1)">‹</button>
        <button class="carousel-button next" onclick="moveCarousel(1)">›</button>
        <div class="carousel-track">
          ${renderScreenshots(app.screenshots)}
        </div>
        <div class="carousel-dots"></div>
      </div>
    </section>
  `;
}

function initCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = track.querySelectorAll(".carousel-slide");
  const dotsContainer = document.querySelector(".carousel-dots");

  slideCount = slides.length;

  // Create dots
  dotsContainer.innerHTML = "";
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("div");
    dot.className = `carousel-dot${i === 0 ? " active" : ""}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }

  // Set initial position
  updateCarousel();
}

function updateCarousel() {
  const track = document.querySelector(".carousel-track");
  const dots = document.querySelectorAll(".carousel-dot");
  const slideWidth = 33.333; // Show 3 slides at a time
  const maxSlides = Math.ceil(slideCount / 3) * 3; // Round up to nearest multiple of 3
  const lastSetIndex = Math.floor((slideCount - 3) / 3) * 3; // Last valid starting index

  // Prevent scrolling past the last complete set
  if (currentSlide > lastSetIndex) {
    currentSlide = lastSetIndex;
  }

  track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function moveCarousel(direction) {
  const lastSetIndex = Math.floor((slideCount - 3) / 3) * 3; // Last valid starting index

  currentSlide = currentSlide + direction * 3; // Move 3 slides at a time

  // Handle bounds
  if (currentSlide < 0) {
    currentSlide = lastSetIndex;
  } else if (currentSlide > lastSetIndex) {
    currentSlide = 0;
  }

  updateCarousel();
}

function goToSlide(index) {
  // Round to nearest multiple of 3 to maintain alignment
  currentSlide = Math.floor(index / 3) * 3;
  updateCarousel();
}

function openAppModal(appId) {
  const appModal = document.getElementById("appModal");
  const modalContent = document.getElementById("modalContent");

  // Find the app data based on the ID
  const app = window[appId]; // This assumes the app data is stored in a global variable with the same name as the ID

  if (app) {
    modalContent.innerHTML = renderAppModal(app);
    initCarousel();

    appModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeAppModal() {
  const appModal = document.getElementById("appModal");
  appModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const appModal = document.getElementById("appModal");
  if (event.target == appModal) {
    closeAppModal();
  }
};
