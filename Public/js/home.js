let productContainer = [...document.querySelectorAll(".product-container")];
let prevBtn = [...document.querySelectorAll(".pre-btn")];
let nextBtn = [...document.querySelectorAll(".nxt-btn")];
// console.log(prevBtn);
// console.log(nextBtn);

productContainer.forEach((el, i)=>{
    // getBoundingClientRect methos to get get dimentions of elements
    let containerDimenstions = el.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nextBtn[i].addEventListener("click",(eo)=>{
        el.scrollLeft += containerWidth;
        console.log(nextBtn[i]);
    })

    prevBtn[i].addEventListener("click",(eo)=>{
        el.scrollLeft -= containerWidth;
        console.log(nextBtn[i]);
    })

});