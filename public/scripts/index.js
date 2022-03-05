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

/* Cart */
/* const addCart = document.querySelector("#addCart");
 */
function getProductContent() {
    const productCart = {
        imageProd: document.getElementById("imageProd").getAttribute("src"),
        nameProd: document.getElementById("nameProd").textContent,
        sizeProd: document.getElementById("sizeProd").textContent,
        colorProd: document.getElementById("colorProd").textContent,
        valProd: document.getElementById("valProd").textContent
    }
    return productCart
}
/* addCart.addEventListener("click", ()=>{
    let productCart = {
        imageProd: document.getElementById("imageProd").getAttribute("src"),
        nameProd: document.getElementById("nameProd").textContent,
        sizeProd: document.getElementById("sizeProd").textContent,
        colorProd: document.getElementById("colorProd").textContent,
        valProd: document.getElementById("valProd").textContent
    }
    return productCart
}); */

function sendDataToLocalStogare() {
    let myArrry =[];

/* Serialize e Adicionando no Locla Storage */
let productCart_Serialized = JSON.stringify(productCart = getProductContent());
myArrry.push(productCart_Serialized);
localStorage.setItem("item", myArrry);
alert("Item Adicionado no Carrinho!")

/* Desserializer e Pegando os dasdos do objct json */
let itemData = localStorage.getItem("item");
let data = JSON.parse(itemData);

}

/* 
function getItems(data) {
    document.getElementById("image").setAttribute("src", data.imageProd)
    document.getElementById("name").textContent = data.nameProd;
    document.getElementById("size").textContent = data.sizeProd;
    document.getElementById("color").textContent = data.colorProd;
    document.getElementById("val").textContent = data.valProd;
    console.log(data.imageProd, data.nameProd,
    data.sizeProd,
    data.colorProd,
    data.valProd);
} */