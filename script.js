// ============================================
// Valentine's Day Proposal - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const envelope = document.getElementById('envelope');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const heartsContainer = document.getElementById('heartsContainer');
    const confettiContainer = document.getElementById('confettiContainer');

    // Start floating hearts animation
    createFloatingHearts();

    // Envelope click handler
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        
        // Transition to question screen
        setTimeout(() => {
            screen1.classList.remove('active');
            screen2.classList.add('active');
        }, 1500);
    });

    // Yes button handler
    yesBtn.addEventListener('click', () => {
        screen2.classList.remove('active');
        screen3.classList.add('active');
        
        // Create celebration confetti
        createConfetti();
        
        // Continuous confetti
        setInterval(createConfetti, 800);
    });

    // No button - make it playfully dodge
    let noClickCount = 0;
    const playfulMessages = [
        "Are you sure? 🥺",
        "Think about it! 💭",
        "Pretty please? 🙏",
        "One more chance? 💕",
        "I'll be sad... 😢",
        "Just say yes! 💖"
    ];

    noBtn.addEventListener('mouseover', dodgeButton);
    noBtn.addEventListener('click', () => {
        noClickCount++;
        
        if (noClickCount < playfulMessages.length) {
            noBtn.querySelector('.btn-text').textContent = playfulMessages[noClickCount];
        }
        
        // After a few attempts, make it move
        if (noClickCount >= 2) {
            dodgeButton();
        }
        
        // Eventually, the button transforms
        if (noClickCount >= 5) {
            noBtn.querySelector('.btn-text').textContent = "Okay, Yes! 💖";
            noBtn.classList.remove('btn-no');
            noBtn.classList.add('btn-yes');
            noBtn.removeEventListener('mouseover', dodgeButton);
            noBtn.onclick = () => {
                screen2.classList.remove('active');
                screen3.classList.add('active');
                createConfetti();
                setInterval(createConfetti, 800);
            };
        }
    });

    // Dodge button function
    function dodgeButton() {
        if (noClickCount < 2) return;
        
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
    }

    // Create floating hearts
    function createFloatingHearts() {
        const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 15000);
        }
        
        // Create initial hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(createHeart, i * 300);
        }
        
        // Continuously create hearts
        setInterval(createHeart, 800);
    }

    // Create confetti
    function createConfetti() {
        const colors = ['#ff4081', '#ff6b9d', '#ff85ab', '#ffc1cc', '#fff', '#ffd700', '#ff69b4'];
        const shapes = ['❤️', '💕', '💖', '✨', '🌟', '💫', '🎀'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Randomly choose between shape emoji or colored square
                if (Math.random() > 0.5) {
                    confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                    confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
                } else {
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                }
                
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                
                confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 50);
        }
    }

    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            createSparkle(e.clientX, e.clientY);
        }
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: 20px;
            z-index: 9999;
            animation: sparkleAnim 1s ease forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Add sparkle animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnim {
            0% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);
});
