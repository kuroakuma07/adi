function expand(card) {

    document
        .querySelectorAll(".poster-box")
        .forEach(box => box.classList.remove("active"));

    card.classList.add("active");

}