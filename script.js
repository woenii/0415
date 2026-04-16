// --- 1. Background Music Initialization ---
document.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().then(() => {
            music.pause();
            music.currentTime = 0;
        }).catch(() => {});
    }
}, { once: true });

// --- 2. Screen Swapping Function ---
function showScreen(screenId) {
    if (screenId === 'screen-letter') {
        playMusicWithFade();
    }

    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(screenId);

    if (currentScreen && targetScreen) {
        currentScreen.classList.remove('active');
        setTimeout(() => {
            currentScreen.style.display = 'none';
            targetScreen.style.display = 'block';

            setTimeout(() => {
                targetScreen.classList.add('active');
            }, 50);
        }, 500); // Waits for the fade-out effect
    } else if (targetScreen) {
        targetScreen.style.display = 'block';
        setTimeout(() => {
            targetScreen.classList.add('active');
        }, 50);
    }
}

// --- 3. Music Fade-In Function ---
function playMusicWithFade() {
    const music = document.getElementById('bg-music');
    if (!music) return;

    music.volume = 0;
    music.play().then(() => {
        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.02;
                music.volume = Math.min(vol, 0.3); // max volume 30%
            } else {
                clearInterval(fade);
            }
        }, 100);
    }).catch(() => {});
}

// --- 4. GIF Animation Functions ---
function playGif() {
    const img = document.getElementById('sad-pic');
    if (!img) return; // safety check
    
    const animatedUrl = img.getAttribute('data-animated');
    img.src = animatedUrl;
}

function playAndGo(buttonElement) {
    playGif();

    buttonElement.innerText = "wiping tears...";
    buttonElement.style.opacity = "0.7";
    buttonElement.style.pointerEvents = "none";

    setTimeout(() => {
        showScreen('screen-main');
    }, 3000); // Waits 3 seconds before moving to the envelope
}

// --- 5. NEW: Homescreen Modal Functions ---
function showAnimationModal() {
    const modal = document.getElementById('animation-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('animation-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// --- 6. NEW: Redirection Logic ---
function playWithAnimation() {
    closeModal();
    // Redirects to your other HTML file
    window.location.href = "/previous-letters/04-15-2026/041526.html"; 
}

function skipAnimation() {
    closeModal();
    // If you want to skip the crying animation, you can link directly to a specific 
    // part of the other file, or you might need to create a slightly different HTML file 
    // for the "no animation" version. For now, it just goes to the main file.
    window.location.href = "/previous-letters/04-15-2026/041526-letter.html"; 
}   

function goToTodaysLetter() {
    // Get today's date
    const today = new Date();
    
    // Extract month, day, and year
    // .padStart(2, '0') ensures single digits like '4' become '04'
    let month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    let day = today.getDate().toString().padStart(2, '0');
    
    let fullYear = today.getFullYear().toString(); // e.g., "2026"
    let shortYear = fullYear.slice(-2);            // e.g., "26"
    
    // Build the folder name (MM-DD-YYYY)
    let folderName = `${month}-${day}-${fullYear}`;
    
    // Build the file name (MMDDYY.html)
    let fileName = `${month}${day}${shortYear}.html`;
    
    // Combine them into the final URL path
    let url = `/previous-letters/${folderName}/${fileName}`;
    
    // Send the user to the newly generated URL
    window.location.href = url;
}