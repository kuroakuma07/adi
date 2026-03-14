// WAIT UNTIL PAGE LOADS
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOVIE SLIDER
    ========================= */

    const arrows = document.querySelectorAll(".arrow");
    const movieLists = document.querySelectorAll(".movie-list");

    arrows.forEach((arrow, i) => {

        const itemNumber = movieLists[i].querySelectorAll("img").length;
        let clickCounter = 0;

        arrow.addEventListener("click", () => {

            const ratio = Math.floor(window.innerWidth / 270);
            clickCounter++;

            if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {

                movieLists[i].style.transform =
                    `translateX(-${300 * clickCounter}px)`;

            } else {

                movieLists[i].style.transform = "translateX(0)";
                clickCounter = 0;

            }

        });

    });

    /* =========================
       DARK MODE
    ========================= */

    const ball = document.querySelector(".toggle-ball");

    const items = document.querySelectorAll(
        "body,.container,.movie-list-title,.navbar,.navbar-container,.sidebar,.left-menu-icon,.toggle,.menu-list-item a"
    );

    if (localStorage.getItem("theme") === "light") {

        items.forEach(item => item.classList.add("active"));
        if (ball) ball.classList.add("active");

    }

    if (ball) {

        ball.addEventListener("click", () => {

            items.forEach(item => item.classList.toggle("active"));
            ball.classList.toggle("active");

            if (ball.classList.contains("active")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }

        });

    }

    /* =========================
       BANNER SLIDER
    ========================= */

    let slides = document.querySelectorAll(".banner-slide");
    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");

    }

    window.nextSlide = function () {

        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);

    }

    window.prevSlide = function () {

        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);

    }

    /* =========================
       SEARCH
    ========================= */

    window.openSearch = function () {

        let search = document.getElementById("searchBox");
        let input = document.getElementById("searchInput");

        search.classList.toggle("active");

        if (search.classList.contains("active")) {
            search.style.display = "block";
            input.focus();
        } else {
            search.style.display = "none";
        }

    }

    /* =========================
       PROFILE POPUP
    ========================= */

    window.openProfile = function () {

        const popup = document.getElementById("profilePopup");

        if (popup) popup.style.display = "flex";

        const container = document.querySelector(".container");
        if (container) container.classList.add("blur");

    }

    window.closeProfile = function () {

        const popup = document.getElementById("profilePopup");

        if (popup) popup.style.display = "none";

        const container = document.querySelector(".container");
        if (container) container.classList.remove("blur");

    }

    /* =========================
       SIGNUP
    ========================= */

    window.signupUser = function () {

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let password = document.getElementById("password").value.trim();

        if (name === "" || email === "" || phone === "" || password === "") {
            alert("Please fill all details");
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            alert("Invalid phone number");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let userExists = users.find(user => user.email === email || user.phone === phone);

        if (userExists) {
            alert("Account already exists");
            return;
        }

        let newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedIn", "true");

        alert("Account created successfully!");

        document.getElementById("profilePopup").style.display = "none";
        document.querySelector(".container").classList.remove("blur");

    }

    /* =========================
       LOGIN
    ========================= */

    window.loginUser = function () {

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            alert("Invalid email or password");
            return;
        }

        localStorage.setItem("loggedIn", "true");

        alert("Login successful!");

        document.getElementById("profilePopup").style.display = "none";
        document.querySelector(".container").classList.remove("blur");

    }

    /* =========================
       LOGOUT
    ========================= */

    window.logoutUser = function () {

        localStorage.removeItem("loggedIn");
        alert("Logged out!");

    }

    /* =========================
       WATCH BUTTON SYSTEM
    ========================= */

    const watchButtons = document.querySelectorAll(".watch-btn");

    watchButtons.forEach(button => {

        button.addEventListener("click", openVideo);

    });

});


/* =========================
   VIDEO PLAYER
========================= */

function openVideo(event) {

    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn !== "true") {

        alert("Please login or signup to watch the video.");

        const popup = document.getElementById("profilePopup");
        if (popup) popup.style.display = "flex";

        return;
    }

    const popup = document.getElementById("videoPopup");
    const video = document.getElementById("movieVideo");

    if (!popup || !video) return;

    // GET VIDEO FROM BUTTON
    const button = event.currentTarget;
    const videoSrc = button.getAttribute("data-video");

    video.src = videoSrc;

    popup.style.display = "flex";

    video.currentTime = 0;
    video.play();
}

/* =========================
   CLOSE VIDEO
========================= */

function closeVideo() {

    const popup = document.getElementById("videoPopup");
    const video = document.getElementById("movieVideo");

    if (!popup || !video) return;

    video.pause();
    popup.style.display = "none";

}