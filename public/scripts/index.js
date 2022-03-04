/* function load(){
   
    document.getElementById("mainContent").style.display = "block";
} */

document.addEventListener("DOMContentLoaded", (e) =>{
    setTimeout(() => {
        document.getElementById("load").style.display = "none"; 
        document.getElementById("pageContent").style.removeProperty("display");
    }, 1500);
});

/* poop up */

const modalPopUp = document.getElementById("modalPopUp");
const popup = document.querySelector(".modalConteiner");
const popupBlur = document.querySelector(".pageContent")
const body = document.querySelector("body");
modalPopUp.addEventListener("click", () =>{
    popupBlur.classList.add("blur");
    popup.style.display = "flex";
    body.classList.add("hidden");
});

popup.addEventListener("click", event =>{
    const calssNameOfClickedElement = event.target.classList[0];
    const classNames = ["modalConteiner"];
    const shouldClousePopup = classNames.some(classNames =>
    classNames === calssNameOfClickedElement);

    if(shouldClousePopup){
    popup.style.display = "none";
    popupBlur.classList.remove("blur");
    body.classList.remove("hidden");
    }
});

/* navSideBar */
function toggleMenu() {
    let navigation = document.querySelector(".navigation");
    let toggle = document.querySelector(".toggle");
    navigation.classList.toggle("active");
    toggle.classList.toggle("active");
    navigation.classList.toggle("hide");
}
let subeMenu = document.querySelectorAll(".collapse");
subeMenu.forEach(subeMenur => {
    console.log(subeMenur);
    let collapse = subeMenur.querySelector(".collapseSubMenu");
    console.log(collapse);
    subeMenur.addEventListener("click", () => {
        collapse.classList.toggle("hide");
    });
});