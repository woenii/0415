// ===============================
// 1. DATE + LETTER GENERATOR
// ===============================
let visibleEnvelopes = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("all-letters");

    const startDate = new Date("2026-04-15");
    const today = new Date();

    let lettersData = [];
    let totalToCheck = 0;
    let checked = 0;

    function format(date) {
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);

        return {
            compact: `${mm}${dd}${yy}`,
            folder: `${mm}-${dd}-20${yy}`,
            display: `${mm}/${dd}/${yy}`,
            rawDate: new Date(date)
        };
    }

    function tryLoadLetter(date) {
        const { compact, folder, display, rawDate } = format(date);

        const isToday = date.toDateString() === today.toDateString();
        if (isToday) return;

        totalToCheck++;

        const img = new Image();
        img.src = `/previous-letters/${folder}/${compact}-letter-cover.png`;

        img.onload = () => {
            lettersData.push({ compact, folder, display, rawDate, img });
            checked++;
            checkDone();
        };

        img.onerror = () => {
            checked++;
            checkDone();
        };
    }

    function checkDone() {
        if (checked === totalToCheck) {
            renderLetters();
        }
    }

    function renderLetters() {
        container.innerHTML = "";
        visibleEnvelopes = [];

        // ✅ LATEST FIRST
        lettersData.sort((a, b) => b.rawDate - a.rawDate);

        lettersData.forEach(letter => {
            const div = document.createElement("div");
            div.className = "envelope-wrapper carousel-item";
            div.setAttribute("data-date", letter.compact);
            div.onclick = () => handleEnvelopeClick(letter.folder, letter.compact);

            letter.img.className = "custom-envelope";
            div.appendChild(letter.img);

            const p = document.createElement("p");
            p.className = "tap-hint";
            p.textContent = `tap to open ${letter.display}`;
            div.appendChild(p);

            container.appendChild(div);
            visibleEnvelopes.push(div);
        });

        currentIndex = 0;
        updateCarousel();
    }

    let current = new Date(startDate);
    while (current <= today) {
        tryLoadLetter(new Date(current));
        current.setDate(current.getDate() + 1);
    }
});

// ===============================
// 2. CAROUSEL
// ===============================
function updateCarousel() {
    visibleEnvelopes.forEach((env, index) => {
        env.classList.toggle("active-item", index === currentIndex);
    });
}

function nextLetter() {
    if (visibleEnvelopes.length <= 1) return;
    currentIndex = (currentIndex + 1) % visibleEnvelopes.length;
    updateCarousel();
}

function prevLetter() {
    if (visibleEnvelopes.length <= 1) return;
    currentIndex = (currentIndex - 1 + visibleEnvelopes.length) % visibleEnvelopes.length;
    updateCarousel();
}

// ===============================
// 3. MODAL + NAVIGATION
// ===============================
let selectedFolder = "";
let selectedFile = "";

function handleEnvelopeClick(folderName, fileName) {
    if (fileName !== "041526") {
        window.location.href = `/previous-letters/${folderName}/${fileName}-letter.html`;
    } else {
        openSpecificModal(folderName, fileName);
    }
}

function openSpecificModal(folderName, fileName) {
    selectedFolder = folderName;
    selectedFile = fileName;
    document.getElementById("animation-modal").classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("animation-modal");
    const title = document.getElementById("modal-title");
    const actions = document.getElementById("modal-actions");

    modal.classList.add("hidden");

    // restore default
    if (title) {
        title.innerHTML = "<br>do you want to play the animation for this letter?";
    }

    if (actions) {
        actions.style.display = "block";
    }
}

function playWithAnimation() {
    closeModal();
    window.location.href = `/previous-letters/${selectedFolder}/${selectedFile}.html`;
}

function skipAnimation() {
    closeModal();
    window.location.href = `/previous-letters/${selectedFolder}/${selectedFile}-letter.html`;
}

// ===============================
// 4. GO TO TODAY
// ===============================
function goToTodaysLetter() {
    const today = new Date();

    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    const yy = String(yyyy).slice(-2);

    const folder = `${mm}-${dd}-${yyyy}`;
    const file = `${mm}${dd}${yy}`;

    const img = new Image();
    img.src = `/previous-letters/${folder}/${file}-letter-cover.png`;

    img.onload = () => {
        // ✅ letter exists → go to animation version
        window.location.href = `/previous-letters/${folder}/${file}.html`;
    };

    img.onerror = () => {
        // ❌ no letter yet → show modal instead
        openNoLetterModal();
    };
}

function openNoLetterModal() {
    const modal = document.getElementById("animation-modal");
    const title = document.getElementById("modal-title");
    const actions = document.getElementById("modal-actions");

    title.innerHTML = `
        <br>i haven't finished today's letter yet... 💭<br>
        come back a little later.
    `;

    actions.style.display = "none";

    modal.classList.remove("hidden");
}