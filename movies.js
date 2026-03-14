// SEARCH BOX
function openSearch() {

    let box = document.getElementById("searchBox");

    if (box.style.display === "block") {
        box.style.display = "none";
    } else {
        box.style.display = "block";
    }

}


// MOVIES PAGE BANNER SLIDER

const slides = document.querySelectorAll(".banner-slide");
const nextBtn = document.querySelector(".banner-next");
const prevBtn = document.querySelector(".banner-prev");

let currentSlide = 0;

function showSlide(index){
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

if(nextBtn){
nextBtn.addEventListener("click", () => {
    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
});
}

if(prevBtn){
prevBtn.addEventListener("click", () => {
    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});
}