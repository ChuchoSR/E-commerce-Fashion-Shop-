const navList = document.querySelector(".nav-list");

document.querySelector(".hamburger").onclick = () => {
    navList.classList.add("show");
    console.log("prueba")
};

document.querySelector(".close").onclick = () => {
    navList.classList.remove("show");
}

