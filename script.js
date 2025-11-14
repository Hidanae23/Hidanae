const wrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slide-image");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;
let width = slides[0].clientWidth;

// Duplikasi gambar agar looping sempurna (tanpa putus)
wrapper.innerHTML += wrapper.innerHTML;

function updateSlide() {
    wrapper.style.transition = "transform 0.5s ease-in-out";
    wrapper.style.transform = `translateX(${-index * width}px)`;
}

function nextSlide() {
    index++;
    updateSlide();

    // Jika sudah mencapai akhir set pertama → reset diam-diam
    if (index === slides.length) {
        setTimeout(() => {
            wrapper.style.transition = "none";
            index = 0;
            wrapper.style.transform = `translateX(0px)`;
        }, 510);
    }
}

function prevSlide() {
    if (index === 0) {
        wrapper.style.transition = "none";
        index = slides.length;
        wrapper.style.transform = `translateX(${-index * width}px)`;

        setTimeout(() => {
            index--;
            updateSlide();
        }, 20);
    } else {
        index--;
        updateSlide();
    }
}

// Auto slide
let autoSlide = setInterval(nextSlide, 3000);

// Tombol manual
next.addEventListener("click", () => {
    nextSlide();
    resetAuto();
});

prev.addEventListener("click", () => {
    prevSlide();
    resetAuto();
});

// Reset interval kalau user klik tombol
function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 3000);
}

