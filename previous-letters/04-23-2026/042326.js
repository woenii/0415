// --- 1. LETTER PAGE LOGIC (Fades the overlay and plays music) ---
window.onload = () => {
    const music = document.getElementById('bg-music');
    const overlay = document.getElementById('start-overlay');
    
    // Safety check: This will only run if we are actually on the letter page
    if (music && overlay) {
        music.volume = 0;

        overlay.addEventListener('click', () => {
            // Play music and fade it in
            // ---> ADD THIS LINE HERE <---
            music.currentTime = 5; // Starts the song at 5 seconds

            // Play music and fade it in
            music.play().then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    if (vol < 0.3) { // Caps out at 0.3 volume
                        vol += 0.02;
                        music.volume = Math.min(vol, 0.3);
                    } else {
                        clearInterval(fade);
                    }
                }, 100);
            }).catch((e) => console.log("Audio play failed:", e));

            // Fade out the overlay
            overlay.style.opacity = '0';
            
            // Remove it completely after 1.5 seconds
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1500); 
        });
    }
};

// --- 2. GLOBAL MOBILE AUDIO FIX ---
document.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().then(() => {
            music.pause();
            music.currentTime = 0;
        }).catch(() => {});
    }
}, { once: true });


// --- 3. ENVELOPE SURPRISE LOGIC ---
function triggerSurprise(wrapperElement) {
    const img = document.getElementById('envelope-img');
    const text = document.getElementById('envelope-text');
    const btn = document.getElementById('read-letter-btn');

    // Swap to hug gif
    if (img) img.src = "phone-hug.gif";
    
    // Update text and stop pulsing
    if (text) {
        text.innerText = "waaaaa you're here naa";
        text.style.animation = "none";
        text.style.opacity = "1";
    }
    
    // Stop double-clicking
    wrapperElement.style.pointerEvents = "none";

    // Show button after 3 seconds
    setTimeout(() => {
        if (btn) btn.style.display = "block";
    }, 3000); 
}

// --- 4. NEXT PAGE LOGIC ---
function turnPage() {
    const page1 = document.getElementById('page-1-container');
    const page2 = document.getElementById('page-2-container');
    
    if (page1 && page2) {
        // 1. Instantly hide the first page
        page1.style.display = 'none';
        
        // 2. Show the second page
        page2.style.display = 'block';
        
        // 3. Trigger a smooth fade-in effect
        setTimeout(() => {
            page2.style.opacity = '1';
        }, 50);
        
        // 4. Automatically scroll back to the top of the screen!
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}