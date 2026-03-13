// WAIT UNTIL PAGE LOADS
document.addEventListener("DOMContentLoaded", () => {


    // MOVIE SLIDER

    const arrows = document.querySelectorAll(".arrow");
    const movieLists = document.querySelectorAll(".movie-list");

    arrows.forEach((arrow, i) => {

        const itemNumber = movieLists[i].querySelectorAll("img").length;
        let clickCounter = 0;

        arrow.addEventListener("click", () => {

            const ratio = Math.floor(window.innerWidth / 270);
            clickCounter++;

            if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {

                movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
                    }px)`;

            } else {

                movieLists[i].style.transform = "translateX(0)";
                clickCounter = 0;

            }

        });

    });



    // DARK MODE SYSTEM


    const ball = document.querySelector(".toggle-ball");

    const items = document.querySelectorAll(
        "body,.container,.movie-list-title,.navbar,.navbar-container,.sidebar,.left-menu-icon,.toggle,.menu-list-item a"
    );

    // LOAD SAVED THEME

    if (localStorage.getItem("theme") === "light") {

        items.forEach((item) => {
            item.classList.add("active");
        });

        if (ball) {
            ball.classList.add("active");
        }

    }


    // TOGGLE CLICK (ONLY IF BUTTON EXISTS)

    if (ball) {

        ball.addEventListener("click", () => {


                        items.forEach((item) => {
                item.classList.toggle("active");
            });

            ball.classList.toggle("active");

            if (ball.classList.contains("active")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }

        });

    }



    // BANNER SLIDER

    let slides = document.querySelectorAll(".banner-slide");
    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

    }

    window.nextSlide = function () {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }

    window.prevSlide = function () {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }



    // SEARCH FUNCTION

    window.openSearch = function () {

        let search = document.getElementById("searchBox");

        if (!search) return;

        if (search.style.display === "block") {
            search.style.display = "none";
        } else {
            search.style.display = "block";
        }

    }


    // PROFILE POPUP

    window.openProfile = function () {

        document.getElementById("profilePopup").style.display = "flex";

        document.querySelector(".container").classList.add("blur");

    }

    window.closeProfile = function () {

        document.getElementById("profilePopup").style.display = "none";

        document.querySelector(".container").classList.remove("blur");

    }

});