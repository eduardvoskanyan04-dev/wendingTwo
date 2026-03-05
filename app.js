document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       HERO SLIDER
    ========================================= */
    const slides = document.querySelectorAll('.hero-slider .slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const currentSlideEl = document.getElementById('current-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slides.length > 0) {
        let currentSlide = 0;
        totalSlidesEl.innerText = slides.length;

        function showSlide(index) {
            slides.forEach((sl) => sl.classList.remove('slide-active'));
            slides[index].classList.add('slide-active');
            currentSlideEl.innerText = index + 1;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);

        nextBtn.addEventListener('click', () => {
            nextSlide();
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    /* =========================================
       MUSIC PLAYER (Hero Section)
    ========================================= */
    const bgMusic = document.getElementById("bgMusic");
    const musicToggleHero = document.getElementById("musicToggleHero");
    const musicIconHero = document.getElementById("musicIconHero");

    if (bgMusic && musicToggleHero) {
        let isPlaying = false;

        const startMusic = () => {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (musicIconHero) {
                        musicIconHero.classList.remove("fa-play");
                        musicIconHero.classList.add("fa-pause");
                    }
                }).catch(e => console.log("Auto-play blocked by browser, waiting for interaction..."));
            }
        };

        const toggleMusic = () => {
            if (isPlaying) {
                bgMusic.pause();
                musicIconHero.classList.remove("fa-pause");
                musicIconHero.classList.add("fa-play");
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicIconHero.classList.remove("fa-play");
                    musicIconHero.classList.add("fa-pause");
                    isPlaying = true;
                }).catch(e => console.log("Playback prevented: ", e));
            }
        };

        musicToggleHero.addEventListener("click", (e) => {
            e.stopPropagation(); 
            toggleMusic();
        });

        // 1. Attempt immediate autoplay
        startMusic();

        // 2. Play on first interaction (click, touch, scroll)
        const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown'];
        const triggerAutoplay = () => {
            if (!isPlaying) {
                startMusic();
            }
            // Remove listeners after first interaction
            interactionEvents.forEach(evt => {
                document.removeEventListener(evt, triggerAutoplay);
            });
        };

        interactionEvents.forEach(evt => {
            document.addEventListener(evt, triggerAutoplay, { once: true, passive: true });
        });
    }

    /* =========================================
       COUNTDOWN
    ========================================= */
    const eventDate = new Date("2026-04-29T14:00:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
        const now = new Date().getTime();
        let diff = eventDate - now;

        if (diff <= 0) diff = 0;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if(daysEl) {
            daysEl.textContent = days.toString().padStart(2, "0");
            hoursEl.textContent = hours.toString().padStart(2, "0");
            minutesEl.textContent = minutes.toString().padStart(2, "0");
            secondsEl.textContent = seconds.toString().padStart(2, "0");
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* =========================================
       SCROLL REVEAL (AOS Alternative)
    ========================================= */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    /* =========================================
       RSVP FORM
    ========================================= */
    const rsvpForm = document.getElementById('rsvpForm');
    const guestCountInput = document.getElementById('guestCount');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const formMsg = document.getElementById('formMsg');

    if(rsvpForm) {
        attendanceRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'yes') {
                    guestCountInput.style.display = 'block';
                    guestCountInput.setAttribute('required', 'true');
                } else {
                    guestCountInput.style.display = 'none';
                    guestCountInput.removeAttribute('required');
                }
            });
        });

        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formMsg.innerText = 'Տվյալները հաջողությամբ ուղարկված են';
            formMsg.style.color = '#2e7d32'; 
            rsvpForm.reset();
            setTimeout(() => { formMsg.innerText = ''; }, 5000);
        });
    }

});
