// Mobile-friendly audio unlocker (just in case you add audio to this page later)
const unlockAudio = () => {
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().then(() => {
            music.pause();
            music.currentTime = 0;
        }).catch(() => {});
    }
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
};

document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('touchstart', unlockAudio, { once: true });

function showScreen(screenId) {
    if (screenId === 'screen-letter') {
        playMusicWithFade();
    }

    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.remove('active');
        setTimeout(() => {
            currentScreen.style.display = 'none';
            targetScreen.style.display = 'block';

            setTimeout(() => {
                targetScreen.classList.add('active');
            }, 50);
        }, 500);
    } else {
        targetScreen.style.display = 'block';
        setTimeout(() => {
            targetScreen.classList.add('active');
        }, 50);
    }
}

function playMusicWithFade() {
    const music = document.getElementById('bg-music');
    if (!music) return;

    music.volume = 0;
    music.play().then(() => {
        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.02;
                music.volume = Math.min(vol, 0.3);
            } else {
                clearInterval(fade);
            }
        }, 100);
    }).catch(() => {});
}

function playGif() {
    const img = document.getElementById('sad-pic');
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
    }, 3000);
}