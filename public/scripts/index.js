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
const shopCartParent = document.querySelector("#shopCartParent")//parenteElement

let myArrry = JSON.parse(localStorage.getItem("shopingCart")); //pegando os dados jsonObjct e passando para um js array
if(!myArrry){
    myArrry = [];
}
const sendLocalStorageToView = function(){
    localStorage.setItem("shopingCart", JSON.stringify(myArrry));
    if(myArrry.length > 0){
        let resuslts = myArrry.map(product =>{
            return`
        <div class="shopCartItems">
            <img id="image" src="${product.imageProd}"> 
            <section class="shopCartName">
                <p id="name"><span>${product.nameProd}</span></p>
                <p id="size"> Tamanho: <span>${product.sizeProd}</span></p>
                <p id="color"> Cor: <span>${product.colorProd}</span></p>
                <p id="count"> qtd: <span>${product.count}</span></p>
                <p id="val"> R$: <span>${product.price}</span></p>
            </section>
        </div>
            `
        });
        shopCartParent.innerHTML = resuslts.join("");
        document.querySelector(".shopCartBottom").classList.remove("hide");

    }else{
        document.querySelector(".shopCartBottom").classList.add("hide");
        shopCartParent.innerHTML = "<h1>O carrinho está vazio</h1>";
    }
    sendFromLocalStorageToview();
    getProductsToSend();
    somaValor();
};

const sendFromLocalStorageToview = function(){
    const PayProducts = document.getElementById("PayProducts");
    localStorage.setItem("shopingCart", JSON.stringify(myArrry));
    if(myArrry.length > 0){
        let res = myArrry.map(product =>{
            return`
            <div class="shopCartItems">
            <img id="image" src="${product.imageProd}"> 
            <section class="shopCartName">
                <p id="name"><span>${product.nameProd}</span></p>
                <p id="size"> Tamanho: <span>${product.sizeProd}</span></p>
                <p id="color"> Cor: <span>${product.colorProd}</span></p>
                <p id="count"> qtd: <span>${product.count}</span></p>
                <p id="val"> R$: <span>${product.price}</span></p>
            </section>
        </div>
            `
        });
        PayProducts.innerHTML = res.join("");

    }else{
        document.querySelector(".shopCartBottom").classList.add("hide");
        PayProducts.innerHTML = "<h1>Nemnum item adiconado</h1>";
    }
};

const getProductsToSend = function(){
    const data = document.querySelector(".data");
    localStorage.setItem("shopingCart", JSON.stringify(myArrry));
    if(myArrry.length > 0){
        let res = myArrry.map(product =>{
            return`
            <input type="text" name="codigo" id="codigo" value = "${product.codigo}" hidden style="visibility: hidden;">
            <input type="text" name="count" id="count" value = "${product.count}" hidden style="visibility: hidden;">
            `
        });
        data.innerHTML = res.join("");
    }
};

function sendDataToLocalStogare(product){
    for (let i = 0; i < myArrry.length; i++){
        if(myArrry[i].nameProd == product.nameProd && myArrry[i].sizeProd == product.sizeProd && myArrry[i].colorProd == product.colorProd){
            myArrry[i].count += 1;
            myArrry[i].price = myArrry[i].valProd * myArrry[i].count;
            return;
        }
        console.log(product);
    }
    myArrry.push(product);
}

const somaValor = function(){
    let a = 0;
    for(let i = 0; i < myArrry.length; i++){
        let arr =  parseInt(myArrry[i].price);
        a += arr;
        console.log(a);
        document.getElementById("ProductTotal").setAttribute("value", a);
    }
}

function getProductContent() {
    let productCart = {
        imageProd: document.getElementById("imageProd").getAttribute("src"),
        codigo: document.getElementById("cod").textContent,
        nameProd: document.getElementById("nameProd").textContent,
        sizeProd: document.getElementById("sizeProd").textContent,
        colorProd: document.getElementById("colorProd").textContent,
        valProd: document.getElementById("valProd").textContent,
        price: document.getElementById("valProd").textContent,
        count: 1
    }
    console.log(productCart);
    sendDataToLocalStogare(productCart);
    sendLocalStorageToView();
    
}
sendLocalStorageToView();

function clearCart(){
    localStorage.clear("shopingCart");
    location.reload(true);
}

