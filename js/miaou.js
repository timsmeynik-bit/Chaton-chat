// ===== Little hearts that fly up where you click =====
const HEARTS = ["💗", "🧡", "🖤", "🐾", "💕", "✨"];

function spawnHearts(x, y) {
  for (let i = 0; i < 7; i++) {
    const heart = document.createElement("span");
    heart.className = "flying-heart";
    heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    heart.style.left = x - 13 + "px";
    heart.style.top = y - 13 + "px";
    heart.style.setProperty("--dx", Math.random() * 120 - 60 + "px");
    heart.style.setProperty("--rot", Math.random() * 60 - 30 + "deg");
    heart.style.animationDelay = i * 0.05 + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}

document.querySelectorAll(".js-hearts").forEach((element) => {
  element.addEventListener("click", (event) => spawnHearts(event.clientX, event.clientY));
});

// ===== Click on the cat photo: it talks! =====
const MIAOUS = ["Miaou !", "Mrrrp ?", "Prrrrrr…", "Miaaaou !", "Mew 🥺", "Encore !", "Croquettes ?", "Je t'aime 💗"];
const bubble = document.querySelector(".cat-bubble");

document.querySelectorAll(".js-miaou").forEach((photo) => {
  photo.addEventListener("click", (event) => {
    spawnHearts(event.clientX, event.clientY);
    if (bubble) {
      bubble.textContent = MIAOUS[Math.floor(Math.random() * MIAOUS.length)];
      bubble.classList.add("cat-bubble-pop");
      setTimeout(() => bubble.classList.remove("cat-bubble-pop"), 200);
    }
  });
});

// ===== Hugs counter, saved in the browser (localStorage) =====
function getHugs(cat) {
  return parseInt(localStorage.getItem("calins-" + cat) || "0");
}

function refreshCounters() {
  let total = 0;
  document.querySelectorAll("[data-count-for]").forEach((counter) => {
    counter.textContent = getHugs(counter.dataset.countFor);
  });
  document.querySelectorAll(".js-calin").forEach((button) => {
    total += getHugs(button.dataset.cat);
  });
  const totalElement = document.querySelector(".js-calin-total");
  if (totalElement) {
    totalElement.textContent = total;
  }
}

document.querySelectorAll(".js-calin").forEach((button) => {
  button.addEventListener("click", (event) => {
    const cat = button.dataset.cat;
    localStorage.setItem("calins-" + cat, getHugs(cat) + 1);
    refreshCounters();
    spawnHearts(event.clientX, event.clientY);
  });
});

refreshCounters();

// ===== Gallery: close the big photo with Escape or by clicking outside =====
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && location.hash.startsWith("#photo-")) {
    location.hash = "galerie";
  }
});

document.querySelectorAll(".lightbox").forEach((box) => {
  box.addEventListener("click", (event) => {
    if (event.target === box) {
      location.hash = "galerie";
    }
  });
});
