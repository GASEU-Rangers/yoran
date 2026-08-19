const voicebanks = [
  {
    name: "NORMAL",
    description: "자연스럽고 균형 잡힌 기본 음원.",
    specs: "VCV · 5-PITCH · C3 ~ G4",
    tags: ["VCV", "5-PITCH", "STANDARD"]
  },
  {
    name: "POWER",
    description: "힘 있고 선명한 표현을 위한 음원.",
    specs: "VCV · 3-PITCH · C3 ~ F4",
    tags: ["VCV", "3-PITCH", "POWER"]
  }
];

const demos = [
  {
    title: "DEMO SONG 01",
    creator: "압생트 - 박화애",
    youtubeId: "fUi1QGJqKy0?si"
  },
  {
    title: "DEMO SONG 02",
    creator: "요란 - 심규선",
    youtubeId: "FHM0gxolq6o?si"
  }
];

const voiceList = document.querySelector("#voice-list");
voicebanks.forEach((voice) => {
  const article = document.createElement("article");
  article.className = "voice-card";
  article.innerHTML = `
    <div>
      <div class="voice-name">${voice.name}</div>
      <div class="voice-tags">
        ${voice.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
    <div>
      <div class="voice-description">${voice.description}</div>
      <div class="voice-specs">${voice.specs}</div>
    </div>
    <a class="button button-line" href="#download">DOWNLOAD</a>
  `;
  voiceList.appendChild(article);
});

const demoGrid = document.querySelector("#demo-grid");
demos.forEach((demo) => {
  const article = document.createElement("article");
  article.className = "demo-card";
  article.innerHTML = `
    <div class="video-wrap">
      <iframe
        src="https://www.youtube.com/embed/${encodeURIComponent(demo.youtubeId)}"
        title="${demo.title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    </div>
    <div class="demo-info">
      <h3>${demo.title}</h3>
      <p>${demo.creator}</p>
    </div>
  `;
  demoGrid.appendChild(article);
});

const desktopLinks = [...document.querySelectorAll('.desktop-nav a[data-section]')];
const sections = desktopLinks
  .map(link => document.getElementById(link.dataset.section))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  desktopLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.section === visible.target.id);
  });
}, {
  rootMargin: "-25% 0px -60% 0px",
  threshold: [0, 0.1, 0.25, 0.5]
});

sections.forEach(section => observer.observe(section));

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = [...mobileMenu.querySelectorAll("a")];

function closeMenu() {
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

mobileLinks.forEach(link => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});
