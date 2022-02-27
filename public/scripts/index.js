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

const userArea = document.getElementById("userArea");
const popup = document.querySelector(".modalConteiner");
const popupBlur = document.querySelector(".pageContent")
userArea.addEventListener("click", () =>{
    popupBlur.classList.add("blur");
    popup.style.display = "flex";
});

popup.addEventListener("click", event =>{
    const calssNameOfClickedElement = event.target.classList[0];
    const classNames = ["modalConteiner", "linkButton"];
    const shouldClousePopup = classNames.some(classNames =>
    classNames === calssNameOfClickedElement);

    if(shouldClousePopup){
    popup.style.display = "none";
    popupBlur.classList.remove("blur");

    }
});